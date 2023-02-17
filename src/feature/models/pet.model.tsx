import { PetType } from '../../core/components/types/pets';
export class Pet implements PetType {
    id: string;
    title: string;
    foto: string;
    especie: string;
    raza: string;
    sexo: string;
    fechaNacimiento: string;
    tamagno: string;
    isFavourite: boolean;

    constructor(public name: string, public url: string) {
        this.id = '';
        this.title = '';
        this.foto = '';
        this.especie = '';
        this.raza = '';
        this.sexo = '';
        this.fechaNacimiento = '';
        this.tamagno = '';
        this.isFavourite = false;
    }
}
