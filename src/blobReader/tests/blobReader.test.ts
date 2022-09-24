// imports
import IClient from '../../client/client';
import Client from '../../client/clientImpl';
import BlobMetadata from '../../common/blobMetadata';
import BlobContent from '../blobContent';
import * as errcodes from '../../err/errcodes';
import 'jest';

describe('BlobReader', () => {

    // get the secrets from the environment
    const owner = process.env.OWNER_NAME || '';
    const repository = process.env.OWNER_REPO || '';
    const token = process.env.OWNER_TOKEN || '';

    // create a new client
    const client: IClient = new Client({owner, repository, token});
    const blobReader = client.NewBlobReader();
    
    it('BlobReader should retrieve correct repository name', () => {
        expect(blobReader.RepositoryName()).toBe(repository);
    });
    
    describe('BlobReader GetMetadata', () => {

        it('GetMetadata should throw error ErrKindUnauthorized when authorization token is not correct', async () => {
            const client = new Client({owner, repository, token: 'invalid-token'});
            const blobReader = client.NewBlobReader();
            let error = null;
            try {
                await blobReader.GetMetadata('README.md');
            } catch (err) {
                error = err;
            }
            expect(error).not.toBeNull();
            expect(error).toBeInstanceOf(errcodes.ErrKindUnauthorized);
        });

        it('GetMetadata should throw error ErrKindNotFound when blob does not exist', async () => {
            let error = null;
            try {
                await blobReader.GetMetadata('non-existent-file.txt');
            } catch (err) {
                error = err;
            }
            expect(error).not.toBeNull();
            expect(error).toBeInstanceOf(errcodes.ErrKindNotFound);
        });

        it('GetMetadata should throw error ErrKindUnprocessableEntity when blob is not a file', async () => {
            let error = null;
            try {
                await blobReader.GetMetadata('files');
            } catch (err) {
                error = err;
            }
            expect(error).not.toBeNull();
            expect(error).toBeInstanceOf(errcodes.ErrKindUnprocessableEntity);
        });

        it('GetMetadata should return correct metadata for a file', async () => {
            const path = 'files/file1.txt';
            const filename = 'file1.txt';
            const sha = '557db03de997c86a4a028e1ebd3a1ceb225be238';
            const etag = '557db03de997c86a4a028e1ebd3a1ceb225be238';
            let metadata : BlobMetadata | null = null;
            let error = null;
            try {
                metadata = await blobReader.GetMetadata(path);
            } catch(err) {
                error = err;
            }
            expect(error).toBeNull();
            expect(metadata).not.toBeNull();

            expect(metadata).toHaveProperty('name');
            expect(metadata?.name).toBe(filename);
            expect(metadata).toHaveProperty('path');
            expect(metadata?.path).toBe(path);
            expect(metadata).toHaveProperty('sha');
            expect(metadata?.sha).toBe(sha);
            expect(metadata).toHaveProperty('size');
            expect(metadata?.size).toBe(12);
            expect(metadata).toHaveProperty('url');
            expect(metadata?.url).toBe(`https://api.github.com/repos/${owner}/${repository}/contents/${path}?ref=main`);
            expect(metadata).toHaveProperty('html_url');
            expect(metadata?.html_url).toBe(`https://github.com/${owner}/${repository}/blob/main/${path}`);
            expect(metadata).toHaveProperty('git_url');
            expect(metadata?.git_url).toBe(`https://api.github.com/repos/${owner}/${repository}/git/blobs/${sha}`);
            expect(metadata).toHaveProperty('blob_type');
            expect(metadata?.blob_type).toBe('file');
            expect(metadata).toHaveProperty('download_url');
            expect(metadata).toHaveProperty('etag');
            expect(metadata?.etag).toBe(etag);
            expect(metadata).toHaveProperty('last_modified');
            expect(metadata?.last_modified).toBeInstanceOf(Date);
        });
    });


    describe('BlobReader GetContent', () => {

        it('GetContent should throw error ErrKindUnauthorized when authorization token is not correct', async () => {
            const client = new Client({owner, repository, token: 'invalid-token'});
            const blobReader = client.NewBlobReader();
            let error = null;
            try {
                await blobReader.GetContent('README.md');
            } catch (err) {
                error = err;
            }
            expect(error).not.toBeNull();
            expect(error).toBeInstanceOf(errcodes.ErrKindUnauthorized);
        });

        it('GetContent should throw error ErrKindNotFound when blob does not exist', async () => {
            let error = null;
            try {
                await blobReader.GetContent('non-existent-file.txt');
            } catch (err) {
                error = err;
            }
            expect(error).not.toBeNull();
            expect(error).toBeInstanceOf(errcodes.ErrKindNotFound);
        });

        it('GetContent should throw error ErrKindUnprocessableEntity when blob is not a file', async () => {
            let error = null;
            try {
                await blobReader.GetContent('files');
            } catch (err) {
                error = err;
            }
            expect(error).not.toBeNull();
            expect(error).toBeInstanceOf(errcodes.ErrKindUnprocessableEntity);
        });

        it('GetContent should return correct content for a file', async () => {
            const path = 'files/file1.txt';
            const size = 12;
            const body = 'Hello World\n';
            const etag = '557db03de997c86a4a028e1ebd3a1ceb225be238';
            let blobContent : BlobContent | null = null;
            let error = null;
            try {
                blobContent = await blobReader.GetContent(path);
            } catch(err) {
                error = err;
            }
            expect(error).toBeNull();
            expect(blobContent).not.toBeNull();

            expect(blobContent).toHaveProperty('size');
            expect(blobContent?.size).toBe(size);
            expect(blobContent).toHaveProperty('body');
            expect(blobContent?.body).toBe(body);
            expect(blobContent).toHaveProperty('etag');
            expect(blobContent?.etag).toBe(etag);
            expect(blobContent).toHaveProperty('last_modified');
            expect(blobContent?.last_modified).toBeInstanceOf(Date);
        });
    });


    describe('BlobReader ListBlobs', () => {

        it('ListBlobs should throw error ErrKindUnauthorized when authorization token is not correct', async () => {
            const client = new Client({owner, repository, token: 'invalid-token'});
            const blobReader = client.NewBlobReader();
            let error = null;
            try {
                await blobReader.ListBlobs('files');
            } catch (err) {
                error = err;
            }
            expect(error).not.toBeNull();
            expect(error).toBeInstanceOf(errcodes.ErrKindUnauthorized);
        });

        it('ListBlobs should throw error ErrKindNotFound when blob does not exist', async () => {
            let error = null;
            try {
                await blobReader.ListBlobs('non-existent-directory');
            } catch (err) {
                error = err;
            }
            expect(error).not.toBeNull();
            expect(error).toBeInstanceOf(errcodes.ErrKindNotFound);
        });

        it('ListBlobs should throw error ErrKindUnprocessableEntity when blob is not a directory', async () => {
            let error = null;
            try {
                await blobReader.ListBlobs('README.md');
            } catch (err) {
                error = err;
            }
            expect(error).not.toBeNull();
            expect(error).toBeInstanceOf(errcodes.ErrKindUnprocessableEntity);
        });

        it('ListBlobs should return correct list of blobs for a directory', async () => {
            const path = 'files';
            let blobs : BlobMetadata[] | null = null;
            let error = null;
            try {
                blobs = await blobReader.ListBlobs(path);
            } catch(err) {
                error = err;
            }
            expect(error).toBeNull();
            expect(blobs).not.toBeNull();
            expect(blobs).toBeInstanceOf(Array);
            expect(blobs?.length).toBe(3);

            if (blobs !== null) {
                const blob1 = blobs[0];
                expect(blob1).toHaveProperty('name');
                expect(blob1.name).toBe('file1.txt');
                expect(blob1).toHaveProperty('blob_type');
                expect(blob1.blob_type).toBe('file');
    
                const blob2 = blobs[1];
                expect(blob2).toHaveProperty('name');
                expect(blob2.name).toBe('file2.txt');
                expect(blob2).toHaveProperty('blob_type');
                expect(blob2.blob_type).toBe('file');
    
                const blob3 = blobs[2];
                expect(blob3).toHaveProperty('name');
                expect(blob3.name).toBe('subdir');
                expect(blob3).toHaveProperty('blob_type');
                expect(blob3.blob_type).toBe('dir');    
            }
        });
    });
});
