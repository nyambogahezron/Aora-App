import { useEffect, useState } from 'react';
import { ResizeMode, Video } from 'expo-av';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { icons } from '../constants';
import { VideoCardProps } from '@/types';
const fallbackThumbnail = 'https://images.squarespace-cdn.com/content/v1/5e7a2a22a7c9d26de743e580/4d7eb69a-4702-466b-b3c8-2e26c5d09cb5/MOW_WebHeader_FrozenLake+%28placeholder%29.png';

const VideoCard = ({
  title,
  creator,
  avatar,
  thumbnail,
  video,
}: VideoCardProps) => {
  const [play, setPlay] = useState(false);
  const [status, setStatus] = useState<any>({});

  useEffect(() => {
    if (status.didJustFinish) {
      setPlay(false);
    }
  }, [status]);

  return (
    <View className='flex flex-col items-center px-4 mb-14'>
      <View className='flex flex-row gap-3 items-start'>
        <View className='flex justify-center items-center flex-row flex-1'>
          <View className='w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5'>
            <Image
              source={{ uri: avatar }}
              className='w-full h-full rounded-lg'
              resizeMode='cover'
            />
          </View>

          <View className='flex justify-center flex-1 ml-3 gap-y-1'>
            <Text
              className='font-psemibold text-sm text-white'
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className='text-xs text-gray-100 font-pregular'
              numberOfLines={1}
            >
              {creator}
            </Text>
          </View>
        </View>

        <View className='pt-2'>
          <Image source={icons.menu} className='w-5 h-5' resizeMode='contain' />
        </View>
      </View>

      {play ? (
        <Video
          source={{
            uri: video,
          }}
          className='w-full h-60 rounded-xl mt-3'
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            setStatus(() => status);
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className='w-full h-60 rounded-xl mt-3 relative flex justify-center items-center'
        >
          <Image
            source={{ uri: thumbnail || fallbackThumbnail}}
            className='w-full h-full rounded-xl mt-3'
            resizeMode='cover'
          />

          <Image
            source={icons.play}
            className='w-12 h-12 absolute'
            resizeMode='contain'
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
