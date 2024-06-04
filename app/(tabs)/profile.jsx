import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Image, FlatList, TouchableOpacity } from 'react-native';
import { icons } from '../../constants';
import useAppwrite from '../../lib/useAppwrite';
import { getUserPosts, signOut } from '../../lib/appwrite';
import { useUser, logout } from '../../context/UseContextProvider';
import { useGlobalContext } from '../../context/GlobalProvider';

import { EmptyState, InfoBox, VideoCard } from '../../components';
import { useEffect, useState } from 'react';

const Profile = () => {
  const [posts, setPosts] = useState(null);
  const {
    setIsLoggedIn,
    isLoggedIn,
    User,
    setUser,
    isLoading,
    setIsLoading,
    saveUserInfoLocally,
    getLoggedUser,
    setCurrentUser,
  } = useGlobalContext();

  

  // useEffect(() => {
  //   if (User) {
  //     console.log(User);
  //     const fetchPosts = async () => {
  //       const postsData = await getUserPosts(User.$id);
  //       setPosts(postsData);
  //     };

  //     fetchPosts();
  //   }
  // }, [user]);

  const logoutUser = async () => {
    await signOut();
    setCurrentUser(null);
    await setUser(null);
    setIsLoggedIn(false);
    saveUserInfoLocally(null);
    router.replace('/sign-in');
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
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
        ListEmptyComponent={() => (
          <EmptyState
            title='No Videos Found'
            subtitle='No videos found for this profile'
          />
        )}
        ListHeaderComponent={() => (
          <View className='w-full flex justify-center items-center mt-6 mb-12 px-4'>
            <TouchableOpacity
              onPress={logoutUser}
              className='flex w-full items-end mb-10'
            >
              <Image
                source={icons.logout}
                resizeMode='contain'
                className='w-6 h-6'
              />
            </TouchableOpacity>

            <View className='w-16 h-16 border border-secondary rounded-lg flex justify-center items-center'>
              <Image
                source={{ uri: User?.avatar }}
                className='w-[90%] h-[90%] rounded-lg'
                resizeMode='cover'
              />
            </View>

            <InfoBox
              title={User?.username}
              containerStyles='mt-5'
              titleStyles='text-lg'
            />

            <View className='mt-5 flex flex-row'>
              <InfoBox
                title={posts?.length || 0}
                subtitle='Posts'
                titleStyles='text-xl'
                containerStyles='mr-10'
              />
              <InfoBox
                title='1.2k'
                subtitle='Followers'
                titleStyles='text-xl'
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
