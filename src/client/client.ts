// imports
import BlobReader from "../blobReader/blobReader";
// import BlobWriter from '../blobWriter/blobWriter';

/**
 * @type{Client} defines the interface for the GitHub Cloud Storage client.
 * The client is used to create a `lazy` blob reader and blob writer
 * that can be used to read and write blobs from a repository.
 */
export default interface Client {

    /**
     * Retrieve a `lazy` blob reader that implements @type{BlobReader} to facilitate reading of blobs.
     * The reading of blobs is backed by the GitHub API.
     * To know more about the GitHub API, refer to the following links:
     * @see https://docs.github.com/en/rest/repos/contents#get-repository-content
     * @returns BlobReader
     */
    NewBlobReader(): BlobReader;

    // /**
    //  * Retrieve a `lazy` blob writer that implements @type{BlobWriter} to facilitate writing of blobs.
    //  * The writing of blobs is backed by the GitHub API.
    //  * To know more about the GitHub API, refer to the following links:
    //  * @see https://docs.github.com/en/rest/repos/contents#create-or-update-file-contents
    //  * @see https://docs.github.com/en/rest/repos/contents#delete-a-file
    //  * @returns BlobWriter
    //  */
    // NewBlobWriter(): BlobWriter;

    /**
     * Retrieve the name of the owner for which the client is created
     * @returns name of the owner
     */
     OwnerName(): string;

     /**
     * Retrieve the name of the respository for which the client is created
     * @returns name of the repository
     */
     RepositoryName(): string;

}
