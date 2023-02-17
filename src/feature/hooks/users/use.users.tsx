import { useReducer, useState } from 'react';
import { UserCredential } from 'firebase/auth';
import { ref, set } from '@firebase/database';
import { db } from '../../../core/firebase/config';
import { currentUserReducer } from '../../../core/reducers/users/current.reducer';
import * as ac from '../../../core/reducers/users/users.action.creator';
import { usersReducer } from '../../../core/reducers/users/users.reducer';
import { User } from '../../models/users.model';

export type useUsersType = {
    getAdmin: () => boolean;
    getStatus: () => Status;
    getUsers: () => Array<User>;
    getCurrentUser: () => User | object;
    handleAdmin: (uid: string) => void;
    handleCurrentUser: (user: User | object) => void;
    handleUser: (userCredentials: UserCredential) => void;
};

type Status = 'Starting' | 'Loading' | 'Loaded';

export function useUsers(): useUsersType {
    //const repo = useMemo(() => new UsersRepo(), []);
    const initialState: Array<User> = [];
    const initialUser: User | object = {};
    const initialStatus = 'Starting' as Status;
    const [users, setUsers] = useReducer(usersReducer, initialState);
    const [admin, setAdmin] = useState(false);
    const [status, setStatus] = useState(initialStatus);
    const [currentUser, dispatchCurrentUser] = useReducer(
        currentUserReducer,
        initialUser
    );

    const getCurrentUser = () => currentUser;
    const getUsers = () => users;
    const getStatus = () => status;
    const getAdmin = () => admin;
    const handleUser = async function (userCredentials: UserCredential) {
        const user = userCredentials.user;
        const fullUser = new User(
            user.displayName as string,
            user.email as string,
            await (user.getIdToken() as Promise<string>),
            user.uid
        );
        if (fullUser.uid !== 'ISxI8FSBlHhb5Gux7hEP007OVUp1') {
            set(ref(db, 'users/' + user.uid), fullUser);
        }
        handleCurrentUser(fullUser);
    };

    const handleAdmin = (uid: string) => {
        console.log('Este es el uid del admin' + uid);
        uid === 'ISxI8FSBlHhb5Gux7hEP007OVUp1'
            ? setAdmin(true)
            : setAdmin(false);
    };

    const handleCurrentUser = (user: User | object) => {
        dispatchCurrentUser(ac.setCurrentUser(user as User));
        handleAdmin((user as User).uid);
    };

    return {
        getCurrentUser,
        getAdmin,
        getStatus,
        getUsers,
        handleAdmin,
        handleCurrentUser,
        handleUser,
    };
}
