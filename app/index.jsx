import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View className='flex-1 items-center justify-center bg-white'>
      <Text className='text-3xl font-semibold text-blue-500'>Welcome to Aora</Text>
      <StatusBar style='auto' />
      <Link
        className='py-4 px-6 bg-slate-100 mt-4 rounded-md'
        href='/Profile'
        style={{ color: 'blue' }}
      >
        Go to Profile
      </Link>
    </View>
  );
}
