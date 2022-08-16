// imports
import { Axios } from "axios";
import GitHubRESTAPIAcceptType from "../acceptReponse";
import IBlobReader from "./blobReader";
import parseResponseError from "../error/errorHandler";
import IBlobReaderContentResponse from "./blobReaderContentResponse";
import BlobReaderContentResponse from "./blobReaderContentResponseImpl";
import IBlobReaderMetadataResponse from "./blobReaderMetadataResponse";
import BlobReaderMetadataResponse from "./blobReaderMetadataResponseImpl";

// configuration to create a new `BlobReader`
export interface IBlobReaderParams {
    axiosClient: Axios;
    repository: string;
    path: string;
}

// implement `BlobReader`
export default class BlobReader implements IBlobReader {

    // parivate properties
    private repository: string;
    private path: string;
    private axiosClient: Axios;

    // constructor
    constructor(params: IBlobReaderParams) {
        // initialize properties
        this.axiosClient = params.axiosClient;
        this.repository = params.repository;
        this.path = params.path;
    }

    // retrieve the name of the repository under which blob lies
    RepositoryName(): string {
        return this.repository;
    }

    // retrieve the path of the blob relative to the repository
    Path(): string {
        return this.path;        
    }

    // retrieve the content of the blob at given path
    GetContent(): Promise<IBlobReaderContentResponse> {
        return new Promise<IBlobReaderContentResponse>((resolve, reject) => {
            this.axiosClient.get(`/${this.path}`, {
                headers: {
                    'Accept': GitHubRESTAPIAcceptType.RAW
                }
            }).then(resp => {
                const readResponse: IBlobReaderContentResponse = new BlobReaderContentResponse({
                    etag: resp.headers['etag'].replace(/"/g, ''),
                    lastModified: new Date(resp.headers['last-modified']),
                    githubRequestID: resp.headers['x-github-request-id'],
                    requestUrl: resp.request.path,
                    data: resp.data
                });
                resolve(readResponse);
            }).catch(err => {
                const wrappedError = parseResponseError(err);
                reject(wrappedError);
            });
        });
    }

    // retrieve the metadata of the blob
    GetMetadata(): Promise<IBlobReaderMetadataResponse> {
        return new Promise<IBlobReaderMetadataResponse>((resolve, reject) => {
            this.axiosClient.get(`/${this.path}`, {
                headers: {
                    'Accept': GitHubRESTAPIAcceptType.JSON
                }
            }).then(resp => {
                const wrappedResponse = new BlobReaderMetadataResponse({
                    etag: resp.headers['etag'].replace(/"/g, ''),
                    lastModified: new Date(resp.headers['last-modified']),
                    githubRequestID: resp.headers['x-github-request-id'],
                    requestUrl: resp.request.path,
                    data: resp.data
                });
                resolve(wrappedResponse);
            }).catch(err => {
                const wrappedError = parseResponseError(err);
                reject(wrappedError);
            });
        });
    }
}

