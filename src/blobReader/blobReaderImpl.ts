// imports
import BlobReader from "./blobReader";
import wrap from "../err/errorHandler";
import * as helpers from './helper';
import Params from "../types/params";
import { GetMetadataResponse, GetContentResponse, ListBlobsResponse } from "./response"; 


/**
 * @type{BlobReaderParams} defines the parameters for creating a new @type{BlobReaderImpl}.
 * @hidden
 * @internal
 */
export interface BlobReaderParams extends Params { }

/**
 * @type{BlobReaderImpl} implements the @type{BlobReader} interface.
 * This is a `lazy` reader that facilitates reading of blobs from a repository.
 * The @type{BlobReaderImpl} should not be created directly, 
 * instead use the `NewBlobReader` method of the @type{Client}.
 * @internal
 * @hidden
 */
export default class BlobReaderImpl implements BlobReader {

    /**
     * parameters for creating a new @type{BlobReaderImpl}
     * @hidden
     * @internal
     */
    private params: BlobReaderParams;

    /**
     * Creates an instance of @type{BlobReader}.
     * @param params - parameters for creating a new @type{BlobReader}
     * @hidden
     * @internal
     */
    constructor(params: BlobReaderParams) {
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
     * Retrieve the metadata of the blob at given path.
     * @param path - path of the file for which metadata is to be retrieved
     * @throws @type{ErrKindUnprocessableEntity} if the blob at given path is not of type `file`
     * @returns Promise<@type{GetMetadataResponse}> - promise that resolves to @type{GetMetadataResponse}
     * @see {@link https://docs.github.com/en/rest/reference/repos#get-repository-content}
     */
     GetMetadata(path: string): Promise<GetMetadataResponse> {
        return new Promise<GetMetadataResponse>((resolve, reject) => {
            // make the request using octokit
            this.params.octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
                owner: this.params.owner,
                repo: this.params.repository,
                path: path,
            }).then(resp => {
                const [blobMetadataResp, err] = helpers.constructGetMetadataResponse(resp);
                if (blobMetadataResp !== null) resolve(blobMetadataResp);
                else reject(err);
            }).catch(err => {
                const wrappedError = wrap(err);
                reject(wrappedError);
            });
        });
    }

    /**
     * Retrieve the content of the blob at given path.
     * @param path - path of the file for which content is to be retrieved
     * @throws @type{ErrKindUnprocessableEntity} if the blob at given path is not of type `file`
     * @returns Promise<@type{GetContentResponse}> - promise that resolves to @type{GetContentResponse}
     * @see {@link https://docs.github.com/en/rest/reference/repos#get-repository-content}
     */
     GetContent(path: string): Promise<GetContentResponse> {
        return new Promise<GetContentResponse>((resolve, reject) => {
            this.params.octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
                owner: this.params.owner,
                repo: this.params.repository,
                path: path,
                headers: {
                    'Accept': 'application/vnd.github.v3.raw'
                },
            }).then(resp => {
                const [blobContentResp, err] = helpers.constructGetContentResponse(resp);
                if (blobContentResp !== null) resolve(blobContentResp);
                else reject(err);
            }).catch(err => {
                const wrappedError = wrap(err);
                reject(wrappedError);
            });
        });
    }



    /**
     * Retrieve the list of blob metadata for directory at given path.
     * @param path - path of the directory for which the blobs are to be listed
     * @throws @type{ErrKindUnprocessableEntity} if the blob at given path is not of type `directory`
     * @returns Promise<@type{ListBlobsResponse}> - promise that resolves to @type{ListBlobsResponse}
     * @see {@link https://docs.github.com/en/rest/reference/repos#get-repository-content}
     */
    ListBlobs(path: string): Promise<ListBlobsResponse> {
        return new Promise<ListBlobsResponse>((resolve, reject) => {
            this.params.octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
                owner: this.params.owner,
                repo: this.params.repository,
                path: path,
            }).then(resp => {
                const [blobsListResp, err] = helpers.constructListBlobsResponse(resp);
                if (blobsListResp !== null) resolve(blobsListResp);
                else reject(err);
            }).catch(err => {
                const wrappedError = wrap(err);
                reject(wrappedError);
            });
        });
    }
}

