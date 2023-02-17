import { Pet } from '../../models/pet.model';
import { PetsRepository } from './pets.repo';
import { PET, PET2, PET3 } from '../../data/petmock';

describe('Given a Pet Repo', () => {
    const mockData = [PET, PET2];
    PET.id = '0';
    PET2.id = '1';
    const repo = new PetsRepository();

    beforeEach(() => {
        // mocks de fetch
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockData),
        });
    });

    test('Then we can instantiate it', () => {
        expect(repo).toBeInstanceOf(PetsRepository);
    });

    describe('When we use load method', () => {
        test('Then we received the s contents in the repo', async () => {
            const data = await repo.load();
            expect(global.fetch).toHaveBeenCalled();
            expect(data).toEqual(mockData);
        });
        test('Then if there are NO DATA, we received a rejected promise', async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
            });
            await expect(async () => {
                await repo.load();
            }).rejects.toThrowError();
            expect(global.fetch).toHaveBeenCalled();
        });
    });

    describe('When we use query method', () => {
        const id = mockData[0].id;
        test('Then, if the id is VALID, we received the note searched in the repo', async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(mockData[0]),
            });
            const data = await repo.queryId(id);
            expect(global.fetch).toHaveBeenCalled();
            expect(data).toEqual(mockData[0]);
        });
        test('Then, if there are NOT id, we received a rejected promise', async () => {
            await expect(async () => {
                await repo.queryId('');
            }).rejects.toThrowError();
            expect(global.fetch).not.toHaveBeenCalled();
        });

        test('Then, if the id is NOT VALID, we received a rejected promise', async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
                status: 404,
                statusText: 'Not Found',
                json: jest.fn().mockRejectedValue(new Error()),
            });

            await expect(async () => {
                await repo.queryId('23');
            }).rejects.toThrowError();
            expect(global.fetch).toHaveBeenCalled();
        });
    });

    describe('When we use create method', () => {
        test(`Then if the data are VALID, we received the  
            created in the repo with its own new id`, async () => {
            const mockNewPetPayload: Partial<Pet> = {
                name: 'Test Pet1',
                url: 'Test https://robohash.org/robot1',
            };
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(mockNewPetPayload),
            });

            const data = await repo.create(mockNewPetPayload);
            expect(data).toHaveProperty('name', mockNewPetPayload.name);
            expect(data).toHaveProperty('name', mockNewPetPayload.name);
        });
        test(`Then if the data are NOT VALID, we received a rejected promise`, async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
            });

            await expect(async () => {
                await repo.create({});
            }).rejects.toThrowError();
            expect(global.fetch).toHaveBeenCalled();
        });
    });

    describe('When we use update method', () => {
        test(`Then if the ID are VALID, we received the robot 
            update in the repo`, async () => {
            //('Pet1', 'https://robohash.org/robot1', '8', '2', 'user1'),

            const updatePayload: Partial<Pet> = {
                id: mockData[0].id,
                name: 'Test Pet1',
            };
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(updatePayload),
            });
            const data = await repo.update(updatePayload);
            expect(data).toHaveProperty('name', updatePayload.name);
        });
        test(`Then if there are NOT ID, we received a null`, async () => {
            await expect(async () => {
                await repo.update({});
            }).rejects.toThrowError();
            expect(global.fetch).not.toHaveBeenCalled();
        });
        test(`Then if the ID are NOT VALID, we received a null`, async () => {
            const updatePayload: Partial<Pet> = {
                id: '626115',
                name: 'Pet1',
            };
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
            });
            await expect(async () => {
                await repo.update(updatePayload);
            }).rejects.toThrowError();
            expect(global.fetch).toHaveBeenCalled();
        });
    });

    describe('When we use delete method', () => {
        test(`Then if the ID are VALID, we received the ID 
            of the robot delete in the repo`, async () => {
            const id = mockData[0].id;
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(id),
            });
            const data = await repo.delete(id);
            expect(global.fetch).toHaveBeenCalled();
            expect(data).toBe(id);
        });
        test(`Then if there are NOT ID, we received a null`, async () => {
            await expect(async () => {
                await repo.delete('');
            }).rejects.toThrowError();
            expect(global.fetch).not.toHaveBeenCalled();
        });
        test(`Then if the ID are NOT VALID, we received a null`, async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
            });
            await expect(async () => {
                await repo.delete('626115');
            }).rejects.toThrowError();
            expect(global.fetch).toHaveBeenCalled();
        });
    });
});
