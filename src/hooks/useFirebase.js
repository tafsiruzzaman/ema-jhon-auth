import { useEffect, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import initializeAuthentication from "../Firebase/firebase.initialize";

initializeAuthentication();

const useFirebase = () => {
    const [ user, setUser ] = useState({});
    const [ error, setError ] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const sighInUsingGoogle = () => {
        setIsLoading(true);
        return signInWithPopup(auth, googleProvider);
        
    };

    const logOut = () => {
        signOut(auth)
        .then(() => {
            setUser({});
        })
        .catch((error) => {
            setError(error);
        })
        .finally(() => setIsLoading(false));;
    };

    useEffect( () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            }
            else{
                setUser({});
            };
            setIsLoading(false);
        });
    }, []);

    return {
        user,
        error,
        isLoading,
        setIsLoading,
        sighInUsingGoogle,
        logOut,
        setUser,
        setError
    };
};

export default useFirebase;