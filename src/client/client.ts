// imports
import IBlobReader from "../reader/blobReader";

// Defines the prototype for Client
export default interface IClient {
    // retrieve the name of the repository for which client is created
    RepositoryName(): string;

    // retriebe the name of the owner for which client is created
    OwnerName(): string;

    // retrieve a lazy reader for blob at given path (relative to repository)
    BlobReader(path: string): IBlobReader;
}
