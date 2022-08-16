// imports
import GitHubCloudStorageError from './errorImpl';
import GitHubCloudStorageErrorForbidden from './forbiddenImpl';
import GitHubCloudStorageErrorNotFound from './notFoundImpl';
import GitHubCloudStorageErrorUnauthorized from './unauthorizedImpl';
import GitHubCloudStorageErrorUnknown from './unknownErrorImpl'

// export all errors
export {
    GitHubCloudStorageError,
    GitHubCloudStorageErrorForbidden,
    GitHubCloudStorageErrorNotFound,
    GitHubCloudStorageErrorUnauthorized,
    GitHubCloudStorageErrorUnknown
}