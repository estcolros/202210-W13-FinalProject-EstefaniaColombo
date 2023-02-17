/* eslint-disable @typescript-eslint/no-unused-vars */
import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PetContext } from '../../../core/context/pets.context';
import { UserContext } from '../../../core/context/user.context';
import {
    getUrlsFromStorage,
    saveImageInStorage,
} from '../../../core/services/repository/storage';
import { Pet } from '../../models/pet.model';
import './details.scss';

export function Details({
    item,
    handleUpdate,
}: {
    item: Pet;
    handleUpdate: (pet: Pet) => Promise<void>;
}) {
    const { handleFavourite } = useContext(PetContext);
    const { getAdmin } = useContext(UserContext);

    const initialFormData: Partial<Pet> = {
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
    const [uploadedImagerUrl, setuploadedImagerUrl] = useState('');

    const handleInput = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        setFormData({ ...formData, [element.name]: element.value });
    };

    const handleSubmit = (ev: SyntheticEvent) => {
        ev.preventDefault();
        handleUpdate(formData as Pet);
        setFormData(initialFormData);
    };

    function handleClickFavourite() {
        handleFavourite(item);
    }

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
            url: item?.url,
            name: item?.name,
        };
        setFormData(petsDetails);
    }, [item]);

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
        <>
            <h3>Get to know your future pet better</h3>

            <section className="cards_details_admin">
                {getAdmin() ? (
                    <form
                        className="card_details_admin"
                        onSubmit={handleSubmit}
                    >
                        <h3>Pet ID: {item.id}</h3>

                        <div
                            className="card_image_details_admin"
                            style={{
                                backgroundImage: `url(${item.foto})`,
                            }}
                        >
                            <img
                                className="card_image_details_admin"
                                src={item.url}
                                alt={''}
                            />
                        </div>
                        <br />
                        <div>
                            <label htmlFor="card_image_change_admin">
                                Imagen
                            </label>
                            <input
                                id="foto"
                                name="foto"
                                type="file"
                                onChange={handleUploadImage}
                            />
                        </div>

                        <div>
                            <label htmlFor="title">Name </label>
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
                            <label htmlFor="especie">Type </label>
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
                            <label htmlFor="sexo">Sex </label>
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
                            <label htmlFor="raza">Race </label>
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
                            <label htmlFor="tamagno">Size </label>
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
                            <label htmlFor="fechaNacimiento">Birth </label>
                            <input
                                type="text"
                                name="fechaNacimiento"
                                id="fechaNacimiento"
                                placeholder="Write a birth"
                                value={formData.fechaNacimiento}
                                onInput={handleInput}
                            />
                        </div>
                        <div>
                            <Link to={`/adopt/`}>
                                <button
                                    className="buttons-item_details_admin"
                                    type="submit"
                                >
                                    <span className="material-symbols-outlined">
                                        close
                                    </span>
                                </button>
                            </Link>

                            <button
                                className="buttons-item_details_admin"
                                type="submit"
                            >
                                <span className="material-symbols-outlined">
                                    save
                                </span>
                            </button>
                        </div>
                    </form>
                ) : (
                    <form className="card_details" onSubmit={handleSubmit}>
                        <h2>{item.title}</h2>
                        <div
                            className="card_image_details"
                            style={{
                                backgroundImage: `url(${item.foto})`,
                            }}
                        >
                            <img
                                className="card_image_details"
                                src={item.url}
                                alt={''}
                            />
                        </div>
                        <p>Type: {formData.especie}</p>
                        <p>Race: {formData.raza}</p>
                        <p>Sex: {formData.sexo}</p>
                        <p>Size: {formData.tamagno}</p>
                        <p>Birth: {formData.fechaNacimiento}</p>
                        <button
                            className="buttons-item_details"
                            onClick={handleClickFavourite}
                        >
                            {item.isFavourite ? (
                                <span className="material-symbols-outlined">
                                    heart_plus
                                </span>
                            ) : (
                                <span className="material-symbols-outlined">
                                    heart_minus
                                </span>
                            )}
                        </button>

                        <Link to={`/adopt/`}>
                            <button
                                className="buttons-item_details"
                                type="submit"
                            >
                                <span className="material-symbols-outlined">
                                    arrow_back
                                </span>
                            </button>
                        </Link>
                    </form>
                )}
            </section>
        </>
    );
}
