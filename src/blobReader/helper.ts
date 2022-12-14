// imports
import IBlobContent from "../common/blobContent";
import IBlobMetadata from '../common/blobMetadata';
import IGitHubCloudStorageError from '../err/error';
import * as errcodes from '../err/errcodes';
import { AxiosResponse } from 'axios';

/**
 * Takes the HTTP response and construct an appropriate response for the client
 * If the blob at given path is found to be a `directory` 
 * then returns an error of ErrKindUnprocessableEntityErrKindUnprocessableEntity
 * If the blob at given path is found to be a `file`
 * then returns IBlobContent object
 * 
 * @param resp The response received from the HTTP request
 * 
 * @returns [IBlobContent, IGitHubCloudStorageError] 
 */
const constructIBlobContent = (resp : AxiosResponse<any, any>) : [IBlobContent | null, IGitHubCloudStorageError | null]  => {
    // check if the blob at given path is a directory
    if (resp.data instanceof Array) {
        return [null, new errcodes.ErrKindUnprocessableEntity(
            "Blob is a directory",
            resp.request.path
        )]
    }
    return [{
        size: parseInt(resp.headers['content-length']),
        body: resp.data,
        etag: resp.headers['etag'].replace(/"/g, ''),
        last_modified: new Date(resp.headers['last-modified']),
    }, null]
}


/**
 * Takes the HTTP response and construct an appropriate response for the client
 * If the blob at given path is found to be a `directory`
 * then returns an error of ErrKindUnprocessableEntity
 * If the blob at given path is found to be a `file`
 * then returns IBlobMetadata object
 * 
 * @param resp The response received from the HTTP request
 * @returns [IBlobMetadata, IGitHubCloudStorageError]
 */
const constructIBlobMetadata = (resp: AxiosResponse<any, any>) : [IBlobMetadata | null, IGitHubCloudStorageError | null] => {
    // check if the blob at given path is a directory
    if (resp.data instanceof Array) {
        return [null, new errcodes.ErrKindUnprocessableEntity(
            "Blob is a directory",
            resp.request.path
        )]
    }
    return [{
        name: resp.data.name,
        path: resp.data.path,
        sha: resp.data.sha,
        size: resp.data.size,
        url: resp.data.url,
        html_url: resp.data.html_url,
        git_url: resp.data.git_url,
        download_url: resp.data.download_url,
        blob_type: resp.data.type,
        etag: resp.headers['etag'].replace(/"/g, ''),
        last_modified: new Date(resp.headers['last-modified']),
    }, null]
};


/**
 * Takes the HTTP response and construct an appropriate response for the client
 * If the blob at given path is found to be a `file`
 * then returns an error of ErrKindUnprocessableEntity
 * If the blob at given path is found to be a `directory`
 * then returns Array<IBlobMetadata> containing the list of metadata of each blobs
 * 
 * @param resp The response received from the HTTP request
 * @returns [Array<IBlobMetadata>, IGitHubCloudStorageError]
 */
const constructBlobsMetadataList = (resp: AxiosResponse<any, any>) : [Array<IBlobMetadata> | null, IGitHubCloudStorageError | null] => {
    // check if the blob at given path is a directory
    if (!(resp.data instanceof Array)) {
        return [null, new errcodes.ErrKindUnprocessableEntity(
            "Blob is a file",
            resp.request.path
        )]
    }

    // construct the list of blob metadata
    const blobsMetadataList : Array<IBlobMetadata> = [];
    for (const blobMetadataItem of resp.data) {
        blobsMetadataList.push({
                name: blobMetadataItem.name,
                path: blobMetadataItem.path,
                sha: blobMetadataItem.sha,
                size: blobMetadataItem.size,
                url: blobMetadataItem.url,
                html_url: blobMetadataItem.html_url,
                git_url: blobMetadataItem.git_url,
                download_url: blobMetadataItem.download_url,
                blob_type: blobMetadataItem.type,
                etag: null,
                last_modified: null,
        });
    }
    return [blobsMetadataList, null]
};

// Export the helper function
export {
    constructIBlobContent,
    constructIBlobMetadata,
    constructBlobsMetadataList
};