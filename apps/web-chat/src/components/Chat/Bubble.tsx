import { Grid } from '@mui/material';
import { styled } from '@mui/system';
import { Timestamp } from 'firebase/firestore';

const BubbleBox = styled('div')({
  border: '0.5px solid black',
  borderRadius: '10px',
  margin: '5px',
  padding: '10px',
  display: 'inline-block',
  maxWidth: '300px',
  wordBreak: 'break-word',
});

const TextBox = styled('div')({
  fontSize: '14px',
  marginBottom: '8px',
  color: 'black',
});

const DateBox = styled('div')({
  fontSize: '12px',
  textAlign: 'end',
  color: '#5e5e5e',
});

export const Bubble = ({ text, myMessage = false, date }: { text: string; myMessage: boolean; date: Timestamp }) => {
  const dateLabel = new Date(date.seconds * 1000).toLocaleString();

  return (
    <Grid container justifyContent={myMessage ? 'end' : 'start'}>
      <BubbleBox sx={{ backgroundColor: myMessage ? '#d9fbff' : '#e8ffcf' }}>
        <TextBox>{text}</TextBox>
        <DateBox>{dateLabel}</DateBox>
      </BubbleBox>
    </Grid>
  );
};
