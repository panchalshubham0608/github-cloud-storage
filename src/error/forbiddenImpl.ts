// imports
import GitHubCloudStorageError from "./errorImpl";

// 403 Forbidden: ndicates that the server understands the request but refuses to authorize it.
export default class GitHubCloudStorageErrorForbidden extends GitHubCloudStorageError {
    constructor(message:string, path:string) { 
        super(403, message, path);
    }
};
