import { useCallback, useContext, useRef, useState } from 'react';
import { db } from '../db';
import { ref, onChildAdded, Unsubscribe, query, equalTo, orderByValue, orderByChild } from 'firebase/database';
import { Message } from 'types';
import { AppContext } from 'state';

export const useSubscribeChat = (userId: string) => {
  const cancelCallbackFrom = useRef<Unsubscribe | null>(null);
  const cancelCallbackTo = useRef<Unsubscribe | null>(null);
  const { pushMessage } = useContext(AppContext);

  const onReceivedMessage = useCallback((msg: Message) => {
    const channel = msg.from === userId ? msg.to : msg.from;
    pushMessage(channel, msg);
  }, []);

  const subscribeChat = useCallback(() => {
    const msgRef = ref(db, 'messages');
    const msgQueryFrom = query(msgRef, orderByChild('from'), equalTo(userId));
    const msgQueryTo = query(msgRef, orderByChild('to'), equalTo(userId));

    cancelCallbackFrom.current = onChildAdded(msgQueryFrom, (data) => {
      onReceivedMessage(data.val());
    });

    cancelCallbackTo.current = onChildAdded(msgQueryTo, (data) => {
      onReceivedMessage(data.val());
    });
  }, []);

  const unsubscribeChat = useCallback(() => {
    cancelCallbackFrom.current && cancelCallbackFrom.current();
    cancelCallbackTo.current && cancelCallbackTo.current();
  }, []);

  return {
    subscribeChat,
    unsubscribeChat,
  };
};
