import {
    mockPet1,
    mockPet2,
    mockPets,
} from '../../feature/hooks/pets/use.pets.mock';
import * as ac from './pets.action.creators';
import { petsAction } from './pets.action.creators';

import { PET } from '../../feature/data/petmock';
import { Pet } from '../../feature/models/pet.model';
import { petsReducer } from './pets.reducer';

describe('Given the reducer', () => {
    let state: Array<Pet>;
    let action: petsAction;

    describe('When the action type is "pets@load"', () => {
        test('Then it should return as state the loaded data', () => {
            state = [];
            action = ac.petsLoadCreator(mockPets);
            const result = petsReducer(state, action);
            expect(result).toEqual(mockPets);
        });
    });

    describe('When the action type is "pets@add"', () => {
        test('Then it should return the state with the data added', () => {
            state = [mockPet1];
            action = ac.petsAddCreator(mockPet2);
            const result = petsReducer(state, action);
            expect(result).toEqual([mockPet1, mockPet2]);
        });
    });

    describe('When the action type is "pets@update"', () => {
        test('Then it should return the state with th data updated', () => {
            const updatepet = {
                ...PET,
                name: 'Pepe',
                death: function (): void {
                    throw new Error('Function not implemented.');
                },
            };
            state = [PET, mockPet2];
            action = ac.petsUpdateCreator(updatepet);
            const result = petsReducer(state, action);
            expect(result).toEqual([updatepet, mockPet2]);
        });
    });

    describe('When the action type is "pets@delete"', () => {
        test('Then it should return the state without the data deleted', () => {
            state = [mockPet1];
            action = ac.petsDeleteCreator(mockPet1.id);
            const result = petsReducer(state, action);
            expect(result).toEqual([]);
        });
    });

    describe('When the action type is not valid', () => {
        test('Then it should return the state', () => {
            state = [];
            action = { type: 'Bad', payload: 'Test' };
            const result = petsReducer(state, action);
            expect(result).toEqual(state);
        });
    });
});
