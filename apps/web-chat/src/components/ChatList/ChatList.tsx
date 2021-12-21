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
      {/* <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Summer BBQ"
          secondary={
            <>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                to Scott, Alex, Jennifer
              </Typography>
              {" — Wish I could come, but I'm out of town this…"}
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Oui Oui"
          secondary={
            <>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Sandra Adams
              </Typography>
              {' — Do you have Paris recommendations? Have you ever…'}
            </>
          }
        />
      </ListItem> */}
    </List>
  );
};
