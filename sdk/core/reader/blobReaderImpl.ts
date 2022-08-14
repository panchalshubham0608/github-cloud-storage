// imports
import { Axios } from "axios";
import IBlobReader from "./blobReader";

// configuration to create a new `BlobReader`
interface IBlobReaderConfig {
    axiosClient: Axios;
    repository: string;
    path: string;
}

// implement `BlobReader`
class BlobReader implements IBlobReader {

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
}

// export the reader implementation
export default BlobReader;
