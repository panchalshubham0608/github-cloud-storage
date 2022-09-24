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
        return new Promise<[Commit, BlobMetadata]>((resolve, reject) => {

            // create a blob reader to read blob metadata
            const blobReader = new BlobReader({
                axiosClient: this.axiosClient,
                repository: this.repository
            });

            // retrieve the sha of existing file (if any)
            blobReader.GetMetadata(path).then(blobMetadata => {
                // if the blob already exist then update it
                this.Update(path, content, blobMetadata.sha).then(([commit, blobMetadata]) => {
                    resolve([commit, blobMetadata]);
                }).catch(err => {
                    reject(err);
                });
            }).catch(err => {
                // if the blob does not exist then create it
                if (err instanceof errcodes.ErrKindNotFound) {
                    this.Create(path, content).then(([commit, blobMetadata]) => {
                        resolve([commit, blobMetadata]);
                    }).catch(err => {
                        reject(err);
                    });
                } else {
                    // for any other error we reject the promise
                    reject(err);
                }
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
        return new Promise<Commit>((resolve, reject) => {

            // create a blob reader to read blob metadata
            const blobReader = new BlobReader({
                axiosClient: this.axiosClient,
                repository: this.repository
            });

            // retrieve the sha of existing file (if any)
            blobReader.GetMetadata(path).then(blobMetadata => {
                // delete the blob
                this.axiosClient.delete(`/${path}`, {
                    headers: {
                        'Accept': GitHubRESTAPIAcceptType.JSON
                    },
                    data: {
                        message: `Delete ${path}`,
                        sha: blobMetadata.sha
                    }
                }).then(resp => {
                    const commit = helper.constructCommit(resp);
                    resolve(commit);
                }).catch(err => {
                    const wrappedError = wrap(err);
                    return wrappedError;
                });
            }).catch(err => {
                const wrappedError = wrap(err);
                reject(wrappedError);
            });

        });
    }




    /**
     * Create a new blob (type `file`) at given path
     * @param path: path of the blob
     * @param content: content to be written
     * @throws ErrKindUnprocessableEntity if there is an existing directory at given path
     * @return Promise<[Commit, BlobMetadata]> - metadata of the blob created & commit details
     */
    private Create(path: string, content: string): Promise<[Commit, BlobMetadata]> {
        return new Promise<[Commit, BlobMetadata]>((resolve, reject) => {
            // create a new blob
            this.axiosClient.put(`/${path}`, {
                message: `Create ${path}`,
                content: Buffer.from(content).toString('base64')
            }, {
                headers: {
                    'Accept': GitHubRESTAPIAcceptType.JSON
                }
            }).then(resp => {
                const wrappedResponse = helper.constructCommitAndBlobMetadata(resp);
                resolve(wrappedResponse);
            }).catch(err => {
                const wrappedError = wrap(err);
                reject(wrappedError);
            });
        });
    }

    /**
     * Update the content of the blob (type `file`) at given path
     * @param path: path of the blob
     * @param content: content to be written
     * @param old_sha: sha of the existing blob
     * @throws ErrKindUnprocessableEntity if there is an existing directory at given path
     * @return Promise<[Commit, BlobMetadata]> - metadata of the blob created & commit details
     */
    private Update(path: string, content: string, old_sha: string): Promise<[Commit, BlobMetadata]> {
        return new Promise<[Commit, BlobMetadata]>((resolve, reject) => {
            // update the blob
            this.axiosClient.put(`/${path}`, {
                message: `Update ${path}`,
                content: Buffer.from(content).toString('base64'),
                sha: old_sha
            }, {
                headers: {
                    'Accept': GitHubRESTAPIAcceptType.JSON
                }
            }).then(resp => {
                const wrappedResponse = helper.constructCommitAndBlobMetadata(resp);
                resolve(wrappedResponse);
            }).catch(err => {
                const wrappedError = wrap(err);
                reject(wrappedError);
            });
        });
    }
}