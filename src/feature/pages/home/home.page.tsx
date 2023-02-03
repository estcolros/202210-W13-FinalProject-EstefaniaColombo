import { Link } from 'react-router-dom';

export default function HomePage() {
    // const pets = JSON.parse(sessionStorage.getItem('pets') as string);
    return (
        <>
            <h2>Every Pet Deserves a Loving Home. Adopt a Pet Today</h2>
            <p>
                Browse our available animals and learn more about the adoption
                process. Together, we can rescue, rehabilitate, and rehome pets
                in need. Thank you for supporting our mission to bring joy to
                families through pet adoption.
            </p>
            {/* <p>THERE ARE CURRENTLY {pets ? pets : 0} HOMELESS ANIMALS</p> */}
            {/* <p>{pets ? <img src={srcImage} alt="" /> : ''}</p> */}
            <Link to={'/adopt'}>
                <button className="btn">Discover the pets</button>
            </Link>
        </>
    );
}
