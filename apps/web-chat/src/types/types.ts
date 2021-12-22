import { Timestamp } from 'firebase/firestore';

export interface SingleChannel {
  avatar: string;
  alt: string;
  title: string;
  subtitle: string;
  date: Date;
  unread: number;
}

export type ChannelList = SingleChannel[];

export interface User {
  id: string;
  username: string;
  email: string;
  imageUrl?: string | null;
  lastSeen: Timestamp;
}

export interface Message {
  from: string;
  to: string;
  text: string;
  sent: Timestamp;
  seen: Timestamp | null;
}
