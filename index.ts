// imports
import * as blobReader from './src/blobReader'
import * as blobWriter from './src/blobWriter';
import * as client from './src/client';
import * as types from './src/common';
import * as errors from './src/err';


/**
 * `ghcs (github-cloud-storage)` provides a simple interface to read and write blobs to a GitHub repository.  
 * The blobs are stored in the repository as files.  
 * This library makes use of the GitHub API to read and write blobs.  
 * @see https://docs.github.com/en/rest/repos/contents#get-repository-content
 * @see https://docs.github.com/en/rest/repos/contents#create-or-update-file-contents
 * @see https://docs.github.com/en/rest/repos/contents#delete-a-file
 */
export {
    client,
    errors,
    types,
    blobReader,
    blobWriter
};

