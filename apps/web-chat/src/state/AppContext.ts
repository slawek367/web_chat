import { createContext } from 'react';
import { Message, User } from 'types';

interface AppContext {
  user: User | null;
  setUser: (user: User | null) => void;
  isUserLoading: boolean;
  setUserLoading: (isLoading: boolean) => void;
  messages: Record<string, Message[]>;
  pushMessage: (channel: string, newMsg: Message) => void;
}

export const AppContext = createContext<AppContext>({
  user: null,
  setUser: (user) => {
    return;
  },
  isUserLoading: false,
  setUserLoading: (loading) => {
    return;
  },
  messages: {},
  pushMessage: (channel: string, newMsg: Message) => {
    return;
  },
});
