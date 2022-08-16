// imports
import * as client from './src/client/index';
import * as errors from './src/error/index';
import * as blobreader from './src/reader/index';

// default export is for client
export default client.Client;

// exports
export {
    client,
    errors,
    blobreader
};
