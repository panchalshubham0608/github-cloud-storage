// imports
import 'jest';
import * as errcodes from '../../err/errcodes';
import * as http from 'http-status-codes';
import wrap from '../../err/errorHandler';

// create Unit Tests for `ErrorHandler`
describe('ErrorHandler', () => {

    it('error handler should return correct error object for 400', () => {
        const err = {
            response: {
                status: 400,
                data: {
                    message: 'Bad Request'
                }
            },
            request: {
                path: '/bad-request'
            }
        };
        const error = wrap(err);
        expect(error).toBeInstanceOf(errcodes.ErrKindBadRequest);
        expect(error.status_code).toBe(http.StatusCodes.BAD_REQUEST);
    });

    it('error handler should return correct error object for 401', () => {
        const err = {
            response: {
                status: 401,
                data: {
                    message: 'Unauthorized'
                }
            },
            request: {
                path: '/unauthorized'
            }
        };
        const error = wrap(err);
        expect(error).toBeInstanceOf(errcodes.ErrKindUnauthorized);
        expect(error.status_code).toBe(http.StatusCodes.UNAUTHORIZED);
    });

    it('error handler should return correct error object for 403', () => {
        const err = {
            response: {
                status: 403,
                data: {
                    message: 'Forbidden'
                }
            },
            request: {
                path: '/forbidden'
            }
        };
        const error = wrap(err);
        expect(error).toBeInstanceOf(errcodes.ErrKindForbidden);
        expect(error.status_code).toBe(http.StatusCodes.FORBIDDEN);
    });

    it('error handler should return correct error object for 404', () => {
        const err = {
            response: {
                status: 404,
                data: {
                    message: 'Not Found'
                }
            },
            request: {
                path: '/not-found'
            }
        };
        const error = wrap(err);
        expect(error).toBeInstanceOf(errcodes.ErrKindNotFound);
        expect(error.status_code).toBe(http.StatusCodes.NOT_FOUND);
    });

    it('error handler should return correct error object for 409', () => {
        const err = {
            response: {
                status: 409,
                data: {
                    message: 'Conflict'
                }
            },
            request: {
                path: '/conflict'
            }
        };
        const error = wrap(err);
        expect(error).toBeInstanceOf(errcodes.ErrKindConflict);
        expect(error.status_code).toBe(http.StatusCodes.CONFLICT);
    });

    it('error handler should return correct error object for 422', () => {
        const err = {
            response: {
                status: 422,
                data: {
                    message: 'Unprocessable Entity'
                }
            },
            request: {
                path: '/unprocessable-entity'
            }
        };
        const error = wrap(err);
        expect(error).toBeInstanceOf(errcodes.ErrKindUnprocessableEntity);
        expect(error.status_code).toBe(http.StatusCodes.UNPROCESSABLE_ENTITY);
    });

    it('error handler should return correct error object for 405', () => {
        const err = {
            response: {
                status: 405,
                data: {
                    message: 'Method Not Allowed'
                }
            },
            request: {
                path: '/method-not-allowed'
            }
        };
        const error = wrap(err);
        expect(error).toBeInstanceOf(errcodes.ErrKindMethodNotAllowed);
        expect(error.status_code).toBe(http.StatusCodes.METHOD_NOT_ALLOWED);
    });

    it('error handler should return correct error object for 503', () => {
        const err = {
            response: {
                status: 503,
                data: {
                    message: 'Service Unavailable'
                }
            },
            request: {
                path: '/service-unavailable'
            }
        };
        const error = wrap(err);
        expect(error).toBeInstanceOf(errcodes.ErrKindServiceUnavailable);
        expect(error.status_code).toBe(http.StatusCodes.SERVICE_UNAVAILABLE);
    });

    it('error handler should return correct error object for unknown error', () => {
        const err = {
            response: {
                status: 500,
                data: {
                    message: 'Internal Server Error'
                }
            },
            request: {
                path: '/internal-server-error'
            }
        };
        const error = wrap(err);
        expect(error).toBeInstanceOf(errcodes.ErrKindUnknown);
        expect(error.status_code).toBe(http.StatusCodes.INTERNAL_SERVER_ERROR);
    });

});