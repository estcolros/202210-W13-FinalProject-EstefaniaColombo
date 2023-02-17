import { useContext, useEffect } from 'react';
import { PetContext } from '../../../core/context/pets.context';
import { Item } from '../../components/item/item';
import './favourites.page.scss';

export default function FavouritesPage() {
    const { pets, handleLoad } = useContext(PetContext);

    useEffect(() => {
        handleLoad();
    }, [handleLoad]);

    return (
        <>
            <h2>My favorites pets</h2>
            {!pets.length ? (
                <p>Loading ....</p>
            ) : (
                // {/* <h4>Actualmente no tienes mascotas favoritas</h4>
                // <img
                //     src={require('./fav.png')}
                //     alt="error"
                //     width="550"
                //     height="550"
                // /> */}
                <ul className="pets-list">
                    {pets
                        .filter((item) => item.isFavourite)
                        .map((item) => {
                            return <Item key={item.id} item={item}></Item>;
                        })}
                </ul>
            )}
        </>
    );
}
