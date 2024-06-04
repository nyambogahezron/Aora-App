import { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { getCurrentUser } from '../lib/appwrite';
import { account } from '../lib/appWriteConfig';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [User, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  async function getLoggedUser() {
    setIsLoading(true);
    let user = {};
    try {
      const loggedInUser = await account.get();
      setCurrentUser(loggedInUser);
    } catch (error) {
      setCurrentUser(null);
    } finally {
      setIsLoading(false);
    }
    return user;
  }
  
  async function saveUserInfoLocally(user = currentUser) {
    try {
      const loggedInUser = await account.get();
      const stringValue = loggedInUser
        ? JSON.stringify(loggedInUser)
        : JSON.stringify({});
      console.log('User info: ', stringValue);
      await SecureStore.setItemAsync('userInfo', stringValue);
    } catch (error) {
      console.log(error);
    }
  }

  async function getCurrentUser(key) {
    setIsLoading(true);

    try {
      let result = await SecureStore.getItemAsync(key);
      const res = JSON.parse(result);

      if (!result || Object.keys(res).length === 0) {
        setIsLoading(false);
        setIsLoggedIn(false);
        setUser({});
      } else {
        setIsLoading(false);
        setIsLoggedIn(true);
        setUser(res);
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getLoggedUser();
    saveUserInfoLocally(currentUser);

    if (currentUser) {
      saveUserInfoLocally(currentUser)
        .then(() => {
          getCurrentUser('userInfo');
        })
        .catch((error) => {
          console.log('Error in useEffect: ', error);
        });
    }
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
        getLoggedUser,
        setCurrentUser,
        currentUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
