// imports
import IBlobReaderReadResponse from "./blobReaderReadResponse";

// defines the configuration for 
interface IBlobReaderReadResponseConfig {
    readonly etag:string;
    readonly contentLength:number;
    readonly contentType:string;
    readonly lastModified:Date;
    readonly githubRequestID: string;
    readonly requestURL:string;
    readonly data:string;
}


// implements the IBlobReaderReadResponse
export default class BlobReaderReadResponse implements IBlobReaderReadResponse {

    // attributes
    private readonly blobReaderReadResponseConfig: IBlobReaderReadResponseConfig;

    // constructor
    constructor(blobReaderReadResponseConfig: IBlobReaderReadResponseConfig) {
        // store the attribute
        this.blobReaderReadResponseConfig = {...blobReaderReadResponseConfig};
    }

    // retrieve the `etag` for the blob
    ETag(): string {
        return this.blobReaderReadResponseConfig.etag;
    }

    // retrieve the `Content-Length` for the blob
    ContentLength(): number {
        return this.blobReaderReadResponseConfig.contentLength;
    }

    // retrieve the `Content-Type` for the blob
    ContentType(): string {
        return this.blobReaderReadResponseConfig.contentType;
    }

    // retrieve the date time when the blob was last modified
    LastModified(): Date {
        return this.blobReaderReadResponseConfig.lastModified;
    }

    // retrieve the request id for the REST API
    GitHubRequestID(): string {
        return this.blobReaderReadResponseConfig.githubRequestID;
    }

    // retrieve the relative path for the blob
    RequestURL(): string {
        return this.blobReaderReadResponseConfig.requestURL;
    }

    // retrieve the data for the blob
    Data(): string {
        return this.blobReaderReadResponseConfig.data;
    }
}
