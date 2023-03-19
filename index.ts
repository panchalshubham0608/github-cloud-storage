// imports
import * as client from './src/client';
import * as types from './src/types';
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
    errors,
    types,
};

/**
 * creates a new client for the given configuration
 * @param config - configuration for the new client
 * @returns @type{Client} - the new client
 * @throws @type{ErrKindBadRequest} if the repository or owner is not provided
 */
const NewClient = (config: client.ClientConfig): client.Client => {
    return new client.ClientImpl(config);
};

// export the `NewClient` method
export { NewClient };
