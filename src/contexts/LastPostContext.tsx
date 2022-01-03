import React, { createContext, ReactNode, useState } from 'react';

type Props = {
  children: ReactNode;
};

const LastPostContext = createContext({});

const LastPostProvider = LastPostContext.Provider;

export const LastPostWrapper = ({ children }: Props) => {
  const [lastPost, setLastPost] = useState({});
  return (
    <LastPostProvider value={{ lastPost, setLastPost }}>
      {children}
    </LastPostProvider>
  );
};

export default LastPostContext;
