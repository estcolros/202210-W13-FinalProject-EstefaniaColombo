import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/user.context';
import './header.scss';

export function Header({ children }: { children: JSX.Element }) {
    const { currentUser, handleCurrentUser } = useContext(UserContext);

    const title = 'PetAdopt';

    const navigate = useNavigate();

    const handleClick = () => {
        if (Object.keys(currentUser).length === 0) {
            navigate('/login');
            return;
        }
        handleCurrentUser({});
    };
    return (
        <header>
            <h1>{title}</h1>
            {children}
            <button onClick={handleClick}>
                {Object.keys(currentUser).length === 0 ? 'Log in' : 'Log out'}
            </button>
        </header>
    );
}
