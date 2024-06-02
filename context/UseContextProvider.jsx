import { account } from '../lib/appWriteConfig';
import Toast from 'react-native-toast-message';
import { toast } from '../lib/toast';

import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider(props) {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // login user
  async function login(email, password) {
    setIsLoading(true);
    try {
      const loggedIn = await account.createEmailPasswordSession(
        email,
        password
      );
      setUser(loggedIn);
      Toast.show({
        type: 'success',
        text1: 'Hello!',
        text2: 'Welcome back. You are logged in',
        style: {
          backgroundColor: '#ff4d4f',
        },
      });
    } catch (error) {
      // Handle error
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    await account.deleteSession('current');
    setUser(null);
    Toast.show({
      type: 'success',
      text1: 'Hello!',
      text2: 'You have logged out',
      style: {
        backgroundColor: '#ff4d4f',
      },
    });
  }

  async function register(username, email, password) {
    await account.create(ID.unique(), username, email, password);
    await login(email, password);
    toast('Account created successful');
  }

  async function getCurrentUser() {
    try {
      const loggedIn = await account.get();
      setUser(loggedIn);
      toast('Welcome back. You are logged in');
    } catch (err) {
      setUser(null);
      setLoading(false);
    }
  }

  useEffect(() => {
    setIsLogged(false);

    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLogged(true);
          setUser(res);
        } else {
          setIsLogged(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <UserContext.Provider
      value={{
        current: user,
        login,
        logout,
        register,
        toast,
        loading,
        isLogged,
        setIsLogged,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
