import { useState } from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, Dimensions, Alert, Image } from 'react-native';
import { images } from '../../constants';
import { createUser } from '../../lib/appwrite';
import { CustomButton, FormField } from '../../components';
import { useGlobalContext } from '../../context/GlobalProvider';
import AuthFormFooter from '../../components/AuthFormFooter';

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  // sign -up the user and redirect to home page
  const submit = async () => {
    if (form.username === '' || form.email === '' || form.password === '') {
      Alert.alert('Error', 'Please fill in all fields');
    }

    setSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLogged(true);

      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View
          className='w-full flex justify-center h-full px-4 my-6'
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
            Sign Up to Aora
          </Text>

          <FormField
            title='Username'
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles='mt-10'
          />

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
            title='Sign Up'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />

          <AuthFormFooter
            text='Have an account already?'
            linkText='Login'
            link='/sign-in'
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
