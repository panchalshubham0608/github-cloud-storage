import Client from "./src/client/clientImpl";

let client = new Client({
    token: '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',
    repository: 'github-cloud-storage-test-repo',
    owner: 'ybanota99z3kk34'
});

console.log(client.RepositoryName());
let reader1 = client.BlobReader('blobs/blob1');
reader1.GetMetadata().then(resp => {
    console.log(resp.ETag())
    console.log(resp.LastModified())
    console.log(resp.GitHubRequestID())
    console.log(resp.RequestURL())
    console.log(resp.IsDirectory())
    let blobMetadata = resp.BlobMetadata();
    console.log(blobMetadata);
    let blobMetadataList = resp.BlobMetadataList();
    if (blobMetadataList !== null) {
        for (let blobMetadata of blobMetadataList) {
            console.log(blobMetadata);
        }
    }
}).catch(err => {
    console.log(err);
});
