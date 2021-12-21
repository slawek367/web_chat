import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Timestamp } from 'firebase/firestore';
import { useAuth } from 'firebaseConf';
import { Loader } from 'components/Loader';

import { ChatList } from 'components/ChatList';
import { useUserDb } from 'firebaseConf/hooks';
import { User as AuthUser } from 'firebase/auth';
import { useAppContext } from 'state';

export const MainPage = () => {
  const navigate = useNavigate();
  const { loading, user: authUser } = useAuth();
  const { createUser, getUserById, updateLastSeen } = useUserDb();
  const { user, setUser, isUserLoading, setUserLoading } = useAppContext();

  useEffect(() => {
    if (!loading && !authUser) {
      navigate('/login');
    }
  }, [authUser]);

  useEffect(() => {
    const checkUser = async (authUser: AuthUser) => {
      setUserLoading(true);
      const dbUser = await getUserById(authUser.uid);
      if (!dbUser) {
        const lastSeen = Timestamp.fromDate(new Date());

        const newUser = {
          userId: authUser.uid,
          name: authUser.displayName as string,
          email: authUser.email as string,
          imageUrl: null,
          lastSeen,
        };
        await createUser(newUser);
        setUser(newUser);
      } else {
        await updateLastSeen(authUser.uid);
        setUser(dbUser);
      }
      setUserLoading(false);
    };
    if (authUser) {
      checkUser(authUser);
    }
  }, [authUser]);

  if (loading || isUserLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div>Main page {authUser?.displayName}</div>
      <ChatList data={[]} />
    </div>
  );
};
