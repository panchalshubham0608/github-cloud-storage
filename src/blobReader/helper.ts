// imports
import BlobMetadata from '../types/blobMetadata';
import GHCSError from '../err/error';
import * as errcodes from '../err/errcodes';
import { GetMetadataResponse, GetContentResponse, ListBlobsResponse } from './response';


/**
 * constructBlobMetadata takes the data received from the HTTP request and constructs the appropriate metadata
 * @param data - The data received from the HTTP request
 */
const constructBlobMetadata = (data : any, headers: any) : BlobMetadata => {
    return {
        name: data.name,
        path: data.path,
        sha: data.sha,
        size: data.size,
        url: data.url,
        html_url: data.html_url,
        git_url: data.git_url,
        download_url: data.download_url,
        type: data.type,
        etag: headers ? headers['etag'].replace(/"/g, '') : null,
        last_modified: headers ? new Date(headers['last-modified']) : null,    
    }
};

/**
 * Takes the HTTP response and construct an appropriate response for the client
 * @param resp The response received from the HTTP request
 * @returns [@type{GetMetadataResponse}, @type{GHCSError}]
 * @throws @type{ErrKindUnprocessableEntity} - if the path does not correspond to a `file`.
 * @hidden
 * @internal
 */
const constructGetMetadataResponse = (resp: any) : [GetMetadataResponse | null, GHCSError | null] => {
    // check if the blob at given path is a directory
    if (resp.data instanceof Array) {
        return [null, new errcodes.ErrKindUnprocessableEntity({
            message: "Blob is a directory",
            request_path: resp.url,
        })]
    }

    // construct the response
    let metadataResp : GetMetadataResponse = {
        headers: resp.headers,
        request_url: resp.url,
        metadata: constructBlobMetadata(resp.data, resp.headers),
    };

    // return the response
    return [metadataResp, null]
};



/**
 * Takes the HTTP response and construct an appropriate response for the client
 * @param resp The response received from the HTTP request
 * @returns [@type{GetContentResponse}, @type{GHCSError}]
 * @throws @type{ErrKindUnprocessableEntity} - if the path does not correspond to a `file`.
 * @hidden
 * @internal
 */
const constructGetContentResponse = (resp : any) : [GetContentResponse | null, GHCSError | null]  => {
    // check if the blob at given path is a directory
    if (resp.data instanceof Array) {
        return [null, new errcodes.ErrKindUnprocessableEntity({
            message: "Blob is a directory",
            request_path: resp.url,
        })]
    }

    // construct the response
    let contentResp : GetContentResponse = {
        headers: resp.headers,
        request_url: resp.url,
        body: resp.data,
    }

    // return the response
    return [contentResp, null]
}



/**
 * Takes the HTTP response and construct an appropriate response for the client
 * @param resp The response received from the HTTP request
 * @returns [ListBlobsResponse, GHCSError]
 * @throws @type{ErrKindUnprocessableEntity} - if the path does not correspond to a `directory`.
 * @hidden
 * @internal
 */
const constructListBlobsResponse = (resp: any) : [ListBlobsResponse | null, GHCSError | null] => {
    // check if the blob at given path is a directory
    if (!(resp.data instanceof Array)) {
        return [null, new errcodes.ErrKindUnprocessableEntity({
            message: "Blob is not a directory",
            request_path: resp.url,
        })]
    }

    // construct the list of blob metadata
    const blobsMetadataList : Array<BlobMetadata> = [];
    for (const blobMetadataItem of resp.data) {
        blobsMetadataList.push(constructBlobMetadata(blobMetadataItem, null));
    }

    // construct the response
    let listBlobsResp : ListBlobsResponse = {
        headers: resp.headers,
        request_url: resp.url,
        blobs: blobsMetadataList
    };

    // return the response
    return [listBlobsResp, null]
};

// Export the helper function
export {
    constructGetMetadataResponse,
    constructGetContentResponse,
    constructListBlobsResponse
};
