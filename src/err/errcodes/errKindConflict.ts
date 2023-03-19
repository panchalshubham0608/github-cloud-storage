// imports
import * as http from 'http-status-codes';
import GHCSErrorImpl from '../errorImpl';
import { GHCSErrorImplParams } from '../errorImpl';

/**
 * @type{ErrKindConflict} defines the error for HTTP status code 409
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409
 */
export default class ErrKindConflict extends GHCSErrorImpl {
    constructor(params: GHCSErrorImplParams) {
        super({
            ...params,
            name: 'GHCSError::ErrKindConflict',
            status_code: http.StatusCodes.CONFLICT,
        });
    }
}
