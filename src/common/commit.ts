
/**
 * ICommit is the interface for the commits object.  
 * @see https://docs.github.com/en/rest/repos/contents#create-or-update-file-contents  
 * @see https://docs.github.com/en/rest/repos/contents#delete-a-file
 */
export default interface ICommit {

    /**
     * the sha of the commit (commit id)
     */
    sha: string;

    /**
     * the node_id of the commit
     */
    node_id: string;
    
    /**
     * the url of the commit
     */
    url: string;

    /**
     * the html_url of the commit
     */
    html_url: string;

    /**
     * the author of the commit
     */
    author: {        
        date: Date;
        name: string;
        email: string;
    },

    /**
     * the committer of the commit
     */
    committer: {
        date: Date;
        name: string;
        email: string;
    },

    /**
     * the message of the commit
     */
    message: string;    
}