// imports
import IBlobReader from "../blobReader/blobReader";

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
     * @return string: BlobReader
     */
    NewBlobReader(): IBlobReader;
}
