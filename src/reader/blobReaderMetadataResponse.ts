import IBlobMetadata from "./blobMetadata";

// defines the response of Metadata request for a blob
export default interface IBlobReaderMetadataResponse {
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

    // retrieve the blob metadata if the blob at given path is a `file` otherwise returns null
    BlobMetadata(): IBlobMetadata | null;

    // retrieve the list of blob metadata if the blob at given path is a `directory' otherwise returns null
    BlobMetadataList(): Array<IBlobMetadata> | null;
};
