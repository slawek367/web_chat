import { useContext, useEffect } from 'react';
import List from '@mui/material/List';
import { useNavigate } from 'react-router-dom';
import { User } from 'types';

import { useSubscribeUserList } from 'firebaseConf/hooks';
import { ChatListBox } from './ChatListBox';
import { Box } from '@mui/material';
import { AppContext } from 'state';

export const ChatList = () => {
  let navigate = useNavigate();
  const { messages } = useContext(AppContext);

  const { users, subscribeUserList, unsubscribeUserList } = useSubscribeUserList();

  useEffect(() => {
    subscribeUserList();
    return () => unsubscribeUserList();
  }, []);

  const onClick = (user: User) => {
    navigate(`/?partnerId=${user.id}&partnerName=${user.username}`);
  };

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper', maxHeight: '70vh', overflow: 'auto' }}>
      {Object.values(users).map((user) => (
        <Box key={user.id} sx={{ borderBottom: 1, borderColor: 'rgba(0, 0, 0, 0.12)' }}>
          <ChatListBox user={user} onClick={onClick} messages={messages[user.id] || []} />
        </Box>
      ))}
    </List>
  );
};
