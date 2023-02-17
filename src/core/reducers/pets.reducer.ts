import { Pet } from '../../feature/models/pet.model';
import { petsAction } from './pets.action.creators';
import { petsActionTypes } from './pets.action.types';

export function petsReducer(state: Array<Pet>, action: petsAction): Array<Pet> {
    switch (action.type) {
        case petsActionTypes.load:
            return action.payload as Array<Pet>;
        case petsActionTypes.add:
            return [...(state as Array<Pet>), action.payload as Pet];
        case petsActionTypes.update:
            const updatePetwork = action.payload as Pet;
            return (state as Array<Pet>).map((item) =>
                item.id === updatePetwork.id ? updatePetwork : item
            );
        case petsActionTypes.delete:
            const finalId = action.payload as Pet['id'];
            return state.filter((item) => item.id !== finalId);
        default:
            return [...state];
    }
}
