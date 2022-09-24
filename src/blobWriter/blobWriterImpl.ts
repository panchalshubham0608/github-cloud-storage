// imports
import { Axios } from "axios";
import IBlobWriter from './blobWriter';
import BlobReader from '../blobReader/blobReaderImpl';
import IBlobMetadata from '../common/blobMetadata';
import ICommit from '../common/commit';
import * as errcodes from '../err/errcodes';
import GitHubRESTAPIAcceptType from "../util/acceptReponse";
import wrap from "../err/errorHandler";
import * as helper from './helper';


/**
 * `IBlobWriterParams` defines the parameters for creating a `BlobWriter` object.
 * @hidden
 * @param repositoryName - name of the repository
 * @param axiosClient  - axios client to be used for making API calls
 */
export interface IBlobWriterParams {
    axiosClient: Axios;
    repository: string;
}

/**
 * `BlobWriter` implements the `IBlobWriter` interface.  
 * The BlobWriter facilitates writing of blobs to a repository.  
 * The writer is lazy and does not write the blob content unless requested.  
 * The writing of blobs is backed by the GitHub API.  
 * @see https://docs.github.com/en/rest/repos/contents#create-or-update-file-contents
 * @see https://docs.github.com/en/rest/repos/contents#delete-a-file
 * @hidden
 */
export default class BlobWriter implements IBlobWriter {

    // parivate properties
    private repository: string;
    private axiosClient: Axios;

    // constructor
    constructor(params: IBlobWriterParams) {
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
     * @return Promise<[ICommit, IBlobMetadata]> - metadata of the blob created & commit details
     */
    Write(path: string, content: string): Promise<[ICommit, IBlobMetadata]> {
        return new Promise<[ICommit, IBlobMetadata]>((resolve, reject) => {

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
     * @return Promise<ICommit> - details of the commit
     */
    Delete(path: string): Promise<ICommit> {
        return new Promise<ICommit>((resolve, reject) => {

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
                    const commit = helper.constructICommit(resp);
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
     * @return Promise<[ICommit, IBlobMetadata]> - metadata of the blob created & commit details
     */
    private Create(path: string, content: string): Promise<[ICommit, IBlobMetadata]> {
        return new Promise<[ICommit, IBlobMetadata]>((resolve, reject) => {
            // create a new blob
            this.axiosClient.put(`/${path}`, {
                message: `Create ${path}`,
                content: Buffer.from(content).toString('base64')
            }, {
                headers: {
                    'Accept': GitHubRESTAPIAcceptType.JSON
                }
            }).then(resp => {
                const wrappedResponse = helper.constructICommitAndIBlobMetadata(resp);
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
     * @return Promise<[ICommit, IBlobMetadata]> - metadata of the blob created & commit details
     */
    private Update(path: string, content: string, old_sha: string): Promise<[ICommit, IBlobMetadata]> {
        return new Promise<[ICommit, IBlobMetadata]>((resolve, reject) => {
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
                const wrappedResponse = helper.constructICommitAndIBlobMetadata(resp);
                resolve(wrappedResponse);
            }).catch(err => {
                const wrappedError = wrap(err);
                reject(wrappedError);
            });
        });
    }
}