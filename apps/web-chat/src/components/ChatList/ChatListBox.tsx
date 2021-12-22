import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

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
  console.log('msgs', messages);
  const lastMessage = messages[messages.length - 1]?.text || '';

  return (
    <ListItemButton alignItems="flex-start" onClick={() => onClick(user)}>
      <ListItemAvatar>
        <Avatar alt={user.username} />
      </ListItemAvatar>
      <ListItemText
        primary={user.username}
        secondary={
          <>
            <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
              {user.email}
            </Typography>
            {lastMessage && ` - ${lastMessage}`}
          </>
        }
      />
    </ListItemButton>
  );
};
