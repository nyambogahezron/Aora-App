import { createContext, useContext, useEffect, useState } from 'react';
import { account } from '../lib/appWriteConfig';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [User, setUser] = useState(null);

  async function getLoggedUser() {
    setIsLoading(true);
    let user = {};
    try {
      const loggedInUser = await account.get();
      // console.log('loggedInUser', loggedInUser);
      setUser(loggedInUser);
      setIsLoading(false);
      setIsLoggedIn(true);
    } catch (error) {
      setIsLoading(false);
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
    return user;
  }

  useEffect(() => {
    getLoggedUser();
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
