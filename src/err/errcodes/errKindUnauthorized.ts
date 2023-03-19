// imports
import * as http from 'http-status-codes';
import GHCSErrorImpl from '../errorImpl';
import { GHCSErrorImplParams } from '../errorImpl';

/**
 * @type{ErrKindUnauthorized} defines the error for HTTP status code 401
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401
 */
export default class ErrKindUnauthorized extends GHCSErrorImpl {
    constructor(params: GHCSErrorImplParams) {
        super({
            ...params,
            name: 'GHCSError::ErrKindUnauthorized',
            status_code: http.StatusCodes.UNAUTHORIZED,
        });
    }
}
