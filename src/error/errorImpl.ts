// imports
import IGitHubCloudStorageError from "./error";

// Parent class implementation for all errors
export default class GitHubCloudStorageError implements IGitHubCloudStorageError {
        // properties of error
        private readonly statusCode:number;
        private readonly message:string;
        private readonly path:string;
    
        // constructor
        constructor(statusCode: number, message:string, path: string) {
            this.statusCode = statusCode;
            this.message = message;
            this.path = path;
        }
    
    // retrieve the status code
    StatusCode(): number {
        return this.statusCode;
    }

    // the path accessed
    Path(): string {
        return this.path;
    }

    // retieve the message
    Message(): string {
        return this.message;
    }
    
};
