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
  userId: string;
  name: string;
  email: string;
  imageUrl?: string | null;
  lastSeen: Timestamp;
}
