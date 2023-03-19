// imports
import IClient from '../../client/client';
import Client from '../../client/clientImpl';
import ICommit from '../../common/commit';
import IBlobMetadata from '../../common/blobMetadata';
import IBlobContent from '../../common/blobContent';
import * as errcodes from '../../err/errcodes';
import 'jest';


describe('BlobWriter', () => {
    // get the secrets from the environment
    const owner = process.env.OWNER_NAME || '';
    const repository = process.env.OWNER_REPO || '';
    const token = process.env.OWNER_TOKEN || '';

    // create a new client
    const client: IClient = new Client({owner, repository, token});
    const blobWriter = client.NewBlobWriter();
    const blobReader = client.NewBlobReader();

    it('BlobWriter should retrieve correct repository name', () => {
        expect(blobWriter.RepositoryName()).toBe(repository);
    });

    describe('BlobWriter Write', () => {

        it('Write should throw error ErrKindUnauthorized when authorization token is not correct', async () => {
            const client = new Client({owner, repository, token: 'invalid-token'});
            const blobWriter = client.NewBlobWriter();
            let error = null;
            try {
                await blobWriter.Write('README.md', 'Hello World');
            } catch (err) {
                error = err;
            }
            expect(error).not.toBeNull();
            expect(error).toBeInstanceOf(errcodes.ErrKindUnauthorized);
        });

        it('Write should throw error ErrKindUnprocessableEntity when blob is not a file', async () => {
            let error = null;
            try {
                await blobWriter.Write('files', 'Hello World');
            } catch (err) {
                error = err;
            }
            expect(error).not.toBeNull();
            expect(error).toBeInstanceOf(errcodes.ErrKindUnprocessableEntity);
        });

        it('Write should create a new file', async () => {
            const path = 'blobs/file1.txt';
            const filename = 'file1.txt';
            const content = 'Hello World\nThis is a line.\n';
            let commit : ICommit | null = null;
            let blobMetadata : IBlobMetadata | null = null;
            let error = null;

            try {
                [commit, blobMetadata] = await blobWriter.Write(path, content);
            } catch (err) {
                error = err;
            }
            expect(error).toBeNull();
            expect(commit).not.toBeNull();
            expect(blobMetadata).not.toBeNull();

            expect(commit).toHaveProperty('sha');
            expect(commit).toHaveProperty('node_id');
            expect(commit).toHaveProperty('url');
            expect(commit).toHaveProperty('html_url');
            expect(commit).toHaveProperty('author');
            expect(commit).toHaveProperty('committer');
            expect(commit).toHaveProperty('message');

            expect(blobMetadata).toHaveProperty('name');
            expect(blobMetadata?.name).toBe(filename);
            expect(blobMetadata).toHaveProperty('path');
            expect(blobMetadata?.path).toBe(path);
            expect(blobMetadata).toHaveProperty('size');
            expect(blobMetadata?.size).toBe(content.length);
            expect(blobMetadata).toHaveProperty('blob_type');
            expect(blobMetadata?.blob_type).toBe('file');

            expect(blobMetadata).toHaveProperty('sha');
            expect(blobMetadata).toHaveProperty('url');
            expect(blobMetadata).toHaveProperty('html_url');
            expect(blobMetadata).toHaveProperty('git_url');
            expect(blobMetadata).toHaveProperty('download_url');

            let blobContent : IBlobContent | null = null;
            try {
                blobContent = await blobReader.GetContent(path);
            } catch (err) {
                error = err;
            }
            expect(error).toBeNull();
            expect(blobContent).not.toBeNull();
            expect(blobContent?.body).toBe(content);
            expect(blobContent?.size).toBe(content.length);
        });

        it('Write should update an existing file', async () => {
            const path = 'blobs/file1.txt';
            const filename = 'file1.txt';
            const content = 'Hello World\nThis is a line.\nThis is another line.\n';
            let commit : ICommit | null = null;
            let blobMetadata : IBlobMetadata | null = null;
            let error = null;

            try {
                [commit, blobMetadata] = await blobWriter.Write(path, content);
            } catch (err) {
                error = err;
            }
            expect(error).toBeNull();
            expect(commit).not.toBeNull();
            expect(blobMetadata).not.toBeNull();

            expect(commit).toHaveProperty('sha');
            expect(commit).toHaveProperty('node_id');
            expect(commit).toHaveProperty('url');
            expect(commit).toHaveProperty('html_url');
            expect(commit).toHaveProperty('author');
            expect(commit).toHaveProperty('committer');
            expect(commit).toHaveProperty('message');

            expect(blobMetadata).toHaveProperty('name');
            expect(blobMetadata?.name).toBe(filename);
            expect(blobMetadata).toHaveProperty('path');
            expect(blobMetadata?.path).toBe(path);
            expect(blobMetadata).toHaveProperty('size');
            expect(blobMetadata?.size).toBe(content.length);
            expect(blobMetadata).toHaveProperty('blob_type');
            expect(blobMetadata?.blob_type).toBe('file');

            expect(blobMetadata).toHaveProperty('sha');
            expect(blobMetadata).toHaveProperty('url');
            expect(blobMetadata).toHaveProperty('html_url');
            expect(blobMetadata).toHaveProperty('git_url');
            expect(blobMetadata).toHaveProperty('download_url');

            let blobContent : IBlobContent | null = null;
            try {
                blobContent = await blobReader.GetContent(path);
            } catch (err) {
                error = err;
            }
            expect(error).toBeNull();
            expect(blobContent).not.toBeNull();
            expect(blobContent?.body).toBe(content);
            expect(blobContent?.size).toBe(content.length);
        });

    });

    describe('BlobWriter Delete', () => {

        it('Delete should throw error ErrKindUnauthorized when authorization token is not correct', async () => {
            const client = new Client({owner, repository, token: 'invalid-token'});
            const blobWriter = client.NewBlobWriter();
            let error = null;
            try {
                await blobWriter.Delete('README.md');
            } catch (err) {
                error = err;
            }
            expect(error).not.toBeNull();
            expect(error).toBeInstanceOf(errcodes.ErrKindUnauthorized);
        });

        it('Delete should throw error ErrKindUnprocessableEntity when blob is not a file', async () => {
            let error = null;
            try {
                await blobWriter.Delete('files');
            } catch (err) {
                error = err;
            }
            expect(error).not.toBeNull();
            expect(error).toBeInstanceOf(errcodes.ErrKindUnprocessableEntity);
        });

        it('Delete should throw error ErrKindNotFound when blob does not exist', async () => {
            let error = null;
            try {
                await blobWriter.Delete('blobs/does-not-exist.txt');
            } catch (err) {
                error = err;
            }
            expect(error).not.toBeNull();
            expect(error).toBeInstanceOf(errcodes.ErrKindNotFound);
        });

        it('Delete should delete a file', async () => {
            const path = 'blobs/file1.txt';
            const content = 'Hello World\nThis is a line.\n';

            let commit : ICommit | null = null;
            let blobMetadata : IBlobMetadata | null = null;
            let error = null;

            try {
                [commit, blobMetadata] = await blobWriter.Write(path, content);
            } catch (err) {
                error = err;
            }
            expect(error).toBeNull();
            expect(commit).not.toBeNull();
            expect(blobMetadata).not.toBeNull();

            try {
                commit = await blobWriter.Delete(path);
            } catch (err) {
                error = err;
            }
            expect(error).toBeNull();
            expect(commit).not.toBeNull();

            try {
                blobMetadata = await blobReader.GetMetadata(path);
            } catch (err) {
                error = err;
            }
            expect(error).not.toBeNull();
            expect(error).toBeInstanceOf(errcodes.ErrKindNotFound);
        });
    });

});