import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const GoogleSignInButton = () => {
    const { signIn } = useAuth();
    const history = useNavigate();

    const handleSignIn = async () => {
        try {
            // Load Google API
            await loadGoogleApi();

            // Initialize Google Sign-In
            const auth2 = await window.gapi.auth2.init({
                client_id: 'YOUR_GOOGLE_CLIENT_ID',
            });

            // Sign in with Google
            const googleUser = await auth2.signIn();

            // Get user data
            const userData = {
                id: googleUser.getId(),
                name: googleUser.getBasicProfile().getName(),
                email: googleUser.getBasicProfile().getEmail(),
                // Add more user data as needed
            };

            // Call signIn with user data upon successful authentication
            signIn(userData);

            // Redirect to dashboard or another route
            history.push('/dashboard');
        } catch (error) {
            console.error('Error during Google sign-in:', error);
        }
    };

    const loadGoogleApi = () => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://apis.google.com/js/platform.js';
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => reject();
            document.head.appendChild(script);
        });
    };

    return (
        <button onClick={handleSignIn}>
            Sign in with Google
        </button>
    );
};

export default GoogleSignInButton;
