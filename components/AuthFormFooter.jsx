import { Link } from 'expo-router';
import { View, Text } from 'react-native';
const AuthFormFooter = ({text, linkText, link}) => {
  return (
    <View className='flex justify-center pt-5 flex-row gap-2'>
      <Text className='text-lg text-gray-100 font-pregular'>
        {text}
      </Text>
      <Link href={link} className='text-lg font-psemibold text-secondary'>
        {linkText}
      </Link>
    </View>
  );
};
export default AuthFormFooter;
