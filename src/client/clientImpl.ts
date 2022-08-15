// imports
import axios, { Axios} from "axios";
import IClient from "./client";
import IClientConfig from "./clientConfig";
import IBlobReader from "../reader/blobReader";
import BlobReader from "../reader/blobReaderImpl";

// implementation for Client
export default class Client implements IClient {

    // declare propeties
    private readonly repository: string;
    private readonly owner: string;
    private readonly axiosClient: Axios

    // constructor for the client
    constructor(clientConfig: IClientConfig) {
        // initialize the properties
        this.repository = clientConfig.repository;
        this.owner = clientConfig.owner;
        // create new `axios` client to make requests
        axios.defaults
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

    // retrieve the name of the repository for which client is created
    RepositoryName(): string {
        // return the name of the repository this client is created for
        return this.repository;
    }

    // retrieve the name of the owner for which client is created
    OwnerName(): string {
        // return the name of the owner this client is created for
        return this.owner
    }

    // retrieve a lazy reader for blob at given path (relative to repository)
    BlobReader(path: string): IBlobReader {
        return new BlobReader({
            axiosClient: this.axiosClient, 
            repository: this.repository,
            path: path
        })
    }

}
