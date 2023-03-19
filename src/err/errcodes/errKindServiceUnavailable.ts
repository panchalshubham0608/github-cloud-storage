// imports
import * as http from 'http-status-codes';
import GHCSErrorImpl from '../errorImpl';
import { GHCSErrorImplParams } from '../errorImpl';

/**
 * @type{ErrKindServiceUnavailable} defines the error for HTTP status code 503
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/503
 */
export default class ErrKindServiceUnavailable extends GHCSErrorImpl {
    constructor(params: GHCSErrorImplParams) {
        super({
            ...params,
            name: 'GHCSError::ErrKindServiceUnavailable',
            status_code: http.StatusCodes.SERVICE_UNAVAILABLE,
        });
    }
}
