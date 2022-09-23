// imports
import IBlobReader from "../blobReader/blobReader";
import IBlobWriter from '../blobWriter/blobWriter';

// Defines the prototype for Client
export default interface IClient {

    /**
     * Retrieve the name of the respository for which the client is created
     * @return string: name of the repository
     */
     RepositoryName(): string;

    /**
     * Retrieve the name of the owner for which the client is created
     * @return string: name of the owner of the repository
     */
     OwnerName(): string;

    /**
     * Retrieve an instance of BlobReader to facilitate reading of blobs
     * https://docs.github.com/en/rest/repos/contents#get-repository-content
     * @return BlobReader
     */
    NewBlobReader(): IBlobReader;

    /**
     * Retrieve an instance of BlobWriter to facilitate writing of blobs
     * https://docs.github.com/en/rest/repos/contents#create-or-update-file-contents
     * https://docs.github.com/en/rest/repos/contents#delete-a-file
     * @return BlobWriter
     */
    NewBlobWriter(): IBlobWriter;
}
