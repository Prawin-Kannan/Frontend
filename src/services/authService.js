import { GoogleProvider, useGoogleLogin } from 'react-oauth/google';
import { useAuth } from '../context/AuthContext';

const clientId = 'YOUR_GOOGLE_CLIENT_ID';

const GoogleSignInButton = () => {
    const { signIn } = useAuth();

    const { signIn: signInGoogle, loaded, error } = useGoogleLogin({
        clientId,
        onSuccess: async (user) => {
            // Handle the success, and sign in the user
            signIn(user);
        },
        onError: (error) => {
            // Handle the error
            console.error('Error during Google sign-in:', error);
        },
    });

    if (!loaded) {
        // Loading state while the authentication provider is loading
        return <p>Loading...</p>;
    }

    if (error) {
        // Handle the case where an error occurred while loading the authentication provider
        return <p>Error loading authentication provider</p>;
    }

    return (
        <button onClick={signInGoogle}>
            Sign in with Google
        </button>
    );
};

export default GoogleSignInButton;
