import { UserType } from '../../core/components/types/users';
import { Pet } from './pet.model';

export class User implements UserType {
    constructor(
        public name: string,
        public email: string,
        public token: string,
        public uid: string
    ) {
        this.name = '';
        this.email = '';
        this.token = '';
        this.uid = '';
    }
    favourites!: Pet[];
}
