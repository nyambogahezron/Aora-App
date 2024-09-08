import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
type CustomButtonProps = {
  title: string;
  handlePress: () => void;
  containerStyles: string;
  textStyles?: CssProps;
  isLoading?: boolean;
};

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl min-h-[62px] flex flex-row justify-center items-center ${containerStyles} ${
        isLoading ? 'opacity-50' : ''
      }`}
      disabled={isLoading}
    >
      <Text
        className={`text-primary capitalize font-psemibold text-lg ${textStyles}`}
      >
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color='#fff'
          size='small'
          className='ml-2'
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
