/**
 * IBlobMetadata defines the interface for the response of the `GetMetadata` and `ListBlobs` methods of the `IBlobReader` interface.  
 * @see https://docs.github.com/en/rest/reference/repos#get-repository-content
 */
export default interface IBlobMetadata {

    /**
     * the name of the blob
     */
    readonly name: string;

    /**
     * the path of the blob
     */
    readonly path: string;


    /**
     * the sha of the blob
     */
    readonly sha: string;

    /**
     * the size of the blob in bytes
     */
    readonly size: number;

    /**
     * the url of the blob
     */
    readonly url: string;

    /**
     * the html_url of the blob
     */
    readonly html_url: string;

    /**
     * the git_url of the blob
     */
    readonly git_url: string;

    /**
     * the download_url of the blob
     */
    readonly download_url: string;

    /**
     * the type of the blob (file or dir)
     */
    readonly blob_type: string;

    /**
     * the etag of the blob
     */
    readonly etag : string | null;

    /**
     * the date of last modification of the blob
     */
    readonly last_modified: Date | null;
}
