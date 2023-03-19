// imports
import IBlobMetadata from '../types/blobMetadata';
import ICommit from '../types/commit';

/**
 * @type{IBlobWriter} defines the interface for a blob writer.
 * This facilitates writing of blobs to a repository.
 * The writer is `lazy` and does not write the blob content unless requested.
 * The writing of blobs is backed by the GitHub API.
 * @see https://docs.github.com/en/rest/repos/contents#create-or-update-file-contents
 * @see https://docs.github.com/en/rest/repos/contents#delete-a-file
 */
export default interface IBlobWriter {

    /**
     * Delete the blob (type `file`) at given path
     * @param path: path of the blob to be deleted
     * @throws @type{ErrKindUnprocessableEntity} if the blob is a `directory`
     * @return Promise<@type{ICommit}> - promise of @type{ICommit} object containing details of the commit
     */
    Delete(path: string): Promise<ICommit>

    /**
    * Retrieve the name of the respository for which the blob writer is created
    * @return string: name of the repository
    */
    RepositoryName(): string

    /**
     * Retrieve the name of the owner of the repository for which the blob writer is created
     * @return string: name of the owner of the repository
     */
    OwnerName(): string

    /**
     * Write the content to blob at given path.
     * If the `file` type blob already exist at given path then it will be overwritten.
     * @param path: path of the blob
     * @param content: content to be written
     * @throws @type{ErrKindUnprocessableEntity} if there is an existing `directory` at given path
     * @return Promise<[@type{ICommit}, @type{IBlobMetadata}]> - promise of @type{ICommit} object containing details of the commit and @type{IBlobMetadata} object containing details of the blob
     */
    Write(path: string, content: string): Promise<[ICommit, IBlobMetadata]>

}
