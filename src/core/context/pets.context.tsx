/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { PetsType } from '../../feature/models/pet.model';

export type PetContextStructure = {
    pets: Array<PetsType>;
    handleLoad: () => Promise<void>;
    handleDelete: (id: PetsType['id']) => Promise<void>;
    handleUpdate: (petsPayload: Partial<PetsType>) => Promise<void>;
    handleAdd: (petsPayload: PetsType) => Promise<void>;
    handleFavourite: (petPayload: Partial<PetsType>) => Promise<void>;
};

export const initialContext: PetContextStructure = {
    pets: [],
    handleLoad: async () => {},
    handleDelete: async (id: PetsType['id']) => {},
    handleUpdate: async (petsPayload: Partial<PetsType>) => {},
    handleAdd: async (petsPayload: Partial<PetsType>) => {},
    handleFavourite: async (petsPayload: Partial<PetsType>) => {},
};

export const PetContext = createContext(initialContext);
