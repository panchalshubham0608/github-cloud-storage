// imports
import IGitHubCloudStorageError from '../error';
import * as http from 'http-status-codes';

/**
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403
 */
export default class ErrKindForbidden implements IGitHubCloudStorageError {
    readonly status_code: number = http.StatusCodes.FORBIDDEN;
    readonly message: string;
    readonly path: string;

    /**
     * @hidden
     */
    constructor(message: string, path: string) {
        this.message = message;
        this.path = path;
    }
}