import { useState } from 'react';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, Dimensions, Image, Alert } from 'react-native';
import { images } from '../../constants';
import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormField';
import AuthFormFooter from '../../components/AuthFormFooter';
import { getCurrentUser, signIn } from '../../lib/appwrite';

const SignIn = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  // login the user and redirect to home page
   const submit = async () => {
     if (form.email === '' || form.password === '') {
       Alert.alert('Error', 'Please fill in all fields');
     }

     setSubmitting(true);

     try {
       await signIn(form.email, form.password);
       const result = await getCurrentUser();
       setUser(result);
       setIsLogged(true);

       Alert.alert('Success', 'User signed in successfully');
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
            isLoading={isSubmitting}
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
