// Defines a generic Error for the library
export default interface GitHubCloudStorageError {
    // HTTP status code associated with this error
    status_code: number;
    // message associated with this error
    message: string;
    // path for which request was made when this error encountered
    path: string;
}
