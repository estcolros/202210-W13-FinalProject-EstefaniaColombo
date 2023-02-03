import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PetContext } from '../../../core/context/pets.context';
import { Pet, PetsType } from '../../models/pet.model';
import './details.scss';

const URLZRG = 'https://www.zaragoza.es/';

export function Details({
    item,
    handleUpdate,
}: {
    item: Pet;
    handleUpdate: (pet: Pet) => Promise<void>;
}) {
    const { pets, handleLoad } = useContext(PetContext);

    const initialFormData: Partial<PetsType> = {
        id: item?.id,
        title: item?.title,
        foto: item?.foto,
        especie: item?.especie,
        raza: item?.raza,
        sexo: item?.sexo,
        fechaNacimiento: item?.fechaNacimiento,
        tamagno: item?.tamagno,
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleInput = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        setFormData({ ...formData, [element.name]: element.value });
    };

    const handleSubmit = (ev: SyntheticEvent) => {
        console.log('SAVED PET');
        ev.preventDefault();
        handleUpdate(formData as Pet);
        setFormData(initialFormData);
    };

    useEffect(() => {
        const petsDetails = {
            id: item?.id,
            title: item?.title,
            foto: item?.foto,
            especie: item?.especie,
            raza: item?.raza,
            sexo: item?.sexo,
            fechaNacimiento: item?.fechaNacimiento,
            tamagno: item?.tamagno,
        };
        setFormData(petsDetails);
    }, [item]);
    return (
        <section className="cards">
            <form className="card" onSubmit={handleSubmit}>
                <h2>Pet ID: {item.id}</h2>

                <div
                    className="card_image"
                    style={{
                        backgroundImage: `url(${URLZRG + item.foto})`,
                    }}
                ></div>
                <div>
                    <label htmlFor="title">Name: </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Name of robot"
                        value={formData.title}
                        onInput={handleInput}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="especie">Type: </label>
                    <input
                        type="text"
                        name="especie"
                        id="especie"
                        value={formData.especie}
                        onInput={handleInput}
                        placeholder="Type of the pet:"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="tamagno">Size: </label>
                    <input
                        type="text"
                        name="tamagno"
                        id="tamagno"
                        value={formData.tamagno}
                        onInput={handleInput}
                        placeholder="Size of the pet"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="sexo">Sex: </label>
                    <input
                        type="text"
                        name="sexo"
                        id="sexo"
                        value={formData.sexo}
                        onInput={handleInput}
                        placeholder="Sex of the pet"
                        required
                    />
                </div>
                <div>
                    <button className="btn-edit" type="submit">
                        <Link to={`/adopt/`}> Close</Link>
                    </button>
                    <button className="btn-edit" type="submit">
                        Save
                    </button>
                </div>
            </form>
        </section>
    );
}
