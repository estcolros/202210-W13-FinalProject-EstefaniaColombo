/* eslint-disable @typescript-eslint/no-empty-function */
import { UserCredential } from 'firebase/auth';
import { createContext } from 'react';
import { useUsersType } from '../../feature/hooks/users/use.users';
import { User } from '../../feature/models/users.model';

export type UserContextStructure = Omit<
    useUsersType,
    'getStatus' | 'getUsers' | 'getCurrentUser'
> & {
    users: Array<User>;
    currentUser: User | object;
};

export const initialContext: UserContextStructure = {
    users: [],
    currentUser: {},
    handleAdmin: (uid: string) => {},
    getAdmin: () => false,

    handleCurrentUser: () => {},
    handleUser: async (userCredentials: UserCredential) => {},
};

export const UserContext = createContext(initialContext);
