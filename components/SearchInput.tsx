import React from 'react';
import { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { icons } from '../constants';

interface SearchInputProps extends TextInputProps {
  title?: string;
  value?: string;
  placeholder?: string;
  handleChangeText?: (text: string) => void;
  otherStyles?: StyleProp<ViewStyle>;
  initialQuery?:string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  return (
    <View
      className='flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary'
      style={otherStyles}
    >
      <TextInput
        className='text-base mt-0.5 text-white flex-1 font-pregular'
        value={value}
        placeholder={placeholder}
        placeholderTextColor='#CDCDE0'
        onChangeText={handleChangeText}
        {...props}
      />

      <TouchableOpacity>
        <Image source={icons.search} className='w-5 h-5' resizeMode='contain' />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
