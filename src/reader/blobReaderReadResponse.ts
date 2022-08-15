// `IBlobReaderReadResponse` defines the properties of the read response
export default interface IBlobReaderReadResponse {
    // retrieve the `etag` for the blob
    ETag(): string;

    // retrieve the date time when the blob was last modified
    LastModified(): Date;

    // retrieve the request id for the REST API
    GitHubRequestID(): string;

    // retrieve the request url
    RequestURL(): string;
}