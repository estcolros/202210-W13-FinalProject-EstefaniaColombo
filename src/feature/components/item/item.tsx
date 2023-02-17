import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PetContext } from '../../../core/context/pets.context';
import { UserContext } from '../../../core/context/user.context';
import { Pet } from '../../models/pet.model';
import './item.scss';

export function Item({ item }: { item: Pet }) {
    const { handleLoad, handleDelete, handleFavourite } =
        useContext(PetContext);
    const { currentUser, users, getAdmin } = useContext(UserContext);

    function handleClickFavourite() {
        console.log('Favorito item');
        handleFavourite(item);
    }

    function handleClickDelete() {
        console.log('Eliminar item');
        handleDelete(item.id);
    }
    useEffect(() => {
        handleLoad();
    }, [handleLoad]);

    return (
        <li className="card" aria-label="list-item">
            <div
                className="card_image"
                style={{
                    backgroundImage: `url(${item.foto})`,
                }}
            >
                <img className="card_image" src={item.url} alt={''} />
                <p>Name: {item.title}</p>
                <p>Type: {item.especie}</p>
                <p>Sex: {item.sexo}</p>
                <p>Race: {item.raza}</p>

                {getAdmin() ? (
                    <div className="buttons">
                        <Link to={`/details/${item.id}`}>
                            <button className="buttons-item">
                                <span className="material-symbols-outlined">
                                    edit
                                </span>
                            </button>
                        </Link>
                        <button onClick={handleClickDelete}>
                            <span className="material-symbols-outlined">
                                delete_forever
                            </span>
                        </button>
                    </div>
                ) : (
                    <div className="buttons">
                        <Link to={`/details/${item.id}`}>
                            <button className="buttons-item">
                                <span className="material-symbols-outlined">
                                    visibility
                                </span>
                            </button>
                        </Link>

                        <button
                            className="buttons-item"
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
                    </div>
                )}
            </div>
        </li>
    );
}
