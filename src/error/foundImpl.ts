// imports
import GitHubCloudStorageError from "./errorImpl";

// 302 Found: indicates that the resource requested has been temporarily moved to the URL given by the Location header
export default class GitHubCloudStorageErrorFound extends GitHubCloudStorageError {
    constructor(message:string, path:string) { 
        super(302, message, path);
    }
}
