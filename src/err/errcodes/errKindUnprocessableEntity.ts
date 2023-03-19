// imports
import * as http from 'http-status-codes';
import GHCSErrorImpl from '../errorImpl';
import { GHCSErrorImplParams } from '../errorImpl';

/**
 * @type{ErrKindUnprocessableEntity} defines the error for HTTP status code 422
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422
 */
export default class ErrKindUnprocessableEntity extends GHCSErrorImpl {
    constructor(params: GHCSErrorImplParams) {
        super({
            ...params,
            name: 'GHCSError::ErrKindUnprocessableEntity',
            status_code: http.StatusCodes.UNPROCESSABLE_ENTITY,
        });
    }
}
