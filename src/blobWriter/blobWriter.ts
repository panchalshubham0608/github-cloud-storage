// imports
import BlobMetadata from '../common/blobMetadata';
import Commit from '../common/commit';

// `IBlobWriter` allows you to write/delete contents of a blob
export default interface IBlobWriter {

    /**
     * Retrieve the name of the respository for which the blob writer is created
     * @return string: name of the repository
     */
    RepositoryName(): string

    /**
     * Write the content to the blob (type `file`) at given path
     * If the file type blob already exist at given path then it will be overwritten
     * @param path: path of the blob
     * @param content: content to be written
     * @throws ErrKindUnprocessableEntity if there is an existing directory at given path
     * @return Promise<[Commit, BlobMetadata]> - metadata of the blob created & commit details
     */
    Write(path: string, content: string): Promise<[Commit, BlobMetadata]>

    /**
     * Delete the blob (type `file`) at given path
     * @param path: path of the blob to be deleted
     * @throws ErrKindUnprocessableEntity if the blob is a directory
     * @return Promise<Commit> - details of the commit
     */
    Delete(path: string): Promise<Commit>
}
