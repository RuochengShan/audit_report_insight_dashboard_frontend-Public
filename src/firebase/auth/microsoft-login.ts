'use client';

import {
  Auth,
  signInWithRedirect,
  OAuthProvider,
} from 'firebase/auth';

export function signInWithMicrosoft(authInstance: Auth): void {
  const provider = new OAuthProvider('microsoft.com');
  // You can add scopes here if needed, e.g., provider.addScope('mail.read');
  signInWithRedirect(authInstance, provider)
    .catch((error) => {
      // Handle Errors here.
      console.error("Microsoft Sign-In Error:", error);
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData?.email;
      // The AuthCredential type that was used.
      const credential = OAuthProvider.credentialFromError(error);
      // ...
    });
}
