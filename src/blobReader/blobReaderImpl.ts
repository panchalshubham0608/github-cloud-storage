// imports
import { Axios } from "axios";
import GitHubRESTAPIAcceptType from "../util/acceptReponse";
import IBlobReader from "./blobReader";
import wrap from "../err/errorHandler";
import IBlobContent from "../common/blobContent";
import IBlobMetadata from "../common/blobMetadata";
import * as helpers from './helper';


/**
 * IBlobReaderParams defines the parameters for creating a new `BlobReader`.  
 * The BlobReader should not be created directly, instead use the `NewBlobReader` method of the `Client` class.
 * @hidden
 */
export interface IBlobReaderParams {
    /**
     * the axios instance to use for the HTTP requests
     */
    readonly axiosClient: Axios;

    /**
     * the repository from which the blob reading should be done
     */
    readonly repository: string;
}

/**
 * BlobReader implements the `IBlobReader` interface.  
 * BlobReader is a lazy reader that facilitates reading of blobs from a repository.  
 * The BlobReader should not be created directly, instead use the `NewBlobReader` method of the `Client` class.
 * @internal
 * @hidden
 */
export default class BlobReader implements IBlobReader {

    /**
     * reposirtory for which the blob reader is created
     */
    private repository: string;
    
    /**
     * axios client to be used for making requests
     */
    private axiosClient: Axios;

    /**
     * Creates an instance of BlobReader.
     * @param params - parameters for creating a new `BlobReader`
     * @param params.axiosClient - axios client to be used for making requests
     * @param params.repositoryName - name of the repository
     */
    constructor(params: IBlobReaderParams) {
        // initialize properties
        this.axiosClient = params.axiosClient;
        this.repository = params.repository;
    }

    /**
     * Retrieve the name of the respository for which the blob reader is created
     */
    RepositoryName(): string {
        return this.repository;
    }



    /**
     * Retrieve the metadata of the blob at given path.
     * @param path - path of the file for which metadata is to be retrieved
     * @throws ErrKindUnprocessableEntity if the blob at given path is not of type `file`
     */
     GetMetadata(path: string): Promise<IBlobMetadata> {
        return new Promise<IBlobMetadata>((resolve, reject) => {
            this.axiosClient.get(`/${path}`, {
                headers: {
                    'Accept': GitHubRESTAPIAcceptType.JSON
                }
            }).then(resp => {
                const [blobMetadata, err] = helpers.constructIBlobMetadata(resp);
                if (blobMetadata !== null) resolve(blobMetadata);
                else reject(err);
            }).catch(err => {
                const wrappedError = wrap(err);
                reject(wrappedError);
            });
        });
    }
    
    /**
     * Retrieve the content of the blob at given path.  
     * @param path - path of the file for which content is to be retrieved
     * @throws ErrKindUnprocessableEntity if the blob at given path is not of type `file`
     */
     GetContent(path: string): Promise<IBlobContent> {
        return new Promise<IBlobContent>((resolve, reject) => {
            this.axiosClient.get(`/${path}`, {
                headers: {
                    'Accept': GitHubRESTAPIAcceptType.RAW
                }
            }).then(resp => {
                const [blobContent, err] = helpers.constructIBlobContent(resp);
                if (blobContent != null) resolve(blobContent);
                else reject(err);
            }).catch(err => {
                const wrappedError = wrap(err);
                reject(wrappedError);
            });
        });
    }



    /**
     * Retrieve the list of blob metadata for directory at given path.
     * @param path - path of the directory for which the blobs are to be listed
     * @throws ErrKindUnprocessableEntity if the blob at given path is not of type `directory`
     */
    ListBlobs(path: string): Promise<Array<IBlobMetadata>> {
        return new Promise<Array<IBlobMetadata>>((resolve, reject) => {
            this.axiosClient.get(`/${path}`, {
                headers: {
                    'Accept': GitHubRESTAPIAcceptType.JSON
                }
            }).then(resp => {
                const [blobsMetadaList, err] = helpers.constructBlobsMetadataList(resp);
                if (blobsMetadaList !== null) resolve(blobsMetadaList);
                else reject(err);
            }).catch(err => {
                const wrappedError = wrap(err);
                reject(wrappedError);
            });
        });
    }
}

