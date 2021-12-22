import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Timestamp } from 'firebase/firestore';
import CircleTwoToneIcon from '@mui/icons-material/CircleTwoTone';

import { Message, User } from 'types';
import { Paper } from '@mui/material';

export const ChatListBox = ({
  user,
  onClick,
  messages,
}: {
  user: User;
  onClick: (user: User) => void;
  messages: Message[];
}) => {
  const lastMessage = messages[messages.length - 1]?.text || '';

  const currentTime = Timestamp.fromDate(new Date());
  const isOnline = currentTime.seconds - user.lastSeen?.seconds < 60;

  return (
    <ListItemButton alignItems="flex-start" onClick={() => onClick(user)}>
      <ListItemAvatar>
        <Avatar alt={user.username} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <span>
            {user.username}{' '}
            {isOnline ? (
              <CircleTwoToneIcon sx={{ color: '#18f118', fontSize: '12px' }} />
            ) : (
              <CircleTwoToneIcon sx={{ color: 'red', fontSize: '12px' }} />
            )}
          </span>
        }
        secondary={
          <>
            <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
              {user.email}
            </Typography>
            {lastMessage && ` - ${lastMessage}`}
          </>
        }
        sx={{ overflow: 'hidden' }}
      />
    </ListItemButton>
  );
};
