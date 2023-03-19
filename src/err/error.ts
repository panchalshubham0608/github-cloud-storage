/**
 * @type{GHCSError} defines a generic Error for the library
 */
export default interface GHCSError extends Error {

    /**
     * response status code
     * @readonly
     * @type{number}
     */
    readonly status_code: number;

    /**
     * request path that resulted in the error
     * @readonly
     * @type{string}
     */
    readonly request_path?: string;
}
