// imports
import * as http from 'http-status-codes';
import GHCSErrorImpl from '../errorImpl';
import { GHCSErrorImplParams } from '../errorImpl';

/**
 * @type{ErrKindNotFound} defines the error for HTTP status code 404
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404
 */
export default class ErrKindNotFound extends GHCSErrorImpl {
    constructor(params: GHCSErrorImplParams) {
        super({
            ...params,
            name: 'GHCSError::ErrKindNotFound',
            status_code: http.StatusCodes.NOT_FOUND,
        });
    }
}
