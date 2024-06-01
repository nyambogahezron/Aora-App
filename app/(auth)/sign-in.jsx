import {  useState } from 'react';
import Toast from 'react-native-toast-message';
import {  Redirect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, Dimensions,  Image } from 'react-native';
import { images } from '../../constants';
import { CustomButton, FormField } from '../../components';
import { useUser } from '../../context/UseContextProvider';
import AuthFormFooter from '../../components/AuthFormFooter';

const SignIn = () => {
  const user = useUser();

  if (user) return <Redirect href='/home' />;

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  // login the user and redirect to home page
  const submit = async () => {
    if (form.email === '' || form.password === '') {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill in all fields!',
      });

      return;
    }
    try {
      await user.login(form.email, form.password);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View
          className='w-full flex justify-center px-4 my-6'
          style={{
            minHeight: Dimensions.get('window').height - 100,
          }}
        >
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[34px]'
          />

          <Text className='text-2xl font-semibold text-white mt-10 font-psemibold'>
            Log in to Aora
          </Text>

          <FormField
            title='Email'
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles='mt-7'
            keyboardType='email-address'
          />

          <FormField
            title='Password'
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles='mt-7'
          />

          <CustomButton
            title='Sign In'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={user.isLoading}
          />
          <AuthFormFooter
            text="Don't have an account?"
            linkText='Signup'
            link='/sign-up'
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
