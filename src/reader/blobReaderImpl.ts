// imports
import { Axios } from "axios";
import GitHubRESTAPIAcceptType from "../acceptReponse";
import IBlobReader from "./blobReader";
import parseResponseError from "../error/errorHandler";
import IGitHubCloudStorageError from "../error/error";

// configuration to create a new `BlobReader`
export interface IBlobReaderConfig {
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
    constructor(blobReaderConfig: IBlobReaderConfig) {
        // initialize properties
        this.axiosClient = blobReaderConfig.axiosClient;
        this.repository = blobReaderConfig.repository;
        this.path = blobReaderConfig.path;
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
    Read(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.axiosClient.get(`/${this.path}`, {
                headers: {
                    'Accept': GitHubRESTAPIAcceptType.RAW
                }
            }).then(resp => {
                console.log(resp);
                resolve('');
            }).catch(err => {                
                let errResponse: IGitHubCloudStorageError | null = parseResponseError(err);
                if (errResponse !== null)   return reject(errResponse);
                reject(err);
            });
        });
    }
}
