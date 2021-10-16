import { useEffect, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import initializeAuthentication from "../Firebase/firebase.initialize";

initializeAuthentication();

const useFirebase = () => {
    const [ user, setUser ] = useState({});
    const [ error, setError ] = useState('');

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const sighInUsingGoogle = () => {
        signInWithPopup(auth, googleProvider)
        .then(result => {
            setUser(result.user)
        })
        .catch(error => {
            setError(error.message)
        })
    };

    const logOut = () => {
        signOut(auth)
        .then(() => {
            setUser({});
        })
        .catch((error) => {
            setError(error);
        });
    };

    useEffect( () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            }
        });
    }, []);

    return {
        user,
        error,
        sighInUsingGoogle,
        logOut
    };
};

export default useFirebase;