// imports
import * as http from 'http-status-codes';
import GHCSErrorImpl from '../errorImpl';
import { GHCSErrorImplParams } from '../errorImpl';

/**
 * @type{ErrKindForbidden} defines the error for HTTP status code 403
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403
 */
export default class ErrKindForbidden extends GHCSErrorImpl {
    constructor(params: GHCSErrorImplParams) {
        super({
            ...params,
            name: 'GHCSError::ErrKindForbidden',
            status_code: http.StatusCodes.FORBIDDEN,
        });
    }
}
