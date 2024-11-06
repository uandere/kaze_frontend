import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from './firebase';

const Public = ({ onSignIn }) => {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Successfully signed in:", result.user);
      onSignIn(result.user);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      if (error.code === 'auth/popup-blocked') {
        alert('Please allow popups for this website');
      }
    }
  };

  return (
    <div className="login-container">
      <h1>Please sign in to continue</h1>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default Public;
