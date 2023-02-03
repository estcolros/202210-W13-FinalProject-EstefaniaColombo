export type PetsType = {
    id: string;
    title: string;
    foto: string;
    especie: string;
    raza: string;
    sexo: string;
    fechaNacimiento: string;
    tamagno: string;
    isFavourite: boolean;
};

export class Pet implements PetsType {
    // static generateId() {
    //     const aNumbers = new Uint32Array(1);
    //     window.crypto?.getRandomValues(aNumbers);
    //     return ('000000' + aNumbers[0]).slice(-6);
    // }

    // id: string;
    isFavourite: boolean;
    constructor(
        public id: string,
        public title: string,
        public foto: string,
        public especie: string,
        public raza: string,
        public sexo: string,
        public fechaNacimiento: string,
        public tamagno: string
    ) {
        // this.id = '';
        // this.title = '';
        // this.foto = '';
        // this.especie = '';
        // this.raza = '';
        // this.sexo = '';
        // this.fechaNacimiento = '';
        // this.tamagno = '';
        this.isFavourite = false;
    }
}

// export class PetsModel implements PetType {
//     id: string;
//     title: string;
//     foto: string;
//     especie: string;
//     raza: string;
//     sexo: string;
//     fechaNacimiento: string;
//     tamagno: string;
//     isFavourite: boolean;

//     constructor(public name: string, public url: string) {
//         this.id = '';
//         this.title = '';
//         this.foto = '';
//         this.especie = '';
//         this.raza = '';
//         this.sexo = '';
//         this.fechaNacimiento = '';
//         this.tamagno = '';
//         this.isFavourite = false;
//     }
// }
