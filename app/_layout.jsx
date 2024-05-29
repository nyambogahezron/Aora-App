import { Slot, Stack } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'
const RootLayout = () => {
  return (
  <Stack>
    <Stack.Screen name="index" options={{headerShown: false}} />
  </Stack>
  )
}
export default RootLayout

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: 20,
  }
})