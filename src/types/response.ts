/**
 * @type{GHCSResponse} defines the schema for a response from `ghcs` library
 */
export default interface GHCSResponse {

    /**
     * response headers
     * @readonly
     */
    readonly headers : {
        /**
         * key of the header
         * @type {string}
         * @readonly
         */
        readonly key : string;

        /**
         * value of the header
         * @type {string}
         * @readonly
         */
        readonly value : string;
    }

    /**
     * request url
     * @readonly
     * @type {string}
     */
    readonly request_url : string;

}
