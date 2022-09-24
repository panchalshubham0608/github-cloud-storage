// imports
import IBlobMetadata from '../common/blobMetadata';
import ICommit from '../common/commit';

/**
 * `IBlobWriter` defines the interface for a blob writer.  
 * The BlobWriter facilitates writing of blobs to a repository.  
 * The writer is lazy and does not write the blob content unless requested.
 * The writing of blobs is backed by the GitHub API.  
 * @see https://docs.github.com/en/rest/repos/contents#create-or-update-file-contents
 * @see https://docs.github.com/en/rest/repos/contents#delete-a-file
 */
export default interface IBlobWriter {


    /**
     * Delete the blob (type `file`) at given path
     * @param path: path of the blob to be deleted
     * @throws ErrKindUnprocessableEntity if the blob is a directory
     */
    Delete(path: string): Promise<ICommit>

    /**
    * Retrieve the name of the respository for which the blob writer is created
    */
    RepositoryName(): string

    /**
     * Write the content to blob at given path.  
     * If the file type blob already exist at given path then it will be overwritten.  
     * @param path: path of the blob
     * @param content: content to be written
     * @throws ErrKindUnprocessableEntity if there is an existing directory at given path
     */
    Write(path: string, content: string): Promise<[ICommit, IBlobMetadata]>

}
