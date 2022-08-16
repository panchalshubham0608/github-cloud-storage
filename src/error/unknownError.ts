// imports
import GitHubCloudStorageError from "./errorImpl";

// 500 Internal Server Error: server cannot process the request for an unknown reason.
export default class GitHubCloudStorageErrorUnknown extends GitHubCloudStorageError {
    constructor(message:string, path:string) { 
        super(500, message, path);
    }
}
