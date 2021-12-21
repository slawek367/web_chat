import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { User } from 'types';
import { Paper } from '@mui/material';

export const ChatListBox = ({ user }: { user: User }) => {
  console.log('u', user);
  return (
    <ListItemButton alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={user.username} />
      </ListItemAvatar>
      <ListItemText
        primary={user.username}
        secondary={
          <>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {user.email}
            </Typography>
            {' — Last message'}
          </>
        }
      />
    </ListItemButton>
  );
};
