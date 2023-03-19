// imports
import Client from '../clientImpl';
import 'jest';
import { ErrKindBadRequest } from '../../err/errcodes';

describe('Client', () => {
    it('should throw error when name is not provided', () => {
        expect(() => new Client({
            owner: '',
            repository: 'repository',
            token: 'token',
        })).toThrow(ErrKindBadRequest);
    });

    it('should throw error when repository is not provided', () => {
        expect(() => new Client({
            owner: 'owner',
            repository: '',
            token: 'token',
        })).toThrow(ErrKindBadRequest);
    });

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

        // const blobWriter = client.NewBlobWriter();
        // expect(blobWriter).toBeTruthy();
    });
});
