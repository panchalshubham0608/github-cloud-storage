// imports
import GHCSError from "./error";
import * as http from 'http-status-codes';

/**
 * @type{GHCSErrorImplParams} defines the parameters for the @type{GHCSErrorImpl} constructor
 * @hidden
 * @internal
 */
interface GHCSErrorImplParams {
    /**
     * error name
     * @readonly
     * @type{string}
     * @hidden
     * @internal
     */
    readonly name?: string;

    /**
     * error message
     * @readonly
     * @type{string}
     * @hidden
     * @internal
     */
    readonly message: string;

    /**
     * stack trace
     * @readonly
     * @type{string}
     * @hidden
     * @internal
     */
    readonly stack?: string;

    /**
     * response status code
     * @readonly
     * @type{number}
     * @hidden
     * @internal
     */
    readonly status_code?: number;

    /**
     * request path that resulted in the error
     * @readonly
     * @type{string}
     * @hidden
     * @internal
     */
    readonly request_path?: string;
}

/**
 * @type{GHCSErrorImpl} implements the @type{GHCSError} interface.
 * @hidden
 * @internal
 */
export default class GHCSErrorImpl implements GHCSError {
    /**
     * error name
     * @readonly
     * @type{string}
     * @hidden
     * @internal
     */
    readonly name: string = "GHCSError";

    /**
     * error message
     * @readonly
     * @type{string}
     * @hidden
     * @internal
     */
    readonly message: string;

    /**
     * stack trace
     * @readonly
     * @type{string}
     * @hidden
     * @internal
     */
    readonly stack?: string;

    /**
     * response status code
     * @readonly
     * @type{number}
     * @hidden
     * @internal
     */
    readonly status_code: number;

    /**
     * request path that resulted in the error
     * @readonly
     * @type{string}
     * @hidden
     * @internal
     */
    readonly request_path: string;

    /**
     * Creates an instance of @type{GHCSErrorImpl}.
     * @param params - parameters for creating a new @type{GHCSErrorImpl}
     * @hidden
     * @internal
     */
    constructor(params : GHCSErrorImplParams) {
        // initialize properties
        this.name = params.name || "GHCSError";
        this.message = params.message;
        this.stack = params.stack;
        this.status_code = params.status_code || http.StatusCodes.INTERNAL_SERVER_ERROR;
        this.request_path = params.request_path || "";
    }
}


// exports
export {
    GHCSErrorImplParams,
};
