/**
 * @type{BlobMetadata} defines the interface for the response of the `GetMetadata` and `ListBlobs` methods of the @type{BlobReader} interface.
 * @see https://docs.github.com/en/rest/reference/repos#get-repository-content
 */
export default interface BlobMetadata {

    /**
     * the name of the blob
     * @see https://docs.github.com/en/rest/reference/repos#get-repository-content
     * @readonly
     * @type {string}
     * @memberof BlobMetadata
     */
    readonly name: string;

    /**
     * the path of the blob
     * @see https://docs.github.com/en/rest/reference/repos#get-repository-content
     * @readonly
     * @type {string}
     * @memberof BlobMetadata
     */
    readonly path: string;

    /**
     * the sha of the blob
     * @see https://docs.github.com/en/rest/reference/repos#get-repository-content
     * @readonly
     * @type {string}
     * @memberof BlobMetadata
     */
    readonly sha: string;

    /**
     * the size of the blob in bytes
     * @see https://docs.github.com/en/rest/reference/repos#get-repository-content
     * @readonly
     * @type {number}
     * @memberof BlobMetadata
     */
    readonly size: number;

    /**
     * the url of the blob
     * @see https://docs.github.com/en/rest/reference/repos#get-repository-content
     * @readonly
     * @type {string}
     * @memberof BlobMetadata
     */
    readonly url: string;

    /**
     * the html url of the blob
     * @see https://docs.github.com/en/rest/reference/repos#get-repository-content
     * @readonly
     * @type {string}
     * @memberof BlobMetadata
     */
    readonly html_url: string;

    /**
     * the git url of the blob
     * @see https://docs.github.com/en/rest/reference/repos#get-repository-content
     * @readonly
     * @type {string}
     * @memberof BlobMetadata
     */
    readonly git_url: string;

    /**
     * the download url of the blob
     * @see https://docs.github.com/en/rest/reference/repos#get-repository-content
     * @readonly
     * @type {string}
     * @memberof BlobMetadata
     */
    readonly download_url: string;

    /**
     * the type of the blob - `file` or `dir`
     * @see https://docs.github.com/en/rest/reference/repos#get-repository-content
     * @readonly
     * @type {string}
     * @memberof BlobMetadata
     */
    readonly type: string;

    /**
     * the link to the api of the blob
     * @see https://docs.github.com/en/rest/reference/repos#get-repository-content
     * @readonly
     * @type {string | null}
     * @memberof BlobMetadata
     */
    readonly etag: string | null;

    /**
     * the date of the last modification of the blob
     * @see https://docs.github.com/en/rest/reference/repos#get-repository-content
     * @readonly
     * @type {Date | null}
     * @memberof BlobMetadata
     */
    readonly last_modified: Date | null;

}
