// GoogleSignInButton.js
import React from 'react';
import { jwtDecode } from 'jwt-decode';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom'

const GoogleSignInButton = () => {
    const navigate = useNavigate();

    const saveUserDataToBackend = async (credentialResponseDecoded) => {
        const { name, email } = credentialResponseDecoded;

        const response = await fetch('http://localhost:5000/auth/googleSignIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        });

        if (!response.ok) {
            console.error('Error saving user data to backend:', response.statusText);
        }
    };

    return (
        <GoogleOAuthProvider clientId="842440962759-otno2cdledbvavqj91ptpmlvgdm8jl9i.apps.googleusercontent.com">
            <GoogleLogin
                onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                    const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
                    console.log('credentialResponseDecoded', credentialResponseDecoded);

                    // Pass the decoded token to saveUserDataToBackend function
                    saveUserDataToBackend(credentialResponseDecoded);
                    navigate('/overlay-side-panel', { state: { userData: credentialResponseDecoded } });

                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
        </GoogleOAuthProvider>
    );
};

export default GoogleSignInButton;
