// imports
import IBlobReader from "../blobReader/blobReader";
import IBlobWriter from '../blobWriter/blobWriter';

/**
 * IClient defines the interface for the GitHub Cloud Storage client.
 */
export default interface IClient {


    /**
     * Retrieve a `lazy` blob reader that implements IBlobReader to facilitate reading of blobs.  
     * The reading of blobs is backed by the GitHub API.  
     * https://docs.github.com/en/rest/repos/contents#get-repository-content
     */
     NewBlobReader(): IBlobReader;

    /**
     * Retrieve a `lazy` blob writer that implements IBlobWriter to facilitate writing of blobs.  
     * The writing of blobs is backed by the GitHub API.  
     * https://docs.github.com/en/rest/repos/contents#create-or-update-file-contents  
     * https://docs.github.com/en/rest/repos/contents#delete-a-file  
     */
    NewBlobWriter(): IBlobWriter;

    /**
     * Retrieve the name of the owner for which the client is created
     */
     OwnerName(): string;

     /**
     * Retrieve the name of the respository for which the client is created
     */
     RepositoryName(): string;

}
