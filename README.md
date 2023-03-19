# ghcs
![CI](https://github.com/panchalshubham0608/github-cloud-storage/actions/workflows/intergration-test.yml/badge.svg)
![Lint](https://github.com/panchalshubham0608/github-cloud-storage/actions/workflows/lint.yml/badge.svg)

`ghcs (github-cloud-storage)` provides a simple interface to read and write blobs to a GitHub repository. The blobs are stored in the repository as files. This library makes use of the GitHub API to read and write blobs.

Here are the references to underlying GitHub API:
- https://docs.github.com/en/rest/repos/contents#get-repository-content
- https://docs.github.com/en/rest/repos/contents#create-or-update-file-contents
- https://docs.github.com/en/rest/repos/contents#delete-a-file



## Installing
```
$ npm install ghcs
```

## Documentation
A complete guide for this library can be found [here](https://panchalshubham0608.github.io/github-cloud-storage/)

## Examples
Here are a few examples that outlines the usage of the `ghcs` library.

**Creating new client**
A new client can be created using the `ghcs.client.Client` class constructor. This constructor requires three properties:
1. `owner` - the owner of the repository
2. `repository` - the repository for which blobs are to be read/written
3. `token` - personal access token with `repo` scope


```js
// create a new client
const client = new ghcs.client.Client({
    owner: 'panchalshubham0608',
    repository: 'test-repo',
    token: process.env.GITHUB_TOKEN,
});

// retrieve the name of the repository from the client
console.log(`Repository: ${client.repository}`);
// retrieve the name of the owner from the client
console.log(`Owner: ${client.owner}`);
```

**Reading  blobs:**
All the blob read operations are facilitated by `BlobReader` and you can get an instance of `BlobReader` by invoking the `NewBlobReader` method.
```js
// get an instance of blob reader to facilitate blob reading
const blobReader = client.NewBlobReader();
```

To read content of a blob you can invoke the `GetContent` method. Note that this will throw an error of kind `ErrKindUnprocessableEntity` if the blob at given path is a directory.
```js
// read the content of the blob
blobReader.GetContent('test.txt').then(blobContent => {
    console.log(`Content of the blob: ${blobContent.body}`);
    console.log(`Size of the blob: ${blobContent.size}`);
}).catch(err => {
    console.log(err);
})
```
In similar fashion you can get the metadata of the blob by invoking `GetMetadata(path)` provided that the blob at given path corresponds to a file.  The `ListBlobs(path)` method can be used to list the blobs at given path provided that the blob at given path is a directory.


**Writing new blobs:**
All the blob writing/deletion operations are facilitated by `BlobWriter` and you can get an instance of a `BlobWriter` by invoking the `NewBlobWriter` method.
```js
// get an instance of blob writer to facilitate writing to the repository
const blobWriter = client.NewBlobWriter();
```

To write content to a blob you can invoke `Write(path, content)` method which will write the content at given path and in response you get the details of commit created and the metadata of the newly created blob.
Here are a few things to keep in mind while writing blobs:
- If there already exists a blob at given path then it will be overwritten.
- If there alredy exists a directory at given path then an error of type `ErrKindUnprocessableEntity`is thrown.
```js
// write a file to the repository
blobWriter.Write('test.txt', 'Hello World!').then(resp => {
    // response object will contain the commit details and metadata of the blob
    const [commit, blobMetadata] = resp;
    console.log(`Commit: ${commit.sha}`);
    console.log(`Blob: ${blobMetadata.sha}`);
}).catch(err => {
    console.log(err);
});
```

### License
[MIT](./LICENSE)
