// imports
import IBlobReader from "../reader/blobReader";

// Defines the prototype for Client
export default interface IClient {
    // retrieve the name of the repository for which client is created
    RepositoryName(): string;

    // retrieve a lazy reader for blob at given path (relative to repository)
    Reader(path: string): IBlobReader;
}
