import { useContext } from 'react';
import { Button, Paper } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { AppContext } from 'state';

import { Timestamp } from 'firebase/firestore';
import { useChatDb } from 'firebaseConf/hooks/useChatDb';
import { Message } from 'types';

export const Chat = () => {
  const { user: currentUser } = useContext(AppContext);

  const [searchParams] = useSearchParams();
  const currentUserId = currentUser?.id;
  const { sendMessage } = useChatDb();
  const partnerId = searchParams.get('partnerId');
  const partnerName = searchParams.get('partnerName');

  if (!currentUserId || !partnerId) {
    return <div>Select user to chat</div>;
  }

  const send = () => {
    const message: Message = {
      from: currentUserId,
      to: partnerId,
      text: 'Some text',
      sent: Timestamp.fromDate(new Date()),
      seen: null,
    };
    sendMessage(message);
  };

  return (
    <Paper>
      <Button onClick={send}>Send</Button>
    </Paper>
  );
};
