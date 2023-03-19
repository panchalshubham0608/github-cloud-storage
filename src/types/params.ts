// imports
import { Octokit } from "octokit";

/**
 * @type{Params} defines the type for the common parameters 
 * for the @type{BlobReader} and @type{BlobWriter} classes.
 * @hidden
 * @internal
 */

export default interface Params {

    /**
     * the octokit instance to use for the HTTP requests
     * @hidden
     * @internal
     * @type {Octokit}
     * @memberof Params
     * @property {Octokit} octokit
     * @see https://www.npmjs.com/package/octokit
     */
    readonly octokit: Octokit;

    /**
     * the name of the repository to interact with
     * @hidden
     * @internal
     * @type {string}
     * @memberof Params
     * @property {string} repository
     * @see https://docs.github.com/en/rest/repos/contents#get-repository-content
     * @see https://docs.github.com/en/rest/repos/contents#create-or-update-file-contents
     * @see https://docs.github.com/en/rest/repos/contents#delete-a-file
     */
    readonly repository: string;

    /**
     * the name of the owner of the repository
     * @hidden
     * @internal
     * @type {string}
     * @memberof Params
     * @property {string} owner
     * @see https://docs.github.com/en/rest/repos/contents#get-repository-content
     * @see https://docs.github.com/en/rest/repos/contents#create-or-update-file-contents
     * @see https://docs.github.com/en/rest/repos/contents#delete-a-file
     */
    readonly owner: string;

}
