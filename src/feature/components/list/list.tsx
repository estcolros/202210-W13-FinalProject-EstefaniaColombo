import { useContext, useEffect } from 'react';
import { PetContext } from '../../../core/context/pets.context';
import { usePets } from '../../hooks/pets/use.pets';
import { Pet } from '../../models/pet.model';
import { Add } from '../add/add';
import { Item } from '../item/item';
import './list.scss';

export function List() {
    const { pets, handleLoad, handleAdd } = useContext(PetContext);

    useEffect(() => {
        handleLoad();
    }, [handleLoad]);

    return (
        <>
            <Add></Add>

            <h3>List of pets</h3>
            {!pets.length ? (
                <p>Loading ....</p>
            ) : (
                <ul className="cards">
                    {pets.map((item: Pet) => {
                        return <Item key={item.id} item={item} />;
                    })}
                </ul>
            )}
        </>
    );
}
