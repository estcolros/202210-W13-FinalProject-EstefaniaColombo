/* eslint-disable array-callback-return */
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PetContext } from '../../../core/context/pets.context';
import { Details } from '../../components/details/details';

export function DetailsPage() {
    const { pets, handleLoad, handleUpdate } = useContext(PetContext);

    useEffect(() => {
        handleLoad();
    }, [handleLoad]);

    const itemId = useParams();

    return (
        <>
            <h2>Pet details</h2>

            <section className="pet-details">
                {pets.map((item) => {
                    if (item.id === itemId.petId) {
                        return (
                            <Details
                                key={item.id}
                                item={item}
                                handleUpdate={handleUpdate}
                            ></Details>
                        );
                    }
                })}{' '}
            </section>
        </>
    );
}
