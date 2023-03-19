// imports
// import { Axios } from "axios";
import IBlobWriter from './blobWriter';
// import BlobReader from '../blobReader/blobReaderImpl';
import IBlobMetadata from '../types/blobMetadata';
import ICommit from '../types/commit';
// import * as errcodes from '../err/errcodes';
// import GitHubRESTAPIAcceptType from "../util/acceptReponse";
// import wrap from "../err/errorHandler";
// import * as helper from './helper';
import IParams from "../types/params";


/**
 * @type{IBlobWriterParams} defines the parameters for creating a @type{BlobWriter} object.
 * @hidden
 * @internal
 */
export interface IBlobWriterParams extends IParams { }

/**
 * @type{BlobWriter} implements the @type{IBlobWriter} interface.
 * This facilitates writing of blobs to a repository.
 * The writer is lazy and does not write the blob content unless requested.
 * The writing of blobs is backed by the GitHub API.
 * @see https://docs.github.com/en/rest/repos/contents#create-or-update-file-contents
 * @see https://docs.github.com/en/rest/repos/contents#delete-a-file
 * @hidden
 * @internal
 */
export default class BlobWriter implements IBlobWriter {

    /**
     * params: parameters for creating a `BlobWriter` object
     * @hidden
     * @internal
     */
    private params: IBlobWriterParams;

    // constructor
    constructor(params: IBlobWriterParams) {
        // initialize properties
        this.params = {...params};
    }

    /**
     * Retrieve the name of the respository for which the blob reader is created
     * @returns name of the repository
     * @hidden
     * @internal
     */
    RepositoryName(): string {
        return this.params.repository;
    }

    /**
     * Retrieve the name of the owner of the repository for which the blob reader is created
     * @returns name of the owner of the repository
     * @hidden
     * @internal
     */
    OwnerName(): string {
        return this.params.owner;
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
            console.log('Write: ', path, content);
            console.log('resolve: ', resolve);

            // // create a blob reader to read blob metadata
            // const blobReader = new BlobReader({
            //     axiosClient: this.axiosClient,
            //     repository: this.repository
            // });

            // // retrieve the sha of existing file (if any)
            // blobReader.GetMetadata(path).then(blobMetadata => {
            //     // if the blob already exist then update it
            //     this.Update(path, content, blobMetadata.sha).then(([commit, blobMetadata]) => {
            //         resolve([commit, blobMetadata]);
            //     }).catch(err => {
            //         reject(err);
            //     });
            // }).catch(err => {
            //     // if the blob does not exist then create it
            //     if (err instanceof errcodes.ErrKindNotFound) {
            //         this.Create(path, content).then(([commit, blobMetadata]) => {
            //             resolve([commit, blobMetadata]);
            //         }).catch(err => {
            //             reject(err);
            //         });
            //     } else {
            //         // for any other error we reject the promise
            //         reject(err);
            //     }
            // });
            reject(new Error('Not implemented'));
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
            console.log('Delete: ', path);
            console.log('resolve: ', resolve);

            // // create a blob reader to read blob metadata
            // const blobReader = new BlobReader({
            //     axiosClient: this.axiosClient,
            //     repository: this.repository
            // });

            // // retrieve the sha of existing file (if any)
            // blobReader.GetMetadata(path).then(blobMetadata => {
            //     // delete the blob
            //     this.axiosClient.delete(`/${path}`, {
            //         headers: {
            //             'Accept': GitHubRESTAPIAcceptType.JSON
            //         },
            //         data: {
            //             message: `Delete ${path}`,
            //             sha: blobMetadata.sha
            //         }
            //     }).then(resp => {
            //         const commit = helper.constructICommit(resp);
            //         resolve(commit);
            //     }).catch(err => {
            //         const wrappedError = wrap(err);
            //         return wrappedError;
            //     });
            // }).catch(err => {
            //     const wrappedError = wrap(err);
            //     reject(wrappedError);
            // });

            reject(new Error('Not implemented'));
        });
    }




    // /**
    //  * Create a new blob (type `file`) at given path
    //  * @param path: path of the blob
    //  * @param content: content to be written
    //  * @throws ErrKindUnprocessableEntity if there is an existing directory at given path
    //  * @return Promise<[ICommit, IBlobMetadata]> - metadata of the blob created & commit details
    //  */
    // private Create(path: string, content: string): Promise<[ICommit, IBlobMetadata]> {
    //     return new Promise<[ICommit, IBlobMetadata]>((resolve, reject) => {
    //         console.log('Write: ', path, content);
    //         console.log('resolve: ', resolve);
    //         // // create a new blob
    //         // this.axiosClient.put(`/${path}`, {
    //         //     message: `Create ${path}`,
    //         //     content: Buffer.from(content).toString('base64')
    //         // }, {
    //         //     headers: {
    //         //         'Accept': GitHubRESTAPIAcceptType.JSON
    //         //     }
    //         // }).then(resp => {
    //         //     const wrappedResponse = helper.constructICommitAndIBlobMetadata(resp);
    //         //     resolve(wrappedResponse);
    //         // }).catch(err => {
    //         //     const wrappedError = wrap(err);
    //         //     reject(wrappedError);
    //         // });
    //         reject(new Error('Not implemented'));
    //     });
    // }

    // /**
    //  * Update the content of the blob (type `file`) at given path
    //  * @param path: path of the blob
    //  * @param content: content to be written
    //  * @param old_sha: sha of the existing blob
    //  * @throws ErrKindUnprocessableEntity if there is an existing directory at given path
    //  * @return Promise<[ICommit, IBlobMetadata]> - metadata of the blob created & commit details
    //  */
    // private Update(path: string, content: string, old_sha: string): Promise<[ICommit, IBlobMetadata]> {
    //     return new Promise<[ICommit, IBlobMetadata]>((resolve, reject) => {
    //         // // update the blob
    //         // this.axiosClient.put(`/${path}`, {
    //         //     message: `Update ${path}`,
    //         //     content: Buffer.from(content).toString('base64'),
    //         //     sha: old_sha
    //         // }, {
    //         //     headers: {
    //         //         'Accept': GitHubRESTAPIAcceptType.JSON
    //         //     }
    //         // }).then(resp => {
    //         //     const wrappedResponse = helper.constructICommitAndIBlobMetadata(resp);
    //         //     resolve(wrappedResponse);
    //         // }).catch(err => {
    //         //     const wrappedError = wrap(err);
    //         //     reject(wrappedError);
    //         // });
    //         reject(new Error('Not implemented'));
    //     });
    // }
}