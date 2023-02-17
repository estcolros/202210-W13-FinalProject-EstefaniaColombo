import { useMemo } from 'react';
import { useUsers } from '../../feature/hooks/users/use.users';
import { UserContext } from './user.context';

export function UserContextProvider({ children }: { children: JSX.Element }) {
    const {
        getCurrentUser,
        handleAdmin,
        getAdmin,
        getUsers,
        handleCurrentUser,
        handleUser,
    } = useUsers();

    const context = useMemo(
        () => ({
            users: getUsers(),
            currentUser: getCurrentUser(),
            getAdmin,
            handleAdmin,
            handleCurrentUser,
            handleUser,
        }),
        [
            getCurrentUser,
            handleAdmin,
            getUsers,
            getAdmin,
            handleCurrentUser,
            handleUser,
        ]
    );

    return (
        <UserContext.Provider value={context}>{children}</UserContext.Provider>
    );
}
