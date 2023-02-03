export type UserType = {
    id: string;
    name: string;
    email: string;
    password: string;
    isFavourite: boolean;
};

export class User implements UserType {
    static generateId() {
        const aNumbers = new Uint32Array(1);
        window.crypto?.getRandomValues(aNumbers);
        return ('000000' + aNumbers[0]).slice(-6);
    }

    id: string;
    isFavourite: boolean;
    constructor(
        public name: string,
        public email: string,
        public password: string
    ) {
        this.id = User.generateId();
        this.isFavourite = false;
    }
}

export type PetsLikedStructure = {
    favouritePets: Array<string>;
};
