// imports
import { GetContentResponse, GetMetadataResponse, ListBlobsResponse } from "./response";

/**
 * @type{BlobReader} defines the interface for a blob reader.
 * The BlobReader facilitates reading of blobs from a repository.
 * The reader is `lazy` and does not read the blob content unless requested.
 * The reading of blobs is backed by the GitHub API.
 * @see https://docs.github.com/en/rest/repos/contents#get-repository-content
 */
export default interface BlobReader {

    /**
     * Retrieve the metadata of the blob at given path.
     * The metadata is returned as a `Promise` that resolves to @type{GetMetadataResponse} object.
     * @param path - path of the file for which metadata is to be retrieved
     * @throws @type{ErrKindUnprocessableEntity} - if the path does not correspond to a `file`.
     * @returns Promise<@type{GetMetadataResponse}> - promise that resolves to @type{GetMetadataResponse}
     */
    GetMetadata(path: string): Promise<GetMetadataResponse>

    /**
     * Retrieve the content of the blob at given path.
     * The content is returned as a `Promise` that resolves to @type{GetContentResponse} object.
     * @param path - path of the file for which content is to be retrieved.
     * @throws @type{ErrKindUnprocessableEntity} - if the path does not correspond to a `file`.
     * @returns Promise<@type{GetContentResponse}> - promise that resolves to @type{GetContentResponse}
     */
     GetContent(path: string): Promise<GetContentResponse>

    /**
     * Retrieve the list of blob metadata for `directory` at given path.
     * The list is returned as a `Promise` that resolves to @type{ListBlobsResponse} object.
     * @param path - path of the directory for which the blobs are to be listed
     * @throws @type{ErrKindUnprocessableEntity} - if the path does not correspond to a `directory`.
     * @returns Promise<@type{ListBlobsResponse}> - promise that resolves to array of @type{ListBlobsResponse}
     */
    ListBlobs(path: string): Promise<ListBlobsResponse>


    /**
     * Retrieve the name of the respository for which the blob reader is created
     * @returns name of the repository
     */
    RepositoryName(): string

    /**
     * Retrieve the name of the owner of the repository for which the blob reader is created
     * @returns name of the owner of the repository
     */
    OwnerName(): string
}
