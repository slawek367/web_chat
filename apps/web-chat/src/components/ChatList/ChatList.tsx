import { useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { ChannelList } from 'types';

import { useSubscribeUserList } from 'firebaseConf/hooks';
import { ChatListBox } from './ChatListBox';
import { Box } from '@mui/material';

export const ChatList = ({ data }: { data: ChannelList }) => {
  const { users, subscribeUserList, unsubscribeUserList } =
    useSubscribeUserList();

  useEffect(() => {
    subscribeUserList();
    return () => unsubscribeUserList();
  }, []);

  console.log('user list', users);

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {Object.values(users).map((user) => (
        <Box
          key={user.id}
          sx={{ borderBottom: 1, borderColor: 'rgba(0, 0, 0, 0.12)' }}
        >
          <ChatListBox user={user} />
        </Box>
      ))}
    </List>
  );
};
