import dotenv from 'dotenv';
import * as ghcs from '../index';

dotenv.config();
const owner = process.env.OWNER_NAME || '';
const repository = process.env.OWNER_REPO || '';
const token = process.env.OWNER_TOKEN || '';

const client = ghcs.NewClient({ owner, repository, token });
let reader = client.NewBlobReader();
// reader.GetMetadata('README.md').then((metadata) => {
//     console.log(metadata);
// }).catch((err) => {
//     console.log(err);
// });

reader.GetContent('README.md').then((content) => {
    console.log(content);
}).catch((err) => {
    console.log(err);
});
