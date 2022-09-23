// imports
import GitHubCloudStorageError from '../error';
import * as http from 'http-status-codes';

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
export default class ErrKindMethodNotAllowed implements GitHubCloudStorageError {
    readonly status_code: number = http.StatusCodes.METHOD_NOT_ALLOWED;
    readonly message: string;
    readonly path: string;

    constructor(message: string, path: string) {
        this.message = message;
        this.path = path;
    }
}