// imports
import Client from "./client";
import ClientConfig from "./clientConfig";
import BlobReader from "../blobReader/blobReader";
import BlobReaderImpl from "../blobReader/blobReaderImpl";
// import BlobWriter from "../blobWriter/blobWriter";
// import BlobWriterImpl from '../blobWriter/blobWriterImpl';
import { Octokit } from "octokit";
import { ErrKindBadRequest } from "../err/errcodes";

/**
 * @type{ClientImpl} implements @type{Client} to provide a client for the GitHub Cloud Storage.
 * All the operations are backed by the GitHub API.
 * @see https://docs.github.com/en/rest/quickstart
 * @see https://docs.github.com/en/rest/repos/contents#about-repository-contents
 * @hidden
 * @internal
 */
export default class ClientImpl implements Client {

    /**
     * The name of the repository for which the client is created
     * @private
     * @hidden
     * @internal
     */
    private readonly repository: string;

    /**
     * The name of the owner for which the client is created
     * @private
     * @hidden
     * @internal
     */
    private readonly owner: string;

    /**
     * The octokit client to make requests to the GitHub API
     * @private
     * @hidden
     * @internal
     */
    private readonly octokit: Octokit;

    /**
     * create a new client for the given repository and owner
     * @param clientConfig - configuration for the client
     * @throws @type{ErrKindBadRequest} if the repository or owner is not provided
     * @hidden
     * @internal
     */
    constructor(clientConfig: ClientConfig) {
        // validate the repository
        if (!clientConfig.repository) {
            throw new ErrKindBadRequest({message: "repository is required"});
        }
        this.repository = clientConfig.repository;

        // validate the owner
        if (!clientConfig.owner) {
            throw new ErrKindBadRequest({message: "owner is required"});
        }
        this.owner = clientConfig.owner;

        // create new octokit client to make requests to the GitHub API
        let octokitOptions : any = {
            auth: clientConfig.token,
        };
        if (typeof clientConfig.retry !== 'undefined' && !clientConfig.retry) {
            octokitOptions = {
                ...octokitOptions,
                retry: {
                    enabled: false,
                },
            }
        }
        this.octokit = new Octokit(octokitOptions);
    }

    /**
     * Retrieve the name of the owner for which the client is created
     * @return string: name of the owner of the repository
     * @hidden
     * @internal
     */
    OwnerName(): string {
        // return the name of the owner this client is created for
        return this.owner
    }

     /**
     * Retrieve the name of the respository for which the client is created
     * @return string: name of the repository
     * @hidden
     * @internal
     */
    RepositoryName(): string {
        // return the name of the repository this client is created for
        return this.repository;
    }

    /**
     * Retrieve a `lazy` blob reader that implements @type{BlobReader} to facilitate reading of blobs.
     * The reading of blobs is backed by the GitHub API.
     * @see https://docs.github.com/en/rest/repos/contents#get-repository-content
     */
    NewBlobReader(): BlobReader {
        return new BlobReaderImpl({
            owner: this.owner,
            octokit: this.octokit,
            repository: this.repository,
        })
    }

    // /**
    //  * Retrieve a `lazy` blob writer that implements @type{BlobWriter} to facilitate writing of blobs.
    //  * The writing of blobs is backed by the GitHub API.
    //  * @see https://docs.github.com/en/rest/repos/contents#create-or-update-file-contents
    //  * @see https://docs.github.com/en/rest/repos/contents#delete-a-file
    //  */
    // NewBlobWriter(): BlobWriter {
    //     return new BlobWriterImpl({
    //         owner: this.owner,
    //         octokit: this.octokit,
    //         repository: this.repository,
    //     })
    // }

}
