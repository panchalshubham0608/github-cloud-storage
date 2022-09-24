// imports
import axios, { Axios } from "axios";
import IClient from "./client";
import IClientConfig from "./clientConfig";
import IBlobReader from "../blobReader/blobReader";
import BlobReader from "../blobReader/blobReaderImpl";
import IBlobWriter from "../blobWriter/blobWriter";
import BlobWriter from '../blobWriter/blobWriterImpl';

/**
 * Client implements IClient to provide a client for the GitHub Cloud Storage.  
 * All the operations are backed by the GitHub API.  
 * https://docs.github.com/en/rest/quickstart
 */
export default class Client implements IClient {

    /**
     * The name of the repository for which the client is created
     * @private
     * @hidden
     */
    private readonly repository: string;

    /**
     * The name of the owner for which the client is created
     * @private
     * @hidden
     */
    private readonly owner: string;

    /**
     * The axios client to be used for the requests
     * @private
     * @hidden
     */
    private readonly axiosClient: Axios

    // constructor for the client
    constructor(clientConfig: IClientConfig) {
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
     * Retrieve a `lazy` blob reader that implements IBlobReader to facilitate reading of blobs.  
     * The reading of blobs is backed by the GitHub API.  
     * https://docs.github.com/en/rest/repos/contents#get-repository-content
     */
    NewBlobReader(): IBlobReader {
        return new BlobReader({
            axiosClient: this.axiosClient,
            repository: this.repository,
        })
    }

    /**
     * Retrieve a `lazy` blob writer that implements IBlobWriter to facilitate writing of blobs.  
     * The writing of blobs is backed by the GitHub API.  
     * https://docs.github.com/en/rest/repos/contents#create-or-update-file-contents  
     * https://docs.github.com/en/rest/repos/contents#delete-a-file  
     */
    NewBlobWriter(): IBlobWriter {
        return new BlobWriter({
            axiosClient: this.axiosClient,
            repository: this.repository,
        })
    }

    /**
     * Retrieve the name of the owner for which the client is created
     */
     OwnerName(): string {
        // return the name of the owner this client is created for
        return this.owner
    }

     /**
     * Retrieve the name of the respository for which the client is created
     */
      RepositoryName(): string {
        // return the name of the repository this client is created for
        return this.repository;
    }

}
