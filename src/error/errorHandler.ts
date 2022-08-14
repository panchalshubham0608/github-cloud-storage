// imports
import IGitHubCloudStorageError from "./error";
import GitHubCloudStorageErrorNotFound from "./notFoundImpl";
import GitHubCloudStorageErrorUnauthorized from "./unauthorizedImpl";

// Handles the GitHub REST API errors and returns an appropriate error object
export default function parseResponseError(err: any) : IGitHubCloudStorageError | null{
    let status = err.response.status;
    let path = err.request.path;
    let message = err.response.data.message;
    switch (status) {
        case 404: return new GitHubCloudStorageErrorNotFound(message, path)
        case 401: return new GitHubCloudStorageErrorUnauthorized(message, path);
        default: return null;
    }
};
