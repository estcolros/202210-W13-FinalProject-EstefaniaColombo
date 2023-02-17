import { usersAction } from './users.action.creator';
import * as ac from './users.action.creator';
import { currentUserReducer } from './current.reducer';
import { mockUser1 } from '../../../feature/hooks/users/testing.mock';
import { User } from '../../../feature/models/users.model';

describe('Given the reducer', () => {
    let state: User | object;
    let action: usersAction;
    describe('When the action type is "users@setCurrent"', () => {
        test('Then it should return the state with the data added', () => {
            state = {};
            action = ac.setCurrentUser(mockUser1);
            const result = currentUserReducer(state, action);
            expect(result).toEqual(mockUser1);
        });
    });

    describe('When the action type is not valid', () => {
        test('Then it should return the state', () => {
            state = {};
            action = { type: 'Bad', payload: 'Test' };
            const result = currentUserReducer(state, action);
            expect(result).toEqual(state);
        });
    });
});
