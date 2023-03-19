// imports
import { AxiosResponse } from 'axios';
import IBlobMetadata from "../types/blobMetadata"
import ICommit from '../types/commit';

/**
 * Construct the `IBlobMetadata` object from the response of the GitHub REST API
 * @param resp - response from the GitHub REST API
 * @returns IBlobMetadata - blob metadata
 */
const constructIBlobMetadata = (resp: AxiosResponse<any, any>): IBlobMetadata => {
    const blobMetadata: IBlobMetadata = {
        name: resp.data.content.name,
        path: resp.data.content.path,
        sha: resp.data.content.sha,
        size: resp.data.content.size,
        url: resp.data.content.url,
        html_url: resp.data.content.html_url,
        git_url: resp.data.content.git_url,
        download_url: resp.data.content.download_url,
        type: resp.data.content.type,
        etag: null,
        last_modified: null,
    }
    return blobMetadata;
};

/**
 * Construct the commit object from the response of the GitHub REST API
 * @param resp - response from the GitHub REST API
 * @returns ICommit - commit details
 */
const constructICommit = (resp: AxiosResponse<any, any>): ICommit => {
    const commit: ICommit = {
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
 * Construct the `IBlobMetadata` object from the response of the GitHub REST API
 * and `ICommit` object from the response of the GitHub REST API
 * @param resp - response from the GitHub REST API
 * @returns [ICommit, IBlobMetadata] - commit details and blob metadata
 */
const constructICommitAndIBlobMetadata = (resp: AxiosResponse<any, any>): [ICommit, IBlobMetadata] => {
    const commit: ICommit = constructICommit(resp);
    const blobMetadata: IBlobMetadata = constructIBlobMetadata(resp);
    return [commit, blobMetadata];
}


// exports the items
export {
    constructIBlobMetadata,
    constructICommit,
    constructICommitAndIBlobMetadata
};