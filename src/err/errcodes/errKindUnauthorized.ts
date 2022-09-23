// imports
import GitHubCloudStorageError from '../error';
import * as http from 'http-status-codes';

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401
export default class ErrKindUnauthorized implements GitHubCloudStorageError {
    readonly status_code: number = http.StatusCodes.UNAUTHORIZED;
    readonly message: string;
    readonly path: string;

    constructor(message: string, path: string) {
        this.message = message;
        this.path = path;
    }
}