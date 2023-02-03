import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from 'firebase/auth';
import { firebaseApp } from './config';

const auth = getAuth(firebaseApp);

export const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
        user_type: 'public-user',
    });
    const result = await signInWithPopup(auth, provider);
    //const credential = GoogleAuthProvider.credentialFromResult(result);
    //const token = credential?.idToken;
    //console.log(credential);
    //console.log(token);
    //console.log(result);
    alert(`Bienvenido ${result.user.displayName}`);
};

export const exit = signOut(auth);
