// imports
import IBlobReaderContentResponse from "./blobReaderContentResponse";

// defines the configuration for 
interface IBlobReadeContentResponseParams {
    etag:string;
    lastModified:Date;
    githubRequestID: string;
    requestUrl:string;
    data:any;
}


// implements the IBlobReadeContentResponse
export default class BlobReaderContentResponse implements IBlobReaderContentResponse {

    // attributes
    private readonly params: IBlobReadeContentResponseParams;
    private readonly isDirectory: boolean;
    private readonly blobContent: string | null;

    // constructor
    constructor(params: IBlobReadeContentResponseParams) {
        // store the attribute
        this.params = {...params};
        // if we have received an array of objects as data then blob at given path is a `directory`
        // otherwise we have receieved a single object as data then blob at given path is a `file`
        this.isDirectory = (this.params.data instanceof Array);
        this.blobContent = (this.isDirectory ? null : this.params.data);
    }

    // retrieve the `etag` for the blob
    ETag(): string {
        return this.params.etag;
    }

    // retrieve the date time when the blob was last modified
    LastModified(): Date {
        return this.params.lastModified;
    }

    // retrieve the request id for the REST API
    GitHubRequestID(): string {
        return this.params.githubRequestID;
    }

    // retrieve the relative path for the blob
    RequestURL(): string {
        return this.params.requestUrl;
    }

    // returns true if the blob at given path is a directory
    IsDirectory(): boolean { 
        return this.isDirectory;
    }

    // retrieve the data for the blob
    Data(): string | null {
        return this.blobContent;
    }
}
