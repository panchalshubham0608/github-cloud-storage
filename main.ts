import Client from "./src/client/clientImpl";

const client = new Client({
    token: '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',
    repository: 'github-cloud-storage-test-repo',
    owner: 'ybanota99z3kk34'
});

console.log(client.RepositoryName());
const reader1 = client.BlobReader('blobs/blob1');
reader1.GetMetadata().then(resp => {
    console.log(resp.ETag())
    console.log(resp.LastModified())
    console.log(resp.GitHubRequestID())
    console.log(resp.RequestURL())
    console.log(resp.IsDirectory())
    const blobMetadata = resp.BlobMetadata();
    console.log(blobMetadata);
    const blobMetadataList = resp.BlobMetadataList();
    if (blobMetadataList !== null) {
        for (const blobMetadata of blobMetadataList) {
            console.log(blobMetadata);
        }
    }
}).catch(err => {
    console.log(err);
});
