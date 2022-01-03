import React, { createContext, ReactNode, useState, useEffect } from 'react';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

type Props = {
  children: ReactNode;
};

const LoginContext = createContext({});

const LoginProvider = LoginContext.Provider;

export const LoginWrapper = ({ children }: Props) => {
  const { getItem, setItem } = useAsyncStorage('username');

  const [username, setUsername] = useState({});

  const readUserNameFromStorage = async () => {
    const usernameFromStorage = await getItem().then((response) => {
      setUsername(response);
    });
  };

  useEffect(() => {
    if (username !== '' && typeof username === 'string') {
      setItem(username);
    }
  }, [setItem, username]);

  useEffect(() => {
    console.log('pobieram username');
    readUserNameFromStorage();
  }, [readUserNameFromStorage]);

  return (
    <LoginProvider value={{ username, setUsername }}>{children}</LoginProvider>
  );
};

export default LoginContext;
