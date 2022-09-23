// imports
import GitHubCloudStorageError from "./error";
import * as errcodes from './errcodes';

// Handles the GitHub REST API errors and returns an appropriate error object
export default function wrap(err: any): GitHubCloudStorageError {
    const status = err.response.status;
    const path = err.request.path;
    const message = err.response.data.message;
    switch (status) {
        case 400: return new errcodes.ErrKindBadRequest(message, path);
        case 401: return new errcodes.ErrKindUnauthorized(message, path);
        case 403: return new errcodes.ErrKindForbidden(message, path);
        case 404: return new errcodes.ErrKindNotFound(message, path);
        default: return new errcodes.ErrKindUnknown(message, path);
    }
}
