// imports
import GitHubCloudStorageError from "./errorImpl";

// 401 Unauthorized response status code indicates that the client request has not been completed
// because it lacks valid authentication credentials for the requested resource
export default class GitHubCloudStorageErrorUnauthorized extends GitHubCloudStorageError {
    constructor(message:string, path:string) { 
        super(401, message, path);
    }
}
