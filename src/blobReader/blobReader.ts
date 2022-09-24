// imports
import IBlobMetadata from "../common/blobMetadata"
import IBlobContent from "../common/blobContent"


/**
 * `IBlobReader` defines the interface for a blob reader.  
 * The BlobReader facilitates reading of blobs from a repository.  
 * The reader is lazy and does not read the blob content unless requested.  
 * The reading of blobs is backed by the GitHub API.  
 * https://docs.github.com/en/rest/repos/contents#get-repository-content
 */
export default interface IBlobReader {

    /**
     * Retrieve the content of the blob at given path.  
     * The content is returned as a `Promise` that resolves to `IBlobContent` object.  
     * @param path - path of the file for which content is to be retrieved.  
     * @throws ErrKindUnprocessableEntity - if the path does not correspond to a `file`.
     */
     GetContent(path: string): Promise<IBlobContent>
     
    /**
     * Retrieve the metadata of the blob at given path.
     * @param path - path of the file for which metadata is to be retrieved
     * @throws ErrKindUnprocessableEntity - if the path does not correspond to a `file`.
     */
    GetMetadata(path: string): Promise<IBlobMetadata>


    /**
     * Retrieve the list of blob metadata for directory at given path.
     * @param path - path of the directory for which the blobs are to be listed
     * @throws ErrKindUnprocessableEntity - if the path does not correspond to a `directory`.
     */
    ListBlobs(path: string): Promise<Array<IBlobMetadata>>


    /**
     * Retrieve the name of the respository for which the blob reader is created
     */
     RepositoryName(): string
}
