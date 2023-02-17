import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PetContext } from '../../../core/context/pets.context';
import './home.page.scss';

export default function HomePage() {
    const { pets, handleLoad } = useContext(PetContext);

    useEffect(() => {
        handleLoad();
    }, [handleLoad]);

    return (
        <>
            <h2>Every Pet Deserves a Loving Home. Adopt a Pet Today</h2>

            <p className="homepage">
                Browse our available animals and learn more about the adoption
                process. Together, we can rescue, rehabilitate, and rehome pets
                in need.
            </p>

            <p className="homepage">
                Thank you for supporting our mission to bring joy to families
                through pet adoption.
            </p>

            <div>
                <img
                    className="adopt_pet"
                    src={require('./hompage.png')}
                    alt="error"
                    width="950"
                    height="500"
                />
            </div>

            <p>
                THERE ARE CURRENTLY
                <span className="numPets"> {pets.length} </span> HOMELESS
                ANIMALS
            </p>

            <Link to={'/adopt'}>
                <button className="discover">Discover the pets</button>
            </Link>
        </>
    );
}
