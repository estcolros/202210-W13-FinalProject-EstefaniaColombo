import { User } from '../../../feature/models/users.model';
import { usersAction } from './users.action.creator';
import { userActionTypes } from './users.action.types';
export function usersReducer(
    state: Array<User>,
    action: usersAction
): Array<User> {
    switch (action.type) {
        case userActionTypes.load:
            return action.payload as Array<User>;

        case userActionTypes.add:
            return [...(state as Array<User>), action.payload as User];
        case userActionTypes.update:
            const updatePet = action.payload as User;
            return (state as Array<User>).map((item) =>
                item.uid === updatePet.uid ? updatePet : item
            );
        case userActionTypes.delete:
            const finalId = action.payload as User['uid'];
            return state.filter((item) => item.uid !== finalId);
        default:
            return [...state];
    }
}
