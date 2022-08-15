// imports
import IBlobMetadata from "./blobMetadata";
import IBlobReaderMetadataResponse from "./blobReaderMetadataResponse";
import BlobMetadata from "./blobMetadataImpl";

// defines the parameters that `BlobReaderMetadataResponse` expects
interface IBlobReaderMetadataResponseParams {
    etag:string;
    lastModified: Date;
    githubRequestID: string;
    requestUrl: string;
    data: any;
}

// implements `IBlobReaderMetadataResponse`
export default class BlobReaderMetadataResponse implements IBlobReaderMetadataResponse {
    // stores the parameters
    private readonly params: IBlobReaderMetadataResponseParams;
    private readonly isDirectory: boolean;
    private readonly blobMetadata: IBlobMetadata | null;
    private readonly blobMetadataList: Array<IBlobMetadata> | null;

    // constructor
    constructor(params: IBlobReaderMetadataResponseParams) {
        // store the parameters
        this.params = params;
        this.blobMetadata = null;
        this.blobMetadataList = null;
        // if we have received an array of objects as data then blob at given path is a `directory`
        // otherwise we have receieved a single object as data then blob at given path is a `file`
        this.isDirectory = (this.params.data instanceof Array);
        // check the type of data
        if (this.isDirectory) {
            // iterate through the array
            this.blobMetadataList = [];
            for (let obj of this.params.data) {
                this.blobMetadataList.push(this.responseDataToBlobMetadata(obj));
            }
        } else {
            // create a new metadata instance out of the data
            this.blobMetadata = this.responseDataToBlobMetadata(this.params.data);
        }
    }


    // constructs a new metadata object from raw response object
    private responseDataToBlobMetadata(obj: any): IBlobMetadata {
        return new BlobMetadata({
            name: obj.name,
            path: obj.path,
            sha: obj.sha,
            size: obj.size,
            url: obj.url,
            html_url: obj.html_url,
            git_url: obj.git_url,
        });
    }

    // retrieve the etag for the blob
    ETag(): string { return this.params.etag; }

    // retrieve the last-modified attribute for the blob
    LastModified(): Date { return new Date(this.params.lastModified); }

    // retrieve the GitHub Request ID
    GitHubRequestID(): string { return this.params.githubRequestID; }

    // retrieve the url of the blob
    RequestURL(): string { return this.params.requestUrl; }

    // returns true if the blob at given path is a directory
    IsDirectory(): boolean { return this.isDirectory; }

    // retrieve the blob metadata if the blob at given path is a `file` otherwise returns null
    BlobMetadata(): IBlobMetadata | null { return this.blobMetadata; }

    // retrieve the list of blob metadata if the blob at given path is a `directory' otherwise returns null
    BlobMetadataList(): Array<IBlobMetadata> | null { return this.isDirectory ? Object.assign([], this.blobMetadataList) : null; }    
};
