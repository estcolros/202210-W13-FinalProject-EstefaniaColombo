import { Pet } from '../../../feature/models/pet.model';

export type PetType = {
    name: string;
    url: string;
};

export type PetCollection = {
    [key: string]: Pet;
};
