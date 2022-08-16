// imports
import IGitHubCloudStorageError from "./error";
import GitHubCloudStorageErrorForbidden from "./forbiddenImpl";
import GitHubCloudStorageErrorFound from "./foundImpl";
import GitHubCloudStorageErrorNotFound from "./notFoundImpl";
import GitHubCloudStorageErrorUnauthorized from "./unauthorizedImpl";
import GitHubCloudStorageErrorUnknown from "./unknownError";

// Handles the GitHub REST API errors and returns an appropriate error object
export default function parseResponseError(err: any) : IGitHubCloudStorageError {
    const status = err.response.status;
    const path = err.request.path;
    const message = err.response.data.message;
    switch (status) {
        case 302: return new GitHubCloudStorageErrorFound(message, path);
        case 401: return new GitHubCloudStorageErrorUnauthorized(message, path);
        case 403: return new GitHubCloudStorageErrorForbidden(message, path);
        case 404: return new GitHubCloudStorageErrorNotFound(message, path);
        default: return new GitHubCloudStorageErrorUnknown(message, path);     
    }
}
