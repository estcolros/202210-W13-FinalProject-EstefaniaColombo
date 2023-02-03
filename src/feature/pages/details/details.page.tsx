/* eslint-disable array-callback-return */
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PetContext } from '../../../core/context/pets.context';
import { Details } from '../../components/details/details';
import { usePets } from '../../hooks/pets/use.pets';

export function DetailsPage() {
    const { pets, handleLoad, handleUpdate } = useContext(PetContext);

    useEffect(() => {
        handleLoad();
    }, [handleLoad]);

    const itemId = useParams();

    return (
        <>
            <h2>Pet details</h2>

            <section className="pets-list">
                <div className="pet-item">
                    {pets.map((item) => {
                        // console.log(item.petInfo.id);
                        // console.log(itemId.petId);
                        console.log('petinfo' + item.id);
                        console.log('petid' + itemId.petId);
                        if (item.id === itemId.petId) {
                            console.log('Si entra en la condicion');
                            return (
                                <Details
                                    key={item.id}
                                    item={item}
                                    handleUpdate={handleUpdate}
                                ></Details>
                            );
                        }
                    })}{' '}
                </div>
            </section>
        </>
    );
}
