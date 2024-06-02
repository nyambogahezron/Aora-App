import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Button,
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import { useUser } from '../../context/UseContextProvider';
import { images } from '../../constants';
import useAppwrite from '../../lib/useAppwrite';
import { getAllPosts, getLatestPosts } from '../../lib/appwrite';
import { EmptyState, SearchInput, Trending, VideoCard } from '../../components';
import * as SecureStore from 'expo-secure-store';
import { Redirect } from 'expo-router';

const Home = () => {
  useEffect(() => {
    save('userInfo', userInfo);
    getValueFor('userInfo');
  }, [storedValue]);

  const user = useUser();
  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchPosts = async () => {
        const postsData = useAppwrite(getAllPosts);
        setPosts(postsData);
      };
    }
  }, [user, posts]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

  if (!isLoggedIn && !isLoading) {
    return <Redirect href='/sign-up' />;
  }

  return (
    <SafeAreaView className='bg-primary'>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View className='flex my-6 px-4 space-y-6'>
            <View className='flex justify-between items-start flex-row mb-6'>
              <View>
                <Text className='font-pmedium text-sm text-gray-100'>
                  Welcome Back
                </Text>
                <Text className='text-2xl font-psemibold text-white'>
                  {user.current ? user.current.name : 'Please login'}
                </Text>
                <Button
                  title='Save this key/value pair'
                  onPress={() => {
                    save(key, storedValue);
                    onChangeValue(userInfo);
                    getValueFor(key);
                  }}
                />
              </View>

              <View className='mt-1.5'>
                <Image
                  source={images.logoSmall}
                  className='w-9 h-10'
                  resizeMode='contain'
                />
              </View>
            </View>

            <SearchInput />

            <View className='w-full flex-1 pt-5 pb-8'>
              <Text className='text-lg font-pregular text-gray-100 mb-3'>
                Latest Videos
              </Text>

              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No Videos Found'
            subtitle='No videos created yet'
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
