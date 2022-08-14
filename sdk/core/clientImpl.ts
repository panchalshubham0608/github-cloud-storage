// imports
import axios, { Axios} from "axios";
import IClient from "./client";
import IClientConfig from "./clientConfig";
import IBlobReader from "./reader/blobReader";
import BlobReader from "./reader/blobReaderImpl";

// implementation for Client
class Client implements IClient {

    // declare propeties
    private readonly repository: string;
    private readonly axiosClient: Axios

    // constructor for the client
    constructor(clientConfig: IClientConfig) {
        // initialize the properties
        this.repository = clientConfig.repository;
        // create new `axios` client to make requests
        axios.defaults
        this.axiosClient = axios.create({
            // common and required properties for all objects
            baseURL: `https://api.github.com`,
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

    // retrieve a lazy reader for blob at given path (relative to repository)
    Reader(path: string): IBlobReader {
        return new BlobReader({
            axiosClient: this.axiosClient, 
            repository: this.repository,
            path: path
        })
    }

}

// export the client implementation
export default Client;
