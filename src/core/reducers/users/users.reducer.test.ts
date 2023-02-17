import { usersAction } from './users.action.creator';
import * as ac from './users.action.creator';
import { usersReducer } from './users.reducer';
import {
    mockUser1,
    mockUser2,
    mockUsers,
} from '../../../feature/hooks/users/testing.mock';
import { User } from '../../../feature/models/users.model';
import { USER } from '../../../feature/data/usermock';

describe('Given the reducer', () => {
    let state: Array<User>;
    let action: usersAction;

    describe('When the action type is "users@load"', () => {
        test('Then it should return as state the loaded data', () => {
            state = [];
            action = ac.usersLoadCreator(mockUsers);
            const result = usersReducer(state, action);
            expect(result).toEqual(mockUsers);
        });
    });

    describe('When the action type is "users@add"', () => {
        test('Then it should return the state with the data added', () => {
            state = [mockUser1];
            action = ac.usersAddCreator(mockUser2);
            const result = usersReducer(state, action);
            expect(result).toEqual([mockUser1, mockUser2]);
        });
    });

    describe('When the action type is "users@update"', () => {
        test('Then it should return the state with th data updated', () => {
            const updateUser = {
                ...USER,
                name: 'Pepe',
                death: function (): void {
                    throw new Error('Function not implemented.');
                },
            };
            state = [USER, mockUser2];
            action = ac.usersUpdateCreator(updateUser);
            const result = usersReducer(state, action);
            expect(result).toEqual([updateUser, mockUser2]);
        });
    });

    describe('When the action type is "users@delete"', () => {
        test('Then it should return the state without the data deleted', () => {
            state = [mockUser1];
            action = ac.usersDeleteCreator(mockUser1.uid);
            const result = usersReducer(state, action);
            expect(result).toEqual([]);
        });
    });

    describe('When the action type is not valid', () => {
        test('Then it should return the state', () => {
            state = [];
            action = { type: 'Bad', payload: 'Test' };
            const result = usersReducer(state, action);
            expect(result).toEqual(state);
        });
    });
});
