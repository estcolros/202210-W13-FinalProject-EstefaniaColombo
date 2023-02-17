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
                <ul className="pet-list">
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
