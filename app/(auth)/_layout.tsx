import { Stack, Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useGlobalContext } from '../../context/GlobalProvider';
import { Loader } from '../../components';

const AuthLayout = () => {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href='home' />;
  return (
    <>
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
      <Loader isLoading={isLoading} />
    </>
  );
};

export default AuthLayout;
