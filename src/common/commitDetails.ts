// Represents the details of a commit
export default interface CommitDetails {
    // the sha of the commit
    sha: string;
    // the node_id of the commit
    node_id: string;
    // the url of the commit
    url: string;
    // the html_url of the commit
    html_url: string;
    // the author of the file
    author: {
        date: Date;
        name: string;
        email: string;
    },
    // the committer of the commit
    committer: {
        date: Date;
        name: string;
        email: string;
    },
    // the commit message
    message: string;    
}