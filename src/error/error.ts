// Defines a generic Error for the library
export default interface IGitHubCloudStorageError {

    // retrieve the status code
    StatusCode(): number;

    // the path accessed
    Path(): string

    // retieve the message
    Message(): string;
}
