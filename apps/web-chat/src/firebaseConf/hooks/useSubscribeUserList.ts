import { useCallback, useState, useRef } from 'react';
import { User } from 'types';
import { db } from '../db';
import { ref, onValue, Unsubscribe } from 'firebase/database';

export const useSubscribeUserList = () => {
  const [users, setUserList] = useState<Record<string, User>>({});
  const cancelCallback = useRef<Unsubscribe | null>(null);

  const subscribeUserList = useCallback(() => {
    console.log('subscribe');
    const starCountRef = ref(db, 'users');
    cancelCallback.current = onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setUserList(data || {});
    });
  }, []);

  const unsubscribeUserList = useCallback(() => {
    cancelCallback.current && cancelCallback.current();
    console.log('unsubscribe');
  }, []);

  return {
    users,
    subscribeUserList,
    unsubscribeUserList,
  };
};
