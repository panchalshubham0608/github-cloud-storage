// imports
import axios, { Axios } from "axios";
import IClient from "./client";
import ClientConfig from "./clientConfig";
import IBlobReader from "../blobReader/blobReader";
import BlobReader from "../blobReader/blobReaderImpl";
import IBlobWriter from "../blobWriter/blobWriter";
import BlobWriter from '../blobWriter/blobWriterImpl';

// implementation for Client
export default class Client implements IClient {

    // declare propeties
    private readonly repository: string;
    private readonly owner: string;
    private readonly axiosClient: Axios

    // constructor for the client
    constructor(clientConfig: ClientConfig) {
        // initialize the properties
        this.repository = clientConfig.repository;
        this.owner = clientConfig.owner;
        // create new `axios` client to make requests
        this.axiosClient = axios.create({
            // common and required properties for all objects
            baseURL: `https://api.github.com/repos/${this.owner}/${this.repository}/contents`,
            headers: {
                'Authorization': `token ${clientConfig.token}`,
            },
            // optional configuration properties
            timeout: clientConfig.timeout,
            timeoutErrorMessage: clientConfig.timeoutErrorMessage
        })
    }

    /**
     * Retrieve the name of the respository for which the client is created
     * @return string: name of the repository
     */
    RepositoryName(): string {
        // return the name of the repository this client is created for
        return this.repository;
    }

    /**
     * Retrieve the name of the owner for which the client is created
     * @return string: name of the owner of the repository
     */
    OwnerName(): string {
        // return the name of the owner this client is created for
        return this.owner
    }

    /**
     * Retrieve an instance of BlobReader to facilitate reading of blobs
     * @return string: BlobReader
     */
    NewBlobReader(): IBlobReader {
        return new BlobReader({
            axiosClient: this.axiosClient,
            repository: this.repository,
        })
    }

    /**
     * Retrieve an instance of BlobWriter to facilitate writing of blobs
     * https://docs.github.com/en/rest/repos/contents#create-or-update-file-contents
     * https://docs.github.com/en/rest/repos/contents#delete-a-file
     * @return BlobWriter
     */
    NewBlobWriter(): IBlobWriter {
        return new BlobWriter({
            axiosClient: this.axiosClient,
            repository: this.repository,
        })
    }

}
