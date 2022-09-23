// Defines the content of the blob
export default interface BlobContent {
    // size of the blob
    readonly size: number;
    // body of the blob
    readonly body: string;
    // etag of the blob
    readonly etag: string;
    // date the blob was last modified
    readonly last_modified: Date;
}
