// imports
import GHCSError from "./error";
import * as errcodes from './errcodes';
// import GHCSErrorImpl, { GHCSErrorImplParams } from "./errorImpl";

// /**
//  * Check if the error is already wrapped
//  * @param err  - The error to be handled
//  * @returns - true if the error is already wrapped
//  * @hidden
//  * @internal
//  */
// function isAlreadyWrapped(err: Error): boolean {
//     if(!Object.prototype.hasOwnProperty.call(err, 'status_code')) return false;
//     if(!Object.prototype.hasOwnProperty.call(err, 'message')) return false;
//     if(!Object.prototype.hasOwnProperty.call(err, 'request_path')) return false;
//     return true;
// }

// Handles the GitHub REST API errors and returns an appropriate error object
export default function wrap(err: any): GHCSError {
    // check if error has response
    if (err.response) {
        let status = err.response.status || 500;
        let path = err.response.url || "";
        let message = err.response.data.message || "";
        switch (status) {
            case 400: return new errcodes.ErrKindBadRequest({message, request_path: path});
            case 401: return new errcodes.ErrKindUnauthorized({message, request_path: path});
            case 403: return new errcodes.ErrKindForbidden({message, request_path: path});
            case 404: return new errcodes.ErrKindNotFound({message, request_path: path});
            case 405: return new errcodes.ErrKindMethodNotAllowed({message, request_path: path});
            case 409: return new errcodes.ErrKindConflict({message, request_path: path});
            case 422: return new errcodes.ErrKindUnprocessableEntity({message, request_path: path});
            case 500: return new errcodes.ErrKindUnknown({message, request_path: path});
            case 503: return new errcodes.ErrKindServiceUnavailable({message, request_path: path});
            default: return new errcodes.ErrKindUnknown({message, request_path: path});
        }
    }

    // unexpected error
    return new errcodes.ErrKindUnknown({...err});
}
