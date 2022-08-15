// imports
import IClient from '../client/client';
import Client from '../client/clientImpl';
import IBlobReader from './blobReader';

// create Unit Tests for `BlobReader`
describe('BlobReader', () => {

    // token used for testing
    let token:string = 'token';
    let owner:string = 'owner';
    
    it('BlobReader should retrieve correct repository name', () => {
        let repository = `repo1`;
        let path = `blobs/blob0`;
        let client: IClient = new Client({repository, token, owner});
        let blobReader: IBlobReader = client.BlobReader(path);
        expect(blobReader.RepositoryName()).toBe(repository);
    });
    
    it('BlobReader should retrieve correct path', () => {
        let repository = `repo1`;
        let path = `blobs/blob0`;
        let client: IClient = new Client({repository, token, owner});
        let blobReader: IBlobReader = client.BlobReader(path);
        expect(blobReader.Path()).toBe(path);
    });

    // describe('BlobReader GetMetadata', () => {

    //     describe('GetMetadata with empty token should fail with 401', () => {

    //         it('GetMetadata with empty token should fail with 401', async () => {
    //             let repository = `github-cloud-storage-test-repo`;
    //             let path = `blobs/blob1`;
    //             let client: IClient = new Client({repository, token: '', owner});
    //             let blobReader: IBlobReader = client.BlobReader(path);
        
    //             let err: any = null;
    //             try { await blobReader.GetMetadata() } catch (error) { err = error; }
    //             expect(err).not.toBe(null);
    //             expect(err).toBeInstanceOf(GitHubCloudStorageErrorUnauthorized);    
    //         });

    //         it()
    //     });

    // });

    // describe('BlobReader access-management with token', () => {

    //     it('BlobReader read blob with empty token should fail with 401', async () => {
    //         let repository = `github-cloud-storage-test-repo`;
    //         let path = `blobs/blob1`;
    //         let client: IClient = new Client({repository, token: '', owner});
    //         let blobReader: IBlobReader = client.BlobReader(path);
    
    //         let err: any = null;
    //         try { await blobReader.Read() } catch (error) { err = error; }
    //         expect(err).not.toBe(null);
    //         expect(err).toBeInstanceOf(GitHubCloudStorageErrorUnauthorized);
    //     });

    //     it('BlobReader read blob with incorrect token should fail with 401', async () => {
    //         let repository = `github-cloud-storage-test-repo`;
    //         let path = `blobs/blob1`;
    //         let client: IClient = new Client({repository, token: 'ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', owner});
    //         let blobReader: IBlobReader = client.BlobReader(path);
    
    //         let err: any = null;
    //         try { await blobReader.Read() } catch (error) { err = error; }
    //         expect(err).not.toBe(null);
    //         expect(err).toBeInstanceOf(GitHubCloudStorageErrorUnauthorized);
    //     });
    
    //     it('BlobReader read blob with non-access to repo token should fail with 404', async () => {
    //         let repository = `github-cloud-storage-test-repo`;
    //         let path = `blobs/blob1`;
    //         let client: IClient = new Client({repository, token: anotherToken, owner});
    //         let blobReader: IBlobReader = client.BlobReader(path);
    
    //         let err: any = null;
    //         try { await blobReader.Read() } catch (error) { err = error; }
    //         expect(err).not.toBe(null);
    //         expect(err).toBeInstanceOf(GitHubCloudStorageErrorNotFound);
    //     });
        
    //     it('BlobReader read blob with correct retrieve token should not fail', async () => {
    //         let repository = `github-cloud-storage-test-repo`;
    //         let path = `blobs/blob1`;
    //         let client: IClient = new Client({repository, token, owner});
    //         let blobReader: IBlobReader = client.BlobReader(path);
    
    //         let err: any = null;
    //         try { await blobReader.Read() } catch (error) { err = error; }
    //         expect(err).toBe(null);
    //     });

    // });

    // describe('BlobReaderReadResponse blob content', () => {

    //     it('BlobReader read non-existing blob should fail with 404', async () => {
    //         let repository = `repo1`;
    //         let path = `blobs/blob0`;
    //         let client: IClient = new Client({repository, token, owner});
    //         let blobReader: IBlobReader = client.BlobReader(path);
    
    //         let err: any = null;
    //         try { await blobReader.Read() } catch (error) { err = error; }
    //         expect(err).not.toBe(null);
    //         expect(err).toBeInstanceOf(GitHubCloudStorageErrorNotFound);
    //     });

    //     it('BlobReader read existing blob should succeed and retrieve correct details', async () => {
    //         let repository = `github-cloud-storage-test-repo`;
    //         let path = `blobs/blob1`;
    //         let client: IClient = new Client({repository, token, owner});
    //         let blobReader: IBlobReader = client.BlobReader(path);
    
    //         let err: any = null;
    //         let response: IBlobReaderReadResponse | null = null;
    //         try { response = await blobReader.Read() } catch (error) { err = error; }
    //         expect(err).toBe(null);
    //         expect(response).not.toBe(null);
    //         expect(response).toBeInstanceOf(BlobReaderReadResponse);
    //         expect(response?.ETag()).toBe('495cc9fa8f9c127aaee426bcb7e09f46d82199d7');
    //         expect(response?.ContentLength()).toBe(13);
    //         expect(response?.ContentType()).toBe('application/vnd.github.v3.raw; charset=utf-8');
    //         expect(response?.LastModified()).not.toBe(null);
    //         expect(response?.RequestURL()).toBe('https://api.github.com/repos/ybanota99z3kk34/github-cloud-storage-test-repo/contents/blobs/blob1')
    //         expect(response?.ContentLength()).toBe(13);
    //         expect(response?.GitHubRequestID()).not.toBe('');
    //         expect(response?.Data()).toBe('Hello there!\n');
    //     });

    //     it('BlobReader directory', async () => {
    //         let repository = `github-cloud-storage-test-repo`;
    //         let path = `blobs`;
    //         let client: IClient = new Client({repository, token, owner});
    //         let blobReader: IBlobReader = client.BlobReader(path);
    
    //         let err: any = null;
    //         let response: IBlobReaderReadResponse | null = null;
    //         try { response = await blobReader.Read() } catch (error) { err = error; }
    //         expect(err).toBe(null);
    //         expect(response).not.toBe(null);
    //         // expect(response).toBeInstanceOf(BlobReaderReadResponse);
    //         // console.log(response);
    //         // expect(response?.ETag()).toBe('495cc9fa8f9c127aaee426bcb7e09f46d82199d7');
    //         // expect(response?.ContentLength()).toBe(13);
    //         // expect(response?.ContentType()).toBe('application/vnd.github.v3.raw; charset=utf-8');
    //         // expect(response?.LastModified()).toStrictEqual(new Date('Sun, 14 Aug 2022 16:52:33 GMT'));
    //         // expect(response?.RequestURL()).toBe('https://api.github.com/repos/ybanota99z3kk34/github-cloud-storage-test-repo/contents/blobs/blob1')
    //         // expect(response?.ContentLength()).toBe(13);
    //         // expect(response?.GitHubRequestID()).not.toBe('');
    //         // expect(response?.Data()).toBe('Hello there!\n');
    //     });
    
    // });


});
