/**
 * IBlobContent defines the interface for the response of the `GetContent` method of the `IBlobReader` interface.
 * @see https://docs.github.com/en/rest/reference/repos#get-repository-content
 */
export default interface IBlobContent {
    /**
     * the body of the blob
     */
    readonly body: string;

    /**
     * etag of the blob
     */
    readonly etag: string;

    /**
     * date of last modification of the blob
     */
    readonly last_modified: Date;

    /**
    * size of the blob in bytes
    */
    readonly size: number;

}
