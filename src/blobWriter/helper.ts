// imports
import { AxiosResponse } from 'axios';
import BlobMetadata from "../common/blobMetadata"
import Commit from '../common/commit';

/**
 * Construct the `BlobMetadata` object from the response of the GitHub REST API
 * @param resp - response from the GitHub REST API
 * @returns BlobMetadata - blob metadata
 */
const constructBlobMetadata = (resp: AxiosResponse<any, any>): BlobMetadata => {
    let blobMetadata: BlobMetadata = {
        name: resp.data.content.name,
        path: resp.data.content.path,
        sha: resp.data.content.sha,
        size: resp.data.content.size,
        url: resp.data.content.url,
        html_url: resp.data.content.html_url,
        git_url: resp.data.content.git_url,
        download_url: resp.data.content.download_url,
        blob_type: resp.data.content.type,
        etag: null,
        last_modified: null,
    }
    return blobMetadata;
};

/**
 * Construct the commit object from the response of the GitHub REST API
 * @param resp - response from the GitHub REST API
 * @returns Commit - commit details
 */
const constructCommit = (resp: AxiosResponse<any, any>): Commit => {
    let commit: Commit = {
        sha: resp.data.commit.sha,
        node_id: resp.data.commit.node_id,
        url: resp.data.commit.url,
        html_url: resp.data.commit.html_url,
        author: {
            name: resp.data.commit.author.name,
            email: resp.data.commit.author.email,
            date: new Date(resp.data.commit.author.date),
        },
        committer: {
            name: resp.data.commit.committer.name,
            email: resp.data.commit.committer.email,
            date: new Date(resp.data.commit.committer.date),
        },
        message: resp.data.commit.message,
    }
    return commit;
};

/**
 * Construct the `BlobMetadata` object from the response of the GitHub REST API
 * and `Commit` object from the response of the GitHub REST API
 * @param resp - response from the GitHub REST API
 * @returns [Commit, BlobMetadata] - commit details and blob metadata
 */
const constructCommitAndBlobMetadata = (resp: AxiosResponse<any, any>): [Commit, BlobMetadata] => {
    let commit: Commit = constructCommit(resp);
    let blobMetadata: BlobMetadata = constructBlobMetadata(resp);
    return [commit, blobMetadata];
}


// exports the items
export {
    constructBlobMetadata,
    constructCommit,
    constructCommitAndBlobMetadata
};