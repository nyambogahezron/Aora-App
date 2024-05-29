import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.viewArea}>
      <Text>Welcome to Aora</Text>
      <StatusBar style='auto' />
      <Link href='/Profile' style={{ color: 'blue' }}>
        Go to Profile
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  viewArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
