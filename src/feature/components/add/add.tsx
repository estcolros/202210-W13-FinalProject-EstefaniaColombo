import { SyntheticEvent, useContext, useState } from 'react';
import { PetContext } from '../../../core/context/pets.context';
import { Pet, PetsType } from '../../models/pet.model';

export function Add() {
    const { handleAdd } = useContext(PetContext);

    const initialFormData: PetsType = {
        id: '',
        title: '',
        foto: '',
        especie: '',
        raza: '',
        sexo: '',
        fechaNacimiento: '',
        tamagno: '',
        isFavourite: false,
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleInput = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        setFormData({ ...formData, [element.name]: element.value });
    };

    const handleSubmit = (ev: SyntheticEvent) => {
        ev.preventDefault();
        formData.foto = `${formData.title}`;
        handleAdd(
            new Pet(
                formData.id as string,
                formData.title as string,
                formData.foto as string,
                formData.especie as string,
                formData.raza as string,
                formData.sexo as string,
                formData.fechaNacimiento as string,
                formData.tamagno as string
            )
        );
        setFormData(initialFormData);
    };

    return (
        <section className="add-robots">
            <h3>Add Pet</h3>
            <form className="add-robot__form" onSubmit={handleSubmit}>
                <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/png, image/jpeg"
                />
                <img src="" alt="" width="250" />
                <div>
                    <label htmlFor="title">Name</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Write a name"
                        value={formData.title}
                        onInput={handleInput}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="especie">Type</label>
                    <input
                        type="text"
                        name="especie"
                        id="especie"
                        placeholder="Write a type"
                        value={formData.especie}
                        onInput={handleInput}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="tamagno">Size</label>
                    <input
                        type="text"
                        name="tamagno"
                        id="tamagno"
                        placeholder="Write a size"
                        value={formData.tamagno}
                        onInput={handleInput}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="sexo">Sex</label>
                    <input
                        type="text"
                        name="sexo"
                        id="sexo"
                        placeholder="Write a sex"
                        value={formData.sexo}
                        onInput={handleInput}
                        required
                    />
                </div>

                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
        </section>
    );
}
