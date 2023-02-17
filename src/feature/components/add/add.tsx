/* eslint-disable @typescript-eslint/no-unused-vars */
import { SyntheticEvent, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { PetContext } from '../../../core/context/pets.context';
import {
    getUrlsFromStorage,
    saveImageInStorage,
} from '../../../core/services/repository/storage';
import { Pet } from '../../models/pet.model';
import './add.scss';

export function Add() {
    const { handleAdd } = useContext(PetContext);

    const initialFormData: Pet = {
        id: '',
        title: '',
        foto: '',
        especie: '',
        raza: '',
        sexo: '',
        fechaNacimiento: '',
        tamagno: '',
        isFavourite: false,
        url: '',
        name: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [uploadedImagerUrl, setuploadedImagerUrl] = useState('');

    const handleInput = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        setFormData({ ...formData, [element.name]: element.value });
    };

    const handleSubmit = async (ev: SyntheticEvent) => {
        ev.preventDefault();
        handleAdd(formData);
        setFormData(initialFormData);
        setuploadedImagerUrl('');
    };

    const handleUploadImage = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        let file: File | null = null;
        try {
            if (!event.target.files) return;
            file = event.target.files[0];

            await saveImageInStorage(file, 'images/', file.name);
            const url = await getUrlsFromStorage('images/', file.name);

            setuploadedImagerUrl(url as string);
            setFormData({
                ...formData,
                foto: url as string,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section>
            <h3>ADD PET </h3>

            <form className="add-pets__form" onSubmit={handleSubmit}>
                <h2>Information Pet</h2>

                <div>
                    <label htmlFor="foto">Imagen</label>
                    <input
                        id="url"
                        name="url"
                        type="file"
                        onChange={handleUploadImage}
                        required
                    />
                </div>
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
                    <label htmlFor="raza">Race</label>
                    <input
                        type="text"
                        name="raza"
                        id="raza"
                        placeholder="Write a race"
                        value={formData?.raza}
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
                    />
                </div>

                <div>
                    <label htmlFor="fechaNacimiento">Birth</label>
                    <input
                        type="text"
                        name="fechaNacimiento"
                        id="fechaNacimiento"
                        placeholder="Write a birth"
                        value={formData.fechaNacimiento}
                        onInput={handleInput}
                    />
                </div>

                <button className="btn_add_pet" type="submit">
                    <span className="material-symbols-outlined">
                        add_circle
                    </span>
                </button>

                <Link to={`/adopt/`}>
                    <button className="buttons-item_details" type="submit">
                        <span className="material-symbols-outlined">
                            arrow_back
                        </span>
                    </button>
                </Link>
            </form>
        </section>
    );
}
