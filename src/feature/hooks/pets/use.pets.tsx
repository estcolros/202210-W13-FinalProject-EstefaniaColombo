import { useCallback, useMemo, useReducer, useState } from 'react';
import * as ac from '../../../core/reducers/action.creators';
import { petsReducer } from '../../../core/reducers/pets.reducer';
import { consoleDebug } from '../../../tools/debug';
import { PetsType } from '../../models/pet.model';
import { PetsRepository } from '../../services/repository/pets.repo';

export type UsePets = {
    getStatus: () => Status;
    getPets: () => Array<PetsType>;
    handleLoad: () => Promise<void>;
    handleAdd: (pets: PetsType) => Promise<void>;
    handleUpdate: (petsPayload: Partial<PetsType>) => Promise<void>;
    handleDelete: (id: PetsType['id']) => Promise<void>;
    handleFavourite: (pet: Partial<PetsType>) => Promise<void>;
};
type Status = 'Starting' | 'Loading' | 'Loaded';

export function usePets(): UsePets {
    const repo = useMemo(() => new PetsRepository(), []);

    const initialState: Array<PetsType> = [];
    const initialStatus = 'Starting' as Status;
    //const [pets, setPets] = useReducer(petsReducer, initialState);

    const [status, setStatus] = useState(initialStatus);

    const [pets, setPets] = useState(initialState);

    const getPets = () => pets;
    const getStatus = () => status;

    const handleLoad = useCallback(async () => {
        try {
            setStatus('Loading');
            const data = await repo.load();
            setPets(data);
            setStatus('Loaded');
        } catch (error) {
            handleError(error as Error);
        }
    }, [repo]);

    const handleAdd = async function (pet: PetsType) {
        try {
            setPets([...pets, pet]);
            await repo.create(pet);
        } catch (error) {
            handleError(error as Error);
        }
    };

    const handleUpdate = async function (petsPayload: Partial<PetsType>) {
        try {
            setPets(
                pets.map((item) =>
                    item.id === petsPayload.id
                        ? { ...item, ...petsPayload }
                        : item
                )
            );
            await repo.update(petsPayload);
        } catch (error) {
            handleError(error as Error);
        }
    };

    const handleDelete = async function (id: PetsType['id']) {
        try {
            setPets(pets.filter((item) => item.id !== id));
            await repo.delete(id);
        } catch (error) {
            handleError(error as Error);
        }
    };

    const handleFavourite = async function (petsPayload: Partial<PetsType>) {
        try {
            petsPayload.isFavourite = !petsPayload.isFavourite;
            setPets(
                pets.map((item) =>
                    item.id === petsPayload.id
                        ? { ...item, ...petsPayload }
                        : item
                )
            );
            await repo.update(petsPayload);
        } catch (error) {
            handleError(error as Error);
        }
    };

    const handleError = (error: Error) => {
        consoleDebug(error.message);
    };

    return {
        getStatus,
        getPets,
        handleLoad,
        handleAdd,
        handleUpdate,
        handleDelete,
        handleFavourite,
    };
}
