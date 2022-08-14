// imports
import IClient from '../client/client';
import Client from '../client/clientImpl';
import IBlobReader from './blobReader';
import GitHubCloudStorageErrorNotFound from '../error/notFoundImpl';
import GitHubCloudStorageErrorUnauthorized from '../error/unauthorizedImpl';

// create Unit Tests for `BlobReader`
describe('BlobReader', () => {

    // token used for testing
    let token:string = process.env.PAT || '';
    
    it('BlobReader should retrieve correct repository name', () => {
        let repository = `repo1`;
        let path = `blobs/blob0`;
        let client: IClient = new Client({repository, token});
        let blobReader: IBlobReader = client.BlobReader(path);
        expect(blobReader.RepositoryName()).toBe(repository);
    });
    
    it('BlobReader should retrieve correct path', () => {
        let repository = `repo1`;
        let path = `blobs/blob0`;
        let client: IClient = new Client({repository, token});
        let blobReader: IBlobReader = client.BlobReader(path);
        expect(blobReader.Path()).toBe(path);
    });

    it('BlobReader read blob with empty token should fail with 401', async () => {
        let repository = `repo1`;
        let path = `blobs/blob0`;
        let client: IClient = new Client({repository, token: ''});
        let blobReader: IBlobReader = client.BlobReader(path);

        let err: any = null;
        try { await blobReader.Read() } catch (error) { err = error; }
        expect(err).not.toBe(null);
        expect(err).toBeInstanceOf(GitHubCloudStorageErrorUnauthorized);
    });

    it('BlobReader read blob with incorrect token should fail with 401', async () => {
        let repository = `repo1`;
        let path = `blobs/blob0`;
        let client: IClient = new Client({repository, token: 'ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'});
        let blobReader: IBlobReader = client.BlobReader(path);

        let err: any = null;
        try { await blobReader.Read() } catch (error) { err = error; }
        expect(err).not.toBe(null);
        expect(err).toBeInstanceOf(GitHubCloudStorageErrorUnauthorized);
    });

    it('BlobReader read non-existing blob should fail with 404', async () => {
        let repository = `repo1`;
        let path = `blobs/blob0`;
        let client: IClient = new Client({repository, token});
        let blobReader: IBlobReader = client.BlobReader(path);

        let err: any = null;
        try { await blobReader.Read() } catch (error) { err = error; }
        expect(err).not.toBe(null);
        expect(err).toBeInstanceOf(GitHubCloudStorageErrorNotFound);
    });


});
