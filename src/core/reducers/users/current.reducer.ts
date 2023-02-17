import { User } from '../../../feature/models/users.model';
import { usersAction } from './users.action.creator';
import { userActionTypes } from './users.action.types';
export function currentUserReducer(
    state: User | object,
    action: usersAction
): User | object {
    switch (action.type) {
        case userActionTypes.setCurrent:
            const currentUser = action.payload as User;
            return { ...state, ...currentUser };
        default:
            return state;
    }
}
