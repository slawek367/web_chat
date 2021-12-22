import { useState } from 'react';
import { Message, User } from 'types';

export const useAppContext = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setUserLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});

  const pushMessage = (channelId: string, newMsg: Message) => {
    setMessages((messages) => ({
      ...messages,
      ...{ [channelId]: [...(messages[channelId] || []), newMsg] },
    }));
  };

  return {
    user,
    setUser,
    isUserLoading,
    setUserLoading,
    messages,
    pushMessage,
  };
};
