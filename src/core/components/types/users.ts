import { Pet } from '../../../feature/models/pet.model';
import { User } from '../../../feature/models/users.model';

export type UserType = {
    name: string;
    email: string;
    token: string;
    uid: string;
    favourites: Array<Pet>;
};

export type UserCollection = {
    [key: string]: User;
};
