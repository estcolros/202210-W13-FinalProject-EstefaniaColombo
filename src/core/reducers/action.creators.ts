import { Pet } from '../../feature/models/pet.model';
import { petsActionTypes } from './action.types';

export type petsAction = {
    type: string;
    payload: Array<Pet> | Pet | Pet['id'];
};

export const petsLoadCreator = (payload: Array<Pet>): petsAction => ({
    type: petsActionTypes.load,
    payload,
});

export const petsAddCreator = (payload: Pet): petsAction => ({
    type: petsActionTypes.add,
    payload,
});

export const petsUpdateCreator = (payload: Pet): petsAction => ({
    type: petsActionTypes.update,
    payload,
});

export const petsDeleteCreator = (payload: Pet['id']): petsAction => ({
    type: petsActionTypes.delete,
    payload,
});
