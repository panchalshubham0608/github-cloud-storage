// // imports
// import IClient from '../client/client';
// import Client from '../client/clientImpl';
// import IBlobReader from './blobReader';
// import GitHubCloudStorageErrorNotFound from '../error/notFoundImpl';
// import GitHubCloudStorageErrorUnauthorized from '../error/unauthorizedImpl';
// import IBlobReaderMetadataResponse from './blobReaderMetadataResponse';
// import BlobReaderMetadataResponse from './blobReaderMetadataResponseImpl';

// // create Integration Tests for `BlobReader::GetMetadata`
// describe('BlobReader GetMetadata', () => {

//     // token used for testing
//     const token:string = process.env.PAT || '';
//     const anotherToken:string = process.env.ANOTHER_PAT || '';
//     const owner:string = process.env.OWNER || '';
    
//     describe('GetMetadata access-management', () => {

//         it('GetMetadata with empty token should fail with 401', async () => {
//             const repository = `github-cloud-storage-test-repo`;
//             const path = `blobs/blob1`;
//             const client: IClient = new Client({repository, token: '', owner});
//             const blobReader: IBlobReader = client.BlobReader(path);
    
//             let err: any = null;
//             try { await blobReader.GetMetadata() } catch (error) { err = error; }
//             expect(err).not.toBe(null);
//             expect(err).toBeInstanceOf(GitHubCloudStorageErrorUnauthorized);    
//         });

//         it('GetMetadata with incorrect token should fail with 401', async () => {
//             const repository = `github-cloud-storage-test-repo`;
//             const path = `blobs/blob1`;
//             const client: IClient = new Client({repository, token: 'ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', owner});
//             const blobReader: IBlobReader = client.BlobReader(path);
    
//             let err: any = null;
//             try { await blobReader.GetMetadata() } catch (error) { err = error; }
//             expect(err).not.toBe(null);
//             expect(err).toBeInstanceOf(GitHubCloudStorageErrorUnauthorized);
//         });

//         it('GetMetadata with non-access to repo token should fail with 404', async () => {
//             const repository = `github-cloud-storage-test-repo`;
//             const path = `blobs/blob1`;
//             const client: IClient = new Client({repository, token: anotherToken, owner});
//             const blobReader: IBlobReader = client.BlobReader(path);
    
//             let err: any = null;
//             try { await blobReader.GetMetadata() } catch (error) { err = error; }
//             expect(err).not.toBe(null);
//             expect(err).toBeInstanceOf(GitHubCloudStorageErrorNotFound);
//         });

//         it('GetMetadata with correct token should not fail for file', async () => {
//             const repository = `github-cloud-storage-test-repo`;
//             const path = `blobs/blob1`;
//             const client: IClient = new Client({repository, token, owner});
//             const blobReader: IBlobReader = client.BlobReader(path);
    
//             let err: any = null;
//             try { await blobReader.GetMetadata() } catch (error) { err = error; }
//             expect(err).toBe(null);
//         });

//         it('GetMetadata with correct token should not fail for directory', async () => {
//             const repository = `github-cloud-storage-test-repo`;
//             const path = `blobs`;
//             const client: IClient = new Client({repository, token, owner});
//             const blobReader: IBlobReader = client.BlobReader(path);
    
//             let err: any = null;
//             try { await blobReader.GetMetadata() } catch (error) { err = error; }
//             expect(err).toBe(null);
//         });

//     });

//     describe('GetMetadata content-management', () => {

//         it('GetMetadata for non-existing blob should fail with 404', async () => {
//             const repository = `repo1`;
//             const path = `blobs/blob1`;
//             const client: IClient = new Client({repository, token, owner});
//             const blobReader: IBlobReader = client.BlobReader(path);
    
//             let err: any = null;
//             try { await blobReader.GetMetadata() } catch (error) { err = error; }
//             expect(err).not.toBe(null);
//             expect(err).toBeInstanceOf(GitHubCloudStorageErrorNotFound);
//         });

//         it('GetMetadata for file should succeed and retrieve correct details', async () => {
//             const repository = `github-cloud-storage-test-repo`;
//             const path = `blobs/blob1`;
//             const client: IClient = new Client({repository, token, owner});
//             const blobReader: IBlobReader = client.BlobReader(path);
    
//             let err: any = null;
//             let blobMetadataResponse: IBlobReaderMetadataResponse | null = null;
//             try { blobMetadataResponse = await blobReader.GetMetadata() } catch (error) { err = error; }
//             expect(err).toBe(null);
//             expect(blobMetadataResponse).not.toBe(null);
//             expect(blobMetadataResponse).toBeInstanceOf(BlobReaderMetadataResponse);
//             expect(blobMetadataResponse?.ETag()).toBe('495cc9fa8f9c127aaee426bcb7e09f46d82199d7');
//             expect(blobMetadataResponse?.LastModified()).not.toBe('');
//             expect(blobMetadataResponse?.GitHubRequestID()).not.toBe('');
//             expect(blobMetadataResponse?.RequestURL()).toBe('/repos/ybanota99z3kk34/github-cloud-storage-test-repo/contents/blobs/blob1');
//             expect(blobMetadataResponse?.IsDirectory()).toBe(false);
//             expect(blobMetadataResponse?.BlobMetadataList()).toBe(null);
//             expect(blobMetadataResponse?.BlobMetadata()).not.toBe(null);
//             const blobMetadata = blobMetadataResponse?.BlobMetadata();
//             expect(blobMetadata?.Name()).toBe('blob1');
//             expect(blobMetadata?.RelativePath()).toBe('blobs/blob1');
//             expect(blobMetadata?.SHA()).toBe('495cc9fa8f9c127aaee426bcb7e09f46d82199d7');
//             expect(blobMetadata?.Size()).toBe(13);
//             expect(blobMetadata?.Url()).toBe('https://api.github.com/repos/ybanota99z3kk34/github-cloud-storage-test-repo/contents/blobs/blob1?ref=main');
//             expect(blobMetadata?.HTMLUrl()).toBe('https://github.com/ybanota99z3kk34/github-cloud-storage-test-repo/blob/main/blobs/blob1');
//             expect(blobMetadata?.GitUrl()).toBe('https://api.github.com/repos/ybanota99z3kk34/github-cloud-storage-test-repo/git/blobs/495cc9fa8f9c127aaee426bcb7e09f46d82199d7');
//             expect(blobMetadata?.Type()).toBe('file');
//         });

//         it('GetMetadata for directory should succeed and retrieve correct details', async () => {
//             const repository = `github-cloud-storage-test-repo`;
//             const path = `blobs`;
//             const client: IClient = new Client({repository, token, owner});
//             const blobReader: IBlobReader = client.BlobReader(path);
    
//             let err: any = null;
//             let blobMetadataResponse: IBlobReaderMetadataResponse | null = null;
//             try { blobMetadataResponse = await blobReader.GetMetadata() } catch (error) { err = error; }
//             expect(err).toBe(null);
//             expect(blobMetadataResponse).not.toBe(null);
//             expect(blobMetadataResponse).toBeInstanceOf(BlobReaderMetadataResponse);
//             expect(blobMetadataResponse?.ETag()).toBe('528ed3faa927a850ea8a3436aa1ce723cea9a3b8');
//             expect(blobMetadataResponse?.LastModified()).not.toBe('');
//             expect(blobMetadataResponse?.GitHubRequestID()).not.toBe('');
//             expect(blobMetadataResponse?.RequestURL()).toBe('/repos/ybanota99z3kk34/github-cloud-storage-test-repo/contents/blobs');
//             expect(blobMetadataResponse?.IsDirectory()).toBe(true);
//             expect(blobMetadataResponse?.BlobMetadataList()).not.toBe(null);
//             expect(blobMetadataResponse?.BlobMetadata()).toBe(null);
//             const blobMetadataList = blobMetadataResponse?.BlobMetadataList();
//             expect(blobMetadataList?.length).toBe(3);
//             if (blobMetadataList) {
//                 expect(blobMetadataList[0]?.Name()).toBe('blob1');
//                 expect(blobMetadataList[0]?.RelativePath()).toBe('blobs/blob1');
//                 expect(blobMetadataList[0]?.SHA()).toBe('495cc9fa8f9c127aaee426bcb7e09f46d82199d7');
//                 expect(blobMetadataList[0]?.Size()).toBe(13);
//                 expect(blobMetadataList[0]?.Url()).toBe('https://api.github.com/repos/ybanota99z3kk34/github-cloud-storage-test-repo/contents/blobs/blob1?ref=main');
//                 expect(blobMetadataList[0]?.HTMLUrl()).toBe('https://github.com/ybanota99z3kk34/github-cloud-storage-test-repo/blob/main/blobs/blob1');
//                 expect(blobMetadataList[0]?.GitUrl()).toBe('https://api.github.com/repos/ybanota99z3kk34/github-cloud-storage-test-repo/git/blobs/495cc9fa8f9c127aaee426bcb7e09f46d82199d7');    
//                 expect(blobMetadataList[0].Type()).toBe('file');

//                 expect(blobMetadataList[1]?.Name()).toBe('blob2');
//                 expect(blobMetadataList[1]?.RelativePath()).toBe('blobs/blob2');
//                 expect(blobMetadataList[1]?.SHA()).toBe('9f100e5deceeadb195252fca29861d4500a37fa1');
//                 expect(blobMetadataList[1]?.Size()).toBe(3207);
//                 expect(blobMetadataList[1]?.Url()).toBe('https://api.github.com/repos/ybanota99z3kk34/github-cloud-storage-test-repo/contents/blobs/blob2?ref=main');
//                 expect(blobMetadataList[1]?.HTMLUrl()).toBe('https://github.com/ybanota99z3kk34/github-cloud-storage-test-repo/blob/main/blobs/blob2');
//                 expect(blobMetadataList[1]?.GitUrl()).toBe('https://api.github.com/repos/ybanota99z3kk34/github-cloud-storage-test-repo/git/blobs/9f100e5deceeadb195252fca29861d4500a37fa1');    
//                 expect(blobMetadataList[1].Type()).toBe('file');

//                 expect(blobMetadataList[2]?.Name()).toBe('sub-blob');
//                 expect(blobMetadataList[2]?.RelativePath()).toBe('blobs/sub-blob');
//                 expect(blobMetadataList[2]?.SHA()).toBe('a2f64d0ae6031361fb7ac415d4d2749edc94f7c5');
//                 expect(blobMetadataList[2]?.Size()).toBe(0);
//                 expect(blobMetadataList[2]?.Url()).toBe('https://api.github.com/repos/ybanota99z3kk34/github-cloud-storage-test-repo/contents/blobs/sub-blob?ref=main');
//                 expect(blobMetadataList[2]?.HTMLUrl()).toBe('https://github.com/ybanota99z3kk34/github-cloud-storage-test-repo/tree/main/blobs/sub-blob');
//                 expect(blobMetadataList[2]?.GitUrl()).toBe('https://api.github.com/repos/ybanota99z3kk34/github-cloud-storage-test-repo/git/trees/a2f64d0ae6031361fb7ac415d4d2749edc94f7c5');
//                 expect(blobMetadataList[2].Type()).toBe('dir');
//             }

//         });


//     });

// });
