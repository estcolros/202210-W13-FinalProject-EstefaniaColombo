export class ZrgAPI {
    async getZrgAllPets() {
        const result = await await fetch(
            'https://www.zaragoza.es/sede/servicio/proteccion-animal.json?'
        );
        return result;
    }

    async getZrgIdPet() {
        const result = await (
            await fetch(
                'https://www.zaragoza.es/sede/servicio/proteccion-animal?fl=id&rf=html&start=0&rows=50'
            )
        ).json();

        return result.id;
    }

    async getZrgItemPet(id: number) {
        const result = await (
            await fetch(
                'https://www.zaragoza.es/sede/servicio/proteccion-animal?fl=id%2C%20title%2C%20sexo%2C%20especie%2C%20raza&rf=html&start=0&rows=50'
            )
        ).json();
        return result;
    }
}
