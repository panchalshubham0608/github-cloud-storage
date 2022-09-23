// imports
import { Axios } from "axios";
import IBlobWriter from './blobWriter';
import BlobMetadata from '../common/blobMetadata';
import CommitDetails from '../common/commitDetails';


// configuration to create a new `BlobReader`
export interface IBlobReaderParams {
    axiosClient: Axios;
    repository: string;
}

// Implement `IBlobWriter`
export default class BlobWriter implements IBlobWriter {

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
     * Retrieve the name of the respository for which the blob writer is created
     * @return string: name of the repository
     */
    RepositoryName(): string { 
        return this.repository;
    }

    /**
     * Write the content to the blob (type `file`) at given path
     * If the file type blob already exist at given path then it will be overwritten
     * @param path: path of the blob
     * @param content: content to be written
     * @throws ErrKindMethodNotAllowed if there is an existing directory at given path
     * @return Promise<[CommitDetails, BlobMetadata]> - metadata of the blob created & commit details
     */
    Write(path: string, content: string): Promise<[CommitDetails, BlobMetadata]> {
        return new Promise<[CommitDetails, BlobMetadata]>((resolve, reject) => {

        });
    }

    /**
     * Delete the blob (type `file`) at given path
     * @param path: path of the blob to be deleted
     * @throws ErrKindMethodNotAllowed if the blob is a directory
     * @return Promise<CommitDetails> - details of the commit
     */
    Delete(path: string): Promise<CommitDetails> {
        return new Promise<CommitDetails>((resolve, reject) => {

        });
    }
}