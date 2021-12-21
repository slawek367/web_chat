import { useCallback } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import { firebaseApp } from './firebaseConf';

const provider = new GoogleAuthProvider();
const auth = getAuth(firebaseApp);

export const useAuth = () => {
  const [user, loading, error] = useAuthState(auth);

  const signInWithGoogle = useCallback(async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error(err);
    }
  }, [auth, provider]);

  const logout = useCallback(() => {
    auth.signOut();
  }, [auth]);

  return {
    logout,
    signInWithGoogle,
    user,
    loading,
    error,
  };
};
