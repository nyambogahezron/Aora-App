import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

import { getCurrentUser } from '../lib/appwrite';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [User, setUser] = useState(null);

  async function saveUserInfoLocally(user) {
    console.log(`user to ${user.username}`);
    try {
      const stringValue = JSON.stringify(user);
      await SecureStore.setItemAsync('userInfo', stringValue);
    } catch (error) {
      console.log(error);
    }
  }

  async function getCurrentUser(key) {
    setIsLoading(true);

    try {
      let result = await SecureStore.getItemAsync(key);

      if (result) {
        setIsLoading(false);
        const res = JSON.parse(result);
        alert(res.username);
        setUser(res);
        console.log('the user is' + User);
        setIsLoggedIn(true);
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCurrentUser('userInfo');
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        setIsLoggedIn,
        isLoggedIn,
        User,
        setUser,
        isLoading,
        setIsLoading,
        saveUserInfoLocally,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
