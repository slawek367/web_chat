import { useState } from 'react';
import { User } from 'types';

export const useAppContext = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setUserLoading] = useState<boolean>(false);

  return {
    user,
    setUser,
    isUserLoading,
    setUserLoading,
  };
};
