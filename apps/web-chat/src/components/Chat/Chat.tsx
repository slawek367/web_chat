import { useContext, useEffect, useState, useRef, useMemo } from 'react';
import { Button, Fab, Grid, Paper, TextField, Divider, Alert } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { AppContext } from 'state';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';

import { Timestamp } from 'firebase/firestore';
import { useChatDb, useSubscribeChat } from 'firebaseConf/hooks';
import { Message } from 'types';
import { Bubble } from './Bubble';

export const Chat = () => {
  const { user: currentUser, messages } = useContext(AppContext);
  const { subscribeChat, unsubscribeChat } = useSubscribeChat(currentUser?.id || '');
  const [text, setText] = useState<string>('');
  const scrollRef = useRef(null);

  const [searchParams] = useSearchParams();
  const currentUserId = currentUser?.id;
  const { sendMessage } = useChatDb();
  const partnerId = searchParams.get('partnerId');
  const partnerName = searchParams.get('partnerName');

  const channelMessages = messages[partnerId || ''] || [];

  useEffect(() => {
    subscribeChat();
    return () => unsubscribeChat();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      (scrollRef.current as any).scrollIntoView({ behaviour: 'smooth' });
    }
  }, [channelMessages]);

  const sendMsg = () => {
    if (!text.length || !currentUserId || !partnerId) {
      return;
    }
    const message: Message = {
      from: currentUserId,
      to: partnerId,
      text,
      sent: Timestamp.fromDate(new Date()),
      seen: null,
    };
    sendMessage(message);
    setText('');
  };

  if (!currentUserId || !partnerId) {
    return (
      <Alert icon={false} severity="warning" sx={{ width: '100%' }}>
        Please select user to start chat
      </Alert>
    );
  }

  return (
    <Grid container>
      <Alert icon={false} severity="success" sx={{ width: '100%' }}>
        Chat with: {partnerName}
      </Alert>
      <List sx={{ width: '100%', bgcolor: 'background.paper', maxHeight: '70vh', overflow: 'auto' }}>
        {channelMessages
          .sort((a, b) => a.sent.seconds - b.sent.seconds)
          .map((msg, idx) => (
            <Bubble text={msg.text} myMessage={msg.from === currentUserId} date={msg.sent} key={idx} />
          ))}
        <span ref={scrollRef}></span>
      </List>
      <Grid container style={{ padding: '20px' }}>
        <Divider />
        <Grid item xs={12}>
          <TextField
            id="outlined-basic-email"
            label="Type Something"
            fullWidth
            InputProps={{
              endAdornment: (
                <IconButton onClick={sendMsg}>
                  <SendIcon />
                </IconButton>
              ),
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                sendMsg();
              }
            }}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Grid>
        <Divider />
      </Grid>
    </Grid>
  );
};
