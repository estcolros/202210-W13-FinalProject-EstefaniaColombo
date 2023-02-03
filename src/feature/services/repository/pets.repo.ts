import { Repository } from '../../../core/services/repository/repo';
import { PetsType } from '../../models/pet.model';

const invalidIdError = new Error('Invalid ID');
const firebaseCORS = '.json';

export class PetsRepository implements Repository<PetsType> {
    constructor(
        private url = 'https://petadopt-6a034-default-rtdb.europe-west1.firebasedatabase.app/pets'
    ) {}

    async load(): Promise<PetsType[]> {
        const resp = await fetch(this.url + firebaseCORS);
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        const result = await resp.json();
        return Object.keys(result).map((key) => ({
            ...result[key],
            id: key,
        }));
    }
    async queryId(id: string): Promise<PetsType> {
        if (!id || typeof id !== 'string')
            return Promise.reject(invalidIdError);
        const resp = await fetch(this.url + id);
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        return await resp.json();
    }

    async create(payload: Partial<PetsType>): Promise<PetsType> {
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
    async update(payload: Partial<PetsType>): Promise<PetsType> {
        if (!payload.id) return Promise.reject(invalidIdError);
        const resp = await fetch(this.url + '/' + payload.id + '.json', {
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
    async delete(id: PetsType['id']): Promise<PetsType['id']> {
        if (!id) return Promise.reject(invalidIdError);
        const resp = await fetch(this.url + '/' + id + '.json', {
            method: 'DELETE',
        });
        if (!resp.ok)
            throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        return id;
    }
}
