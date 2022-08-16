// `IBlobReadeContentResponse` defines the properties of the read response
export default interface IBlobReaderContentResponse {
    // retrieve the etag for the blob
    ETag(): string;

    // retrieve the last-modified attribute for the blob
    LastModified(): Date;

    // retrieve the GitHub Request ID
    GitHubRequestID(): string;

    // retrieve the url of the blob
    RequestURL(): string;

    // returns true if the blob at given path is a directory
    IsDirectory(): boolean;

    // returns the blob data if the blob at given path is a `file` otherwise returns null
    Data(): string | null;
}
