// imports
import * as http from 'http-status-codes';
import GHCSErrorImpl from '../errorImpl';
import { GHCSErrorImplParams } from '../errorImpl';

/**
 * @type{ErrKindBadRequest} defines the error for HTTP status code 400
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400
 */
export default class ErrKindBadRequest extends GHCSErrorImpl {
    constructor(params: GHCSErrorImplParams) {
        super({
            ...params,
            name: 'GHCSError::ErrKindBadRequest',
            status_code: http.StatusCodes.BAD_REQUEST,
        });
    }
}
