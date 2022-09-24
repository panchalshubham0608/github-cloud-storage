// imports
import { Axios } from "axios";
import IBlobWriter from './blobWriter';
import BlobReader from '../blobReader/blobReaderImpl';
import BlobMetadata from '../common/blobMetadata';
import Commit from '../common/commit';
import * as errcodes from '../err/errcodes';
import GitHubRESTAPIAcceptType from "../util/acceptReponse";
import wrap from "../err/errorHandler";
import * as helper from './helper';

// configuration to create a new `BlobReader`
export interface IBlobReaderParams {
    axiosClient: Axios;
    repository: string;
}

// Implement `IBlobWriter`
export default class BlobWriter implements IBlobWriter {

    // parivate properties
    private repository: string;
    private axiosClient: Axios;

    // constructor
    constructor(params: IBlobReaderParams) {
        // initialize properties
        this.axiosClient = params.axiosClient;
        this.repository = params.repository;
    }

    /**
     * Retrieve the name of the respository for which the blob writer is created
     * @return string: name of the repository
     */
    RepositoryName(): string {
        return this.repository;
    }

    /**
     * Write the content to the blob (type `file`) at given path
     * If the file type blob already exist at given path then it will be overwritten
     * @param path: path of the blob
     * @param content: content to be written
     * @throws ErrKindUnprocessableEntity if there is an existing directory at given path
     * @return Promise<[Commit, BlobMetadata]> - metadata of the blob created & commit details
     */
    Write(path: string, content: string): Promise<[Commit, BlobMetadata]> {
        return new Promise<[Commit, BlobMetadata]>(async (resolve, reject) => {

            // create a blob reader to read blob metadata
            let blobReader = new BlobReader({
                axiosClient: this.axiosClient,
                repository: this.repository
            });

            // retrieve the sha of existing file (if any)
            let old_sha = null;
            try {
                let blobMetadata = await blobReader.GetMetadata(path);
                old_sha = blobMetadata.sha;
            } catch (err) {
                if (err instanceof errcodes.ErrKindUnprocessableEntity) {
                    // blob is a directory
                    reject(err);
                } else if (!(err instanceof errcodes.ErrKindNotFound)) {
                    // some other error
                    reject(err);
                }
            }

            // create a new blob
            let payload = {
                message: `Create ${path}`,
                content: Buffer.from(content).toString('base64'),
                sha: old_sha
            }
            if (old_sha !== null) {
                payload['sha'] = old_sha;
                payload['message'] = `Update ${path}`;
            }

            this.axiosClient.put(`/${path}`, payload, {
                headers: {
                    'Accept': GitHubRESTAPIAcceptType.JSON
                }
            }).then(resp => {
                let wrappedResponse = helper.constructCommitAndBlobMetadata(resp);
                resolve(wrappedResponse);
            }).catch(err => {
                const wrappedError = wrap(err);
                return wrappedError;
            });

        });
    }

    /**
     * Delete the blob (type `file`) at given path
     * @param path: path of the blob to be deleted
     * @throws ErrKindUnprocessableEntity if the blob is a directory
     * @return Promise<Commit> - details of the commit
     */
    Delete(path: string): Promise<Commit> {
        return new Promise<Commit>(async (resolve, reject) => {

            // create a blob reader to read blob metadata
            let blobReader = new BlobReader({
                axiosClient: this.axiosClient,
                repository: this.repository
            });

            // retrieve the sha of existing file (if any)
            let old_sha: string | null = null;
            try {
                let blobMetadata = await blobReader.GetMetadata(path);
                old_sha = blobMetadata.sha;
            } catch (err) {
                // if the blob does not exist then return
                reject(err);
            }

            // delete the blob
            this.axiosClient.delete(`/${path}`,{
                headers: {
                    'Accept': GitHubRESTAPIAcceptType.JSON
                }, 
                data: {
                    message: `Delete ${path}`,
                    sha: old_sha
                }
            }, ).then(resp => {
                let commit = helper.constructCommit(resp);
                resolve(commit);
            }).catch(err => {
                const wrappedError = wrap(err);
                return wrappedError;
            });
        });
    }
}