import { useCallback, useMemo, useReducer, useState } from 'react';
import * as ac from '../../../core/reducers/pets.action.creators';
import { petsReducer } from '../../../core/reducers/pets.reducer';
import { consoleDebug } from '../../../tools/debug';
import { Pet } from '../../models/pet.model';

import { PetsRepository } from '../../services/repository/pets.repo';

export type UsePets = {
    getStatus: () => Status;
    getPets: () => Array<Pet>;
    handleLoad: () => Promise<void>;
    handleAdd: (pets: Pet) => Promise<void>;
    handleUpdate: (petsPayload: Partial<Pet>) => Promise<void>;
    handleDelete: (id: Pet['id']) => Promise<void>;
    handleFavourite: (pet: Partial<Pet>) => Promise<void>;
};
type Status = 'Starting' | 'Loading' | 'Loaded';

export function usePets(): UsePets {
    const repo = useMemo(() => new PetsRepository(), []);

    const initialState: Array<Pet> = [];
    const initialStatus = 'Starting' as Status;

    const [status, setStatus] = useState(initialStatus);

    const [pets, setPets] = useReducer(petsReducer, initialState);

    const getPets = () => pets;
    const getStatus = () => status;

    const handleLoad = useCallback(async () => {
        try {
            setStatus('Loading');
            const data = await repo.load();
            setPets(ac.petsLoadCreator(data));
            setStatus('Loaded');
        } catch (error) {
            handleError(error as Error);
        }
    }, [repo]);

    const handleAdd = async function (pet: Pet) {
        try {
            setStatus('Starting');

            const fullPets = await repo.create(pet);
            setPets(ac.petsAddCreator(fullPets));
            setStatus('Loaded');
        } catch (error) {
            handleError(error as Error);
        }
    };

    const handleUpdate = async function (petsPayload: Partial<Pet>) {
        try {
            const updatePets = await repo.update(petsPayload);
            setPets(ac.petsUpdateCreator(updatePets));
        } catch (error) {
            handleError(error as Error);
        }
    };

    const handleDelete = async function (id: Pet['id']) {
        try {
            const deletePets = await repo.delete(id);
            setPets(ac.petsDeleteCreator(deletePets));
        } catch (error) {
            handleError(error as Error);
        }
    };

    const handleFavourite = async function (petsPayload: Partial<Pet>) {
        try {
            petsPayload.isFavourite = !petsPayload.isFavourite;

            const FavPets = await repo.update(petsPayload);
            setPets(ac.petsUpdateCreator(FavPets));
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
