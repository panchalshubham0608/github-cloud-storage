
/**
 * @type{Commit} is the interface for the commits object.
 * @see https://docs.github.com/en/rest/repos/contents#create-or-update-file-contents
 * @see https://docs.github.com/en/rest/repos/contents#delete-a-file
 */
export default interface Commit {

    /**
     * the sha of the commit (commit id)
     * @see https://docs.github.com/en/rest/reference/repos#create-or-update-file-contents
     * @see https://docs.github.com/en/rest/reference/repos#delete-a-file
     * @readonly
     * @type {string}
     * @memberof Commit
     */
    readonly sha: string;

    /**
     * the node_id of the commit
     * @see https://docs.github.com/en/rest/reference/repos#create-or-update-file-contents
     * @see https://docs.github.com/en/rest/reference/repos#delete-a-file
     * @readonly
     * @type {string}
     * @memberof Commit
     */
    readonly node_id: string;

    /**
     * the url of the commit
     * @see https://docs.github.com/en/rest/reference/repos#create-or-update-file-contents
     * @see https://docs.github.com/en/rest/reference/repos#delete-a-file
     * @readonly
     * @type {string}
     * @memberof Commit
     */
    readonly url: string;

    /**
     * the html_url of the commit
     * @see https://docs.github.com/en/rest/reference/repos#create-or-update-file-contents
     * @see https://docs.github.com/en/rest/reference/repos#delete-a-file
     * @readonly
     * @type {string}
     * @memberof Commit
     */
    readonly html_url: string;

    /**
     * the author of the commit
     * @see https://docs.github.com/en/rest/reference/repos#create-or-update-file-contents
     * @see https://docs.github.com/en/rest/reference/repos#delete-a-file
     */
    author: {
        /**
         * the date of the commit
         * @readonly
         * @type {Date}
         * @memberof Commit.author
         */
        readonly date: Date;

        /**
         * the name of the author
         * @readonly
         * @type {string}
         * @memberof Commit.author
         */
        readonly name: string;

        /**
         * the email of the author
         * @readonly
         * @type {string}
         * @memberof Commit.author
         */
        readonly email: string;
    },

    /**
     * the committer of the commit
     * @see https://docs.github.com/en/rest/reference/repos#create-or-update-file-contents
     * @see https://docs.github.com/en/rest/reference/repos#delete-a-file
     * @memberof Commit
     */
    committer: {
        /**
         * the date of the commit
         * @readonly
         * @type {Date}
         * @memberof Commit.committer
         */
        readonly date: Date;

        /**
         * the name of the committer
         * @readonly
         * @type {string}
         * @memberof Commit.committer
         */
        readonly name: string;

        /**
         * the email of the committer
         * @readonly
         * @type {string}
         * @memberof Commit.committer
         */
        readonly email: string;
    },

    /**
     * the message of the commit
     * @see https://docs.github.com/en/rest/reference/repos#create-or-update-file-contents
     * @see https://docs.github.com/en/rest/reference/repos#delete-a-file
     * @readonly
     * @type {string}
     */
    readonly message: string;
}
