// imports
import { Axios } from "axios";
import GitHubRESTAPIAcceptType from "../util/acceptReponse";
import IBlobReader from "./blobReader";
import wrap from "../err/errorHandler";
import BlobContent from "./blobContent";
import BlobMetadata from "./blobMetadata";
import * as helpers from './helper';

// configuration to create a new `BlobReader`
export interface IBlobReaderParams {
    axiosClient: Axios;
    repository: string;
}

// implement `BlobReader`
export default class BlobReader implements IBlobReader {

    // parivate properties
    private repository: string;
    private axiosClient: Axios;

    // constructor
    constructor(params: IBlobReaderParams) {
        // initialize properties
        this.axiosClient = params.axiosClient;
        this.repository = params.repository;
    }

    /**
     * Retrieve the name of the respository for which the blob reader is created
     * @return string: name of the repository
     */
    RepositoryName(): string {
        return this.repository;
    }



    /**
     * Retrieve the metadata of the blob for which the blob reader is created
     * @param path - path of the file for which metadata is to be retrieved
     * @throws ErrKindMethodNotAllowed if the blob at given path is not of type `file`
     * @return BlobMetadata - the metadata of the blob
     */
     GetMetadata(path: string): Promise<BlobMetadata> {
        return new Promise<BlobMetadata>((resolve, reject) => {
            this.axiosClient.get(`/${path}`, {
                headers: {
                    'Accept': GitHubRESTAPIAcceptType.JSON
                }
            }).then(resp => {
                let [blobMetadata, err] = helpers.constructBlobMetadata(resp);
                if (blobMetadata !== null) resolve(blobMetadata);
                else reject(err);
            }).catch(err => {
                const wrappedError = wrap(err);
                reject(wrappedError);
            });
        });
    }
    
    /**
     * Retrieve the content of the blob for which the blob reader is created
     * @param path - path of the file for which content is to be retrieved
     * @throws ErrKindMethodNotAllowed if the blob at given path is not of type `file`
     * @return BlobMetadata - the metadata of the blob
     */
     GetContent(path: string): Promise<BlobContent> {
        return new Promise<BlobContent>((resolve, reject) => {
            this.axiosClient.get(`/${path}`, {
                headers: {
                    'Accept': GitHubRESTAPIAcceptType.RAW
                }
            }).then(resp => {
                let [blobContent, err] = helpers.constructBlobContent(resp);
                if (blobContent != null) resolve(blobContent);
                else reject(err);
            }).catch(err => {
                const wrappedError = wrap(err);
                reject(wrappedError);
            });
        });
    }



    /**
     * Retrieve the list of blob metadata for which the blob reader is created
     * @param path - path of the directory for which the blobs are to be listed
     * @throws ErrKindMethodNotAllowed if the blob at given path is not of type `directory`
     * @return Array<BlobMetadata> - list of metadata of blobs under given directory
     */
    ListBlobs(path: string): Promise<Array<BlobMetadata>> {
        return new Promise<Array<BlobMetadata>>((resolve, reject) => {
            this.axiosClient.get(`/${path}`, {
                headers: {
                    'Accept': GitHubRESTAPIAcceptType.JSON
                }
            }).then(resp => {
                let [blobsMetadaList, err] = helpers.constructBlobsMetadataList(resp);
                if (blobsMetadaList !== null) resolve(blobsMetadaList);
                else reject(err);
            }).catch(err => {
                const wrappedError = wrap(err);
                reject(wrappedError);
            });
        });
    }
}

