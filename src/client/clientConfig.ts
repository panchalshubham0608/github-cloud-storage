/**
 * Defines the configuration for the new client.
 */
export default interface IClientConfig {
    /**
     * the name of the owner of the repository
     */
    readonly owner: string;

    /**
     * the name of the repository
     */
    readonly repository: string;

    /**
     * the timeout for the request in milliseconds
     */
    readonly timeout?: number;

    /**
     * the timeout error message to be used
     */
    readonly timeoutErrorMessage?: string;

    /**
     * the token to be used for authentication
     * @see https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line
     * @see https://docs.github.com/en/rest/overview/resources-in-the-rest-api#authentication
     * @see https://docs.github.com/en/rest/repos/contents#get-repository-content  
     * @see https://docs.github.com/en/rest/repos/contents#create-or-update-file-contents  
     * @see https://docs.github.com/en/rest/repos/contents#delete-a-file  
     */
    readonly token: string;
}
