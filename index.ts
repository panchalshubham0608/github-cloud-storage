// imports
import * as client from './src/client';
import * as errors from './src/err';
import * as blobReader from './src/blobReader'

// create named exports
export {
    client,
    errors,
    blobReader
};


// default export is for client
export default client.Client;
