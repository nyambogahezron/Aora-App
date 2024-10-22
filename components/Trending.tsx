import React, { useState } from 'react';
import { ResizeMode, Video } from 'expo-av';
import * as Animatable from 'react-native-animatable';
import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  ViewToken,
  ViewabilityConfig,
} from 'react-native';

import { icons } from '../constants';

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

interface Post {
  $id: string;
  video: string;
  thumbnail: string;
}

interface TrendingItemProps {
  activeItem: string;
  item: Post;
}

const TrendingItem = ({ activeItem, item }: TrendingItemProps) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className='mr-5'
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          className='w-52 h-72 rounded-[33px] mt-3 bg-white/10'
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.isLoaded && !status.isPlaying) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className='relative flex justify-center items-center'
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{
              uri: item.thumbnail,
            }}
            className='w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40'
            resizeMode='cover'
          />

          <Image
            source={icons.play}
            className='w-12 h-12 absolute'
            resizeMode='contain'
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }: { posts: any }) => {
  const [activeItem, setActiveItem] = useState(posts[0]?.$id || null);

  const viewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key as string);
    }
  };

  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 70,
  };

  return (
    <>
      {activeItem && (
        <FlatList
          data={posts}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <TrendingItem activeItem={activeItem} item={item} />
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          contentOffset={{ x: 170, y: 0 }}
        />
      )}
    </>
  );
};

export default Trending;
