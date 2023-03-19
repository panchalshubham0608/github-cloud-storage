// imports
import * as http from 'http-status-codes';
import GHCSErrorImpl from '../errorImpl';
import { GHCSErrorImplParams } from '../errorImpl';

/**
 * @type{ErrKindUnknown} defines the error for HTTP status code 500
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500
 */
export default class ErrKindUnknown extends GHCSErrorImpl {
    constructor(params: GHCSErrorImplParams) {
        super({
            ...params,
            name: 'GHCSError::ErrKindUnknown',
            status_code: http.StatusCodes.INTERNAL_SERVER_ERROR,
        });
    }
}
