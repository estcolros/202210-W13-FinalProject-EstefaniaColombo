import { useMemo } from 'react';
import { usePets } from '../../feature/hooks/pets/use.pets';
import { PetContext } from './pets.context';

export function PetContextProvider({ children }: { children: JSX.Element }) {
    const {
        getPets,
        handleLoad,
        handleAdd,
        handleDelete,
        handleUpdate,
        handleFavourite,
    } = usePets();

    const context = useMemo(
        () => ({
            pets: getPets(),
            handleLoad,
            handleAdd,
            handleDelete,
            handleUpdate,
            handleFavourite,
        }),
        [
            getPets,
            handleLoad,
            handleAdd,
            handleDelete,
            handleUpdate,
            handleFavourite,
        ]
    );

    return (
        <PetContext.Provider value={context}>{children}</PetContext.Provider>
    );
}
