// Describes the metadata of a blob
export default interface BlobMetadata {
    // name of the blob
    readonly name: string;
    // path of the blob relative to the repository
    readonly path: string;
    // sha of the blob
    readonly sha: string;
    // size of the blob
    readonly size: number;
    // url of the blob
    readonly url: string;
    // html_url of the blob
    readonly html_url: string;
    // git_url of the blob
    readonly git_url: string;
    // download_url of the blob
    readonly download_url: string;
    // type of the blob (`file` or `dir`)
    readonly blob_type: string;
    // etag of the blob
    readonly etag : string | null;
    // date the blob was last modified
    readonly last_modified: Date | null;
}
