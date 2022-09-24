// imports
import Client from '../clientImpl';
import 'jest';

describe('Client', () => {
    it('should be able to create a new instance', () => {
        const client = new Client({
            token: 'token',
            owner: 'owner',
            repository: 'repository',
        });
        expect(client).toBeTruthy();
        expect(client.OwnerName()).toBe('owner');
        expect(client.RepositoryName()).toBe('repository');

        const blobReader = client.NewBlobReader();
        expect(blobReader).toBeTruthy();

        const blobWriter = client.NewBlobWriter();
        expect(blobWriter).toBeTruthy();
    });    
});
