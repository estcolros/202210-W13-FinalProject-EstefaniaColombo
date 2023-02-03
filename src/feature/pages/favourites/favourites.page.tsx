import { useContext, useEffect } from 'react';
import { PetContext } from '../../../core/context/pets.context';
import { Item } from '../../components/item/item';
import { usePets } from '../../hooks/pets/use.pets';

export default function FavouritesPage() {
    const { pets, handleLoad, handleUpdate, handleDelete, handleAdd } =
        useContext(PetContext);

    useEffect(() => {
        handleLoad();
    }, [handleLoad]);

    return (
        <>
            <h2>My favourites pets</h2>
            {!pets.length ? (
                <p>Loading ....</p>
            ) : (
                <ul className="robots-list">
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
