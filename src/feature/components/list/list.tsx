import { useContext, useEffect } from 'react';
import { PetContext } from '../../../core/context/pets.context';
import { Item } from '../item/item';
import './list.scss';

export function List() {
    const { pets, handleLoad } = useContext(PetContext);

    useEffect(() => {
        handleLoad();
    }, [handleLoad]);

    return (
        <>
            {/* <Add></Add> */}

            <h3>List of pets</h3>
            {!pets.length ? (
                <p>Loading ....</p>
            ) : (
                <ul className="cards">
                    {pets.map((item) => {
                        return <Item key={item.id} item={item} />;
                    })}
                </ul>
            )}
        </>
    );
}
