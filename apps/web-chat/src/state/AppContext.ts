import { createContext } from 'react';
import { User } from 'types';

interface AppContext {
  user: User | null;
  setUser: (user: User | null) => void;
  isUserLoading: boolean;
  setUserLoading: (isLoading: boolean) => void;
}

export const AppContext = createContext<AppContext>({
  user: null,
  setUser: (user) => {
    return;
  },
  isUserLoading: false,
  setUserLoading: (loading) => {
    return;
  },
});
