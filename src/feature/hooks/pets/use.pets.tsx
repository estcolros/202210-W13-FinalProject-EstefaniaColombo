import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import {
    SyntheticEvent,
    useCallback,
    useMemo,
    useReducer,
    useState,
} from 'react';
import { v4 } from 'uuid';
import { storage } from '../../../core/firebase/config';
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
    handleFile: (ev: SyntheticEvent) => void;
};
type Status = 'Starting' | 'Loading' | 'Loaded';

export function usePets(): UsePets {
    const repo = useMemo(() => new PetsRepository(), []);

    const initialState: Array<Pet> = [];
    const initialStatus = 'Starting' as Status;

    //const [pets, setPets] = useReducer(petsReducer, initialState);
    // const [formData, setFormData] = useState('');

    const [status, setStatus] = useState(initialStatus);

    const [pets, setPets] = useReducer(petsReducer, initialState);

    const getPets = () => pets;
    const getStatus = () => status;

    const handleLoad = useCallback(async () => {
        try {
            setStatus('Loading');
            const data = await repo.load();
            setPets(ac.petsLoadCreator(data));
            //setPets(data);
            setStatus('Loaded');
        } catch (error) {
            handleError(error as Error);
        }
    }, [repo]);

    // const handleAdd = async function (pet: Pet) {
    //     try {
    //         const addPets = await repo.create(pet);
    //         setPets(ac.petsAddCreator(addPets));
    //     } catch (error) {
    //         handleError(error as Error);
    //     }
    // };

    const handleAdd = async function (pet: Pet) {
        try {
            setStatus('Starting');

            const fullArtworks = await repo.create(pet);
            setPets(ac.petsAddCreator(fullArtworks));
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

    const handleFile = async (event: SyntheticEvent) => {
        event.preventDefault();
        const element = event.target as HTMLInputElement;

        if (!element.files) {
            alert('Any file selectec');
            return;
        }
        const input = element.files[0];

        const petRef = await ref(storage, 'images/' + v4());
        console.log(petRef);

        const upload = await uploadBytes(petRef, input);
        console.log(upload);

        const url = await getDownloadURL(petRef);
        console.log(url);
        const petData = await new Pet(input.name, url);
        console.log('petdata' + petData);

        // handleAdd(petData);
        // handleUpdate(petData);
    };

    return {
        getStatus,
        getPets,
        handleLoad,
        handleAdd,
        handleUpdate,
        handleDelete,
        handleFavourite,
        handleFile,
    };
}
