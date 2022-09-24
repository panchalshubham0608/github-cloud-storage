// imports
import IGitHubCloudStorageError from "./error";
import * as errcodes from './errcodes';

/**
 * Check if the error is already wrapped
 * @param err  - The error to be handled
 * @returns - true if the error is already wrapped
 */
function isAlreadyWrapped(err: Error): boolean {
    if(!Object.prototype.hasOwnProperty.call(err, 'status_code')) return false;
    if(!Object.prototype.hasOwnProperty.call(err, 'message')) return false;
    if(!Object.prototype.hasOwnProperty.call(err, 'path')) return false;
    return true;
}

// Handles the GitHub REST API errors and returns an appropriate error object
export default function wrap(err: any): IGitHubCloudStorageError {
    if (isAlreadyWrapped(err)) return err;
    const status = err.response.status;
    const path = err.request.path;
    const message = err.response.data.message;
    switch (status) {
        case 400: return new errcodes.ErrKindBadRequest(message, path);
        case 401: return new errcodes.ErrKindUnauthorized(message, path);
        case 403: return new errcodes.ErrKindForbidden(message, path);
        case 404: return new errcodes.ErrKindNotFound(message, path);
        case 409: return new errcodes.ErrKindConflict(message, path);
        case 422: return new errcodes.ErrKindUnprocessableEntity(message, path);
        case 405: return new errcodes.ErrKindMethodNotAllowed(message, path);
        case 503: return new errcodes.ErrKindServiceUnavailable(message, path);
        default: return new errcodes.ErrKindUnknown(message, path);
    }
}
