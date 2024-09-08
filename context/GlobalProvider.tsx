import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { account } from '../lib/appWriteConfig';

type ContextProps = {
  isLoading?: boolean;
  isLoggedIn?: boolean;
  setIsLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
  User?: any;
  setUser?: React.Dispatch<React.SetStateAction<any>>;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  children?: ReactNode;
};

const GlobalContext = createContext<any>(null);

export const GlobalProvider = ({ children }: ContextProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [User, setUser] = useState<any>(null);

  async function getLoggedUser() {
    setIsLoading(true);
    try {
      const loggedInUser = await account.get();
      setUser(loggedInUser);
      setIsLoggedIn(true);
    } catch (error) {
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getLoggedUser();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        setIsLoggedIn,
        User,
        setUser,
        setIsLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
