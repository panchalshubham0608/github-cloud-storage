// imports
import BlobMetadata from "../common/blobMetadata"
import BlobContent from "./blobContent"

// `IBlobReader` allows you to read contents of a blob
export default interface IBlobReader {

    /**
     * Retrieve the name of the respository for which the blob reader is created
     * @return string: name of the repository
     */
    RepositoryName(): string

    /**
     * Retrieve the metadata of the blob for which the blob reader is created
     * @param path - path of the file for which metadata is to be retrieved
     * @throws ErrKindUnprocessableEntity if the blob at given path is not of type `file`
     * @return BlobMetadata - the metadata of the blob
     */
    GetMetadata(path: string): Promise<BlobMetadata>

    /**
     * Retrieve the content of the blob for which the blob reader is created
     * @param path - path of the file for which content is to be retrieved
     * @throws ErrKindUnprocessableEntity if the blob at given path is not of type `file`
     * @return BlobMetadata - the metadata of the blob
     */
    GetContent(path: string): Promise<BlobContent>

    /**
     * Retrieve the list of blob metadata for which the blob reader is created
     * @param path - path of the directory for which the blobs are to be listed
     * @throws ErrKindUnprocessableEntity if the blob at given path is not of type `directory`
     * @return Array<BlobMetadata> - list of metadata of blobs under given directory
     */
    ListBlobs(path: string): Promise<Array<BlobMetadata>>
}
