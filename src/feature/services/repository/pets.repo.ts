import { Repository } from '../../../core/services/repository/repo';
import { Pet } from '../../models/pet.model';

const invalidIdError = new Error('Invalid ID');
const firebaseCORS = '.json';

export class PetsRepository implements Repository<Pet> {
    constructor(
        private url = 'https://petadopt-6a034-default-rtdb.europe-west1.firebasedatabase.app/pets'
    ) {}

    async load(): Promise<Pet[]> {
        const resp = await fetch(this.url + firebaseCORS);
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        const result = await resp.json();
        return Object.keys(result).map((key) => ({
            ...result[key],
            id: key,
        }));
    }
    async queryId(id: string): Promise<Pet> {
        if (!id || typeof id !== 'string')
            return Promise.reject(invalidIdError);
        const resp = await fetch(this.url + id);
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        return await resp.json();
    }

    async create(payload: Partial<Pet>): Promise<Pet> {
        const resp = await fetch(this.url + firebaseCORS, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json',
            },
        });
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        return await resp.json();
    }
    async update(payload: Partial<Pet>): Promise<Pet> {
        if (!payload.id) return Promise.reject(invalidIdError);
        const resp = await fetch(this.url + payload.id + firebaseCORS, {
            method: 'PATCH',
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json',
            },
        });
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        return await resp.json();
    }
    async delete(id: Pet['id']): Promise<Pet['id']> {
        if (!id) return Promise.reject(invalidIdError);
        const resp = await fetch(this.url + id + firebaseCORS, {
            method: 'DELETE',
        });
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        return id;
    }
}
