// imports
import GitHubCloudStorageError from "./errorImpl";

// 404 NotFound: This response code occurs when the server cannot find the resources being requested by the client
export default class GitHubCloudStorageErrorNotFound extends GitHubCloudStorageError {
    constructor(message:string, path:string) { 
        super(404, message, path);
    }
}
