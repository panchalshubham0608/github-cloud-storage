// imports
import GitHubCloudStorageError from '../error';
import * as http from 'http-status-codes';

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404
export default class ErrKindNotFound implements GitHubCloudStorageError {
    readonly status_code: number = http.StatusCodes.NOT_FOUND;
    readonly message: string;
    readonly path: string;

    constructor(message: string, path: string) {
        this.message = message;
        this.path = path;
    }
}