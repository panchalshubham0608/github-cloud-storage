// // imports
// import IClient from '../../client/client';
// import Client from '../../client/clientImpl';
// import IBlobReader from '../blobReader';
// import GitHubCloudStorageErrorNotFound from '../../error/notFoundImpl';
// import GitHubCloudStorageErrorUnauthorized from '../../error/unauthorizedImpl';
// import IBlobReaderContentResponse from '../blobReaderContentResponse';

// describe('BlobReader Content', () => {
//     // token used for testing
//     const token:string = process.env.PAT || '';
//     const anotherToken:string = process.env.ANOTHER_PAT || '';
//     const owner:string = process.env.OWNER || '';
    
//     describe('GetContent access-management', () => {

//         it('GetContent with empty token should fail with 401', async () => {
//             const repository = `github-cloud-storage-test-repo`;
//             const path = `blobs/blob1`;
//             const client: IClient = new Client({repository, token: '', owner});
//             const blobReader: IBlobReader = client.BlobReader(path);
    
//             let err: any = null;
//             try { await blobReader.GetContent() } catch (error) { err = error; }
//             expect(err).not.toBe(null);
//             expect(err).toBeInstanceOf(GitHubCloudStorageErrorUnauthorized);    
//         });

//         it('GetContent with incorrect token should fail with 401', async () => {
//             const repository = `github-cloud-storage-test-repo`;
//             const path = `blobs/blob1`;
//             const client: IClient = new Client({repository, token: 'ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', owner});
//             const blobReader: IBlobReader = client.BlobReader(path);
    
//             let err: any = null;
//             try { await blobReader.GetContent() } catch (error) { err = error; }
//             expect(err).not.toBe(null);
//             expect(err).toBeInstanceOf(GitHubCloudStorageErrorUnauthorized);
//         });

//         it('GetContent with non-access to repo token should fail with 404', async () => {
//             const repository = `github-cloud-storage-test-repo`;
//             const path = `blobs/blob1`;
//             const client: IClient = new Client({repository, token: anotherToken, owner});
//             const blobReader: IBlobReader = client.BlobReader(path);
    
//             let err: any = null;
//             try { await blobReader.GetContent() } catch (error) { err = error; }
//             expect(err).not.toBe(null);
//             expect(err).toBeInstanceOf(GitHubCloudStorageErrorNotFound);
//         });

//         it('GetContent with correct token should not fail for file', async () => {
//             const repository = `github-cloud-storage-test-repo`;
//             const path = `blobs/blob1`;
//             const client: IClient = new Client({repository, token, owner});
//             const blobReader: IBlobReader = client.BlobReader(path);
    
//             let err: any = null;
//             try { await blobReader.GetContent() } catch (error) { err = error; }
//             expect(err).toBe(null);
//         });

//         it('GetContent with correct token should not fail for directory', async () => {
//             const repository = `github-cloud-storage-test-repo`;
//             const path = `blobs`;
//             const client: IClient = new Client({repository, token, owner});
//             const blobReader: IBlobReader = client.BlobReader(path);
    
//             let err: any = null;
//             try { await blobReader.GetContent() } catch (error) { err = error; }
//             expect(err).toBe(null);
//         });

//     });

//     describe('GetContent content-management', () => {

//         it('GetContent for non-existing blob should fail with 404', async () => {
//             const repository = `repo1`;
//             const path = `blobs/blob1`;
//             const client: IClient = new Client({repository, token, owner});
//             const blobReader: IBlobReader = client.BlobReader(path);
    
//             let err: any = null;
//             try { await blobReader.GetContent() } catch (error) { err = error; }
//             expect(err).not.toBe(null);
//             expect(err).toBeInstanceOf(GitHubCloudStorageErrorNotFound);
//         });

//         it('GetContent for file should succeed and retrieve correct content', async () => {
//             const repository = `github-cloud-storage-test-repo`;
//             const path = `blobs/blob1`;
//             const client: IClient = new Client({repository, token, owner});
//             const blobReader: IBlobReader = client.BlobReader(path);
    
//             let err: any = null;
//             let blobContentResponse: IBlobReaderContentResponse | null = null;
//             try { blobContentResponse = await blobReader.GetContent() } catch (error) { err = error; }
//             expect(err).toBe(null);
//             expect(blobContentResponse).not.toBe(null);
//             expect(blobContentResponse?.ETag()).toBe('495cc9fa8f9c127aaee426bcb7e09f46d82199d7');
//             expect(blobContentResponse?.LastModified()).toBeInstanceOf(Date);
//             expect(blobContentResponse?.GitHubRequestID()).not.toBe('');
//             expect(blobContentResponse?.RequestURL()).toBe('/repos/ybanota99z3kk34/github-cloud-storage-test-repo/contents/blobs/blob1');
//             expect(blobContentResponse?.IsDirectory()).toBe(false);
//             expect(blobContentResponse?.Data()).toBe('Hello there!\n');
//         });

//         it('GetContent for directory should succeed and retrieve null content', async () => {
//             const repository = `github-cloud-storage-test-repo`;
//             const path = `blobs`;
//             const client: IClient = new Client({repository, token, owner});
//             const blobReader: IBlobReader = client.BlobReader(path);
    
//             let err: any = null;
//             let blobContentResponse: IBlobReaderContentResponse | null = null;
//             try { blobContentResponse = await blobReader.GetContent() } catch (error) { err = error; }
//             expect(err).toBe(null);
//             expect(blobContentResponse).not.toBe(null);
//             expect(blobContentResponse?.ETag()).toBe('528ed3faa927a850ea8a3436aa1ce723cea9a3b8');
//             expect(blobContentResponse?.LastModified()).toBeInstanceOf(Date);
//             expect(blobContentResponse?.GitHubRequestID()).not.toBe('');
//             expect(blobContentResponse?.RequestURL()).toBe('/repos/ybanota99z3kk34/github-cloud-storage-test-repo/contents/blobs');
//             expect(blobContentResponse?.IsDirectory()).toBe(true);
//             expect(blobContentResponse?.Data()).toBe(null);
//         });

//     });
    
// });