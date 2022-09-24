/**
 * Defines a generic Error for the library
 */
export default interface IGitHubCloudStorageError {
    /**
     * The HTTP status code
     */
    status_code: number;

    /**
     * The error message
     */
    message: string;

    /**
     * The path of the blob for which the error occurred
     */
    path: string;
}
