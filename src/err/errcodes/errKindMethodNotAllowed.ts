// imports
import * as http from 'http-status-codes';
import GHCSErrorImpl from '../errorImpl';
import { GHCSErrorImplParams } from '../errorImpl';

/**
 * @type{ErrKindMethodNotAllowed} defines the error for HTTP status code 405
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
 */
export default class ErrKindMethodNotAllowed extends GHCSErrorImpl {
    constructor(params: GHCSErrorImplParams) {
        super({
            ...params,
            name: 'GHCSError::ErrKindMethodNotAllowed',
            status_code: http.StatusCodes.METHOD_NOT_ALLOWED,
        });
    }
}
