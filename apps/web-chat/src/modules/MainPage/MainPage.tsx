import { useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { Timestamp } from 'firebase/firestore';
import { useAuth } from 'firebaseConf';
import { Loader } from 'components/Loader';

import { ChatList } from 'components/ChatList';
import { useUserDb } from 'firebaseConf/hooks';
import { User as AuthUser } from 'firebase/auth';
import { AppContext } from 'state';
import { Grid, Paper } from '@mui/material';
import { Chat } from 'components/Chat';

export const MainPage = () => {
  const navigate = useNavigate();
  const { loading, user: authUser } = useAuth();
  const { createUser, getUserById, updateLastSeen } = useUserDb();
  const { user, setUser, isUserLoading, setUserLoading } = useContext(AppContext);
  const interval = useRef<any>(null);

  useEffect(() => {
    if (!loading && !authUser) {
      navigate('/login');
    }
  }, [loading, authUser]);

  useEffect(() => {
    const checkUser = async (authUser: AuthUser) => {
      setUserLoading(true);
      const dbUser = await getUserById(authUser.uid);
      if (!dbUser) {
        const lastSeen = Timestamp.fromDate(new Date());

        const newUser = {
          id: authUser.uid,
          username: authUser.displayName as string,
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
      interval.current = setInterval(() => {
        updateLastSeen(authUser.uid);
      }, 30000);
    };
    if (authUser) {
      checkUser(authUser);
    }
    return () => {
      interval.current && clearInterval(interval.current);
    };
  }, [authUser]);

  if (loading || isUserLoading) {
    return <Loader />;
  }

  return (
    <Grid container sx={{ maxHeight: 'calc(100vh - 50px)' }}>
      <Grid item xs={12} md={3}>
        <ChatList />
      </Grid>
      <Grid item xs={12} md={9} height={'100%'}>
        <Chat />
      </Grid>
    </Grid>
  );
};
