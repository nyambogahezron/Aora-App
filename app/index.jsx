import { View, Text, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

const Welcome = () => {
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView
        contentContainerStyle={{
          height: '100%',
        }}
      >
        <View className='w-full min-h-[80vh] flex justify-center items-center  px-4'>
          {/* logo */}
          <Image
            source={images.logo}
            className='w-[130px] h-[84px]'
            resizeMode='contain'
          />

          {/* home image card  */}
          <Image
            source={images.cards}
            className='max-w-[380px] w-full h-[298px]'
            resizeMode='contain'
          />

          <View className='relative mt-5'>
            <Text className='text-3xl text-white font-bold text-center'>
              Discover Endless{'\n'}
              Possibilities with{' '}
              <Text className='text-secondary-200'>Aora</Text>
            </Text>

            {/* aora underline  */}
            <Image
              source={images.path}
              className='w-[136px] h-[15px] absolute -bottom-2 -right-8'
              resizeMode='contain'
            />
          </View>

          <Text className='text-sm font-pregular text-gray-100 mt-7 text-center'>
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>
          <CustomButton
            title='Continue with email'
            handlePress={() => {router.push('sign-in')}}
            containerStyles='w-full mt-7'
          />
        </View>
      </ScrollView>
      {/* top bar mobile status bar */}
      <StatusBar style='light' backgroundColor='#161622' />
    </SafeAreaView>
  );
};

export default Welcome;
