/**
 * @type{ClientConfig} defines the configuration for the new client.
 */
export default interface ClientConfig {
    /**
     * the name of the owner of the repository
     * @readonly
     * @see https://docs.github.com/en/rest/overview/resources-in-the-rest-api#authentication
     * @type {string}
     */
    readonly owner: string;

    /**
     * the name of the repository
     * @readonly
     * @see https://docs.github.com/en/rest/overview/resources-in-the-rest-api#authentication
     * @type {string}
     */
    readonly repository: string;

    /**
     * the token to be used for authentication
     * @readonly
     * @see https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line
     * @see https://docs.github.com/en/rest/overview/resources-in-the-rest-api#authentication
     * @see https://docs.github.com/en/rest/repos/contents#get-repository-content
     * @see https://docs.github.com/en/rest/repos/contents#create-or-update-file-contents
     * @see https://docs.github.com/en/rest/repos/contents#delete-a-file
     * @type {string}
     */
    readonly token: string;

    /**
     * should the client retry on failure
     * @readonly
     * @default true
     * @see https://www.npmjs.com/package/octokit
     */
    readonly retry?: boolean;
}
