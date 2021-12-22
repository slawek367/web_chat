import { Grid } from '@mui/material';
import { styled } from '@mui/system';
import { Timestamp } from 'firebase/firestore';

const BubbleBox = styled('div')({
  borderRadius: '10px',
  margin: '5px',
  padding: '10px',
  display: 'inline-block',
  maxWidth: '300px',
  wordBreak: 'break-word',
  fontSize: '13px',
  fontFamily: 'Verdana, Helvetica, sans-serif',
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
      <BubbleBox
        sx={{
          background: myMessage
            ? 'linear-gradient(178deg, #ff000000, #005dff17)'
            : 'linear-gradient(178deg, #bfff0000, #00839f14)',
        }}
      >
        <TextBox>{text}</TextBox>
        <DateBox>{dateLabel}</DateBox>
      </BubbleBox>
    </Grid>
  );
};
