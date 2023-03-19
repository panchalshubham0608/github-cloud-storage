// imports
import { GHCSResponse } from 'src/types';
import { BlobMetadata } from 'src/types';

/**
 * @type{GetContentResponse} defines the interface for a response to a request to `GetContent` of a blob.
 * @see https://docs.github.com/en/rest/reference/repos#get-repository-content
 */
interface GetContentResponse extends GHCSResponse {

    /**
     * content of the blob
     * @readonly
     * @type {string}
     */
    readonly body : string;
}


/**
 * @type{GetMetadataResponse} defines the interface for a response to a request to `GetMetadata` of a blob.
 * @see https://docs.github.com/en/rest/reference/repos#get-repository-content
 */
interface GetMetadataResponse extends GHCSResponse {

    /**
     * metadata of the blob
     * @readonly
     * @type {BlobMetadata}
     * @see https://docs.github.com/en/rest/reference/repos#get-repository-content
     */
    readonly metadata : BlobMetadata;

}

/**
 * @type{ListBlobsResponse} defines the interface for a response to a request to `ListBlobs` of a blob.
 * @see https://docs.github.com/en/rest/reference/repos#get-repository-content
 */
interface ListBlobsResponse extends GHCSResponse {

    /**
     * list of metadata of the blobs
     * @readonly
     * @type {Array<BlobMetadata>}
     * @see https://docs.github.com/en/rest/reference/repos#get-repository-content
     */
    readonly blobs : Array<BlobMetadata>;
}


// exports
export {
    GetContentResponse,
    GetMetadataResponse,
    ListBlobsResponse
};
