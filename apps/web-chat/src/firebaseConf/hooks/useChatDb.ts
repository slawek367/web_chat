import { ref, set, push } from 'firebase/database';
import { Message } from 'types';
import { db } from '../db';

export const useChatDb = () => {
  const msgRef = ref(db, 'messages');

  const sendMessage = async (message: Message) => {
    try {
      const newMsgRef = push(msgRef);
      set(newMsgRef, message);
    } catch (e) {
      console.error(e);
    }
  };

  return { sendMessage };
};
