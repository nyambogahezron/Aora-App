import { Stack, Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useGlobalContext } from '../../context/GlobalProvider';
import { Loader } from '../../components';
import { UserProvider } from '../../context/UseContextProvider';
import { useUser } from '../../context/UseContextProvider';

const AuthLayout = () => {
  const user = useUser();

  if (user.current) return <Redirect href='/home' />;
  return (
    <>
      <UserProvider>
        <Stack>
          <Stack.Screen
            name='sign-in'
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='sign-up'
            options={{
              headerShown: false,
            }}
          />
        </Stack>
        <StatusBar backgroundColor='#161622' style='light' />
      </UserProvider>
    </>
  );
};

export default AuthLayout;
