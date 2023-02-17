/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, SyntheticEvent } from 'react';
import { Pet } from '../../feature/models/pet.model';

export type PetContextStructure = {
    pets: Array<Pet>;
    handleLoad: () => Promise<void>;
    handleFile: (ev: SyntheticEvent) => void;
    handleDelete: (id: Pet['id']) => Promise<void>;
    handleUpdate: (petsPayload: Partial<Pet>) => Promise<void>;
    handleAdd: (petsPayload: Pet) => Promise<void>;
    handleFavourite: (petPayload: Partial<Pet>) => Promise<void>;
};

export const initialContext: PetContextStructure = {
    pets: [],
    handleLoad: async () => {},
    handleFile: () => {},
    handleDelete: async (id: Pet['id']) => {},
    handleUpdate: async (petsPayload: Partial<Pet>) => {},
    handleAdd: async (petsPayload: Partial<Pet>) => {},
    handleFavourite: async (petsPayload: Partial<Pet>) => {},
};

export const PetContext = createContext(initialContext);
