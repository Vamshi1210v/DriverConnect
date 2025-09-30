import messaging from '@react-native-firebase/messaging';

// Request FCM permission and get device token
export const requestFCMPermission = async () => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('[FCM] Permission granted');
      const token = await messaging().getToken();
      console.log('[FCM] Device token:', token);
      return token;
    } else {
      console.log('[FCM] Permission denied');
      return null;
    }
  } catch (err) {
    console.error('[FCM] Permission request error:', err);
    return null;
  }
};
