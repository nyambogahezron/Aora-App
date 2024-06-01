import { ToastAndroid, Platform, AlertIOS } from 'react-native';

export function toast(msg) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    AlertIOS.alert(msg);
  }
}
