import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PetContext } from '../../context/pets.context';
import { UserContext } from '../../context/user.context';
import { login, loginWithGoogle } from '../../firebase/config';
import './login.scss';

export function Login() {
    const { handleAdmin, handleUser } = useContext(UserContext);
    const { handleLoad } = useContext(PetContext);
    const navigate = useNavigate();

    const initialFormData = {
        email: '',
        password: '',
    };
    const [formData, setFormData] = useState(initialFormData);

    const handleInput = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        setFormData({ ...formData, [element.name]: element.value });
    };

    const handleSubmit = async (ev: SyntheticEvent) => {
        ev.preventDefault();
        const userCredentials = await login(formData.email, formData.password);
        console.log('HOLA MUNDO ADMIN', userCredentials);
        handleAdmin(userCredentials.user.uid);
        navigate('/adopt');
    };

    const handleLogin = async (ev: SyntheticEvent) => {
        ev.preventDefault();
        const userCredentials = await loginWithGoogle();
        console.log('HOLA MUNDO GOOGLE!!', userCredentials);
        handleUser(userCredentials);
        navigate('/home');
    };

    return (
        <>
            <section className="login">
                <h2>Log in</h2>
                <form className="form_login" onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onInput={handleInput}
                            required
                        />
                        <input
                            type="text"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={formData.password}
                            onInput={handleInput}
                            required
                        />
                    </div>
                    <button className="btn_admin" type="submit">
                        Submit
                    </button>
                    <span>or</span>
                    <button className="btn_google" onClick={handleLogin}>
                        Sign in with Google
                    </button>
                </form>
            </section>
        </>
    );
}
