import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PetContext } from '../../../core/context/pets.context';
import { Pet, PetsType } from '../../models/pet.model';
import './item.scss';

const URLZRG = 'https://www.zaragoza.es/';
export function Item({ item }: { item: Pet }) {
    const { handleLoad, handleDelete, handleUpdate, handleFavourite } =
        useContext(PetContext);

    useEffect(() => {
        handleLoad();
    }, [handleLoad]);

    function handleClickFavourite() {
        console.log('Favorito item');
        handleFavourite(item);
    }
    function handleClickDelete() {
        console.log('Eliminar item');
        handleDelete(item.id);
    }
    return (
        <li className="card" aria-label="list-item">
            {/* <div className="card">
                <img
                    className="card_image"
                    src={URLZRG + item.petInfo?.foto}
                    alt={item.petInfo?.id}
                />
            </div> */}

            <div
                className="card_image"
                style={{
                    backgroundImage: `url(${URLZRG + item.foto})`,
                }}
            ></div>

            <p>
                Name: <span>{item.title}</span>
            </p>
            <p>
                Type: <span>{item.especie}</span>
            </p>
            <p>
                Sex: <span>{item.sexo}</span>
            </p>
            <p>
                Race: <span>{item.raza}</span>
            </p>

            <div className="buttons-item">
                <Link to={`/details/${item.id}`}>
                    <button className="buttons-item">
                        <span className="material-symbols-outlined">edit</span>
                    </button>
                </Link>

                <button className="buttons-item" onClick={handleClickFavourite}>
                    {item.isFavourite ? (
                        <span className="material-symbols-outlined">
                            heart_broken
                        </span>
                    ) : (
                        <span className="material-symbols-outlined">
                            favorite
                        </span>
                    )}
                </button>

                {/* <button className="button-delete" onClick={handleClickDelete}>
                    <span className="material-symbols-outlined">delete</span>
                </button> */}

                <button onClick={handleClickDelete}>Eliminar</button>
            </div>
        </li>
    );
}
