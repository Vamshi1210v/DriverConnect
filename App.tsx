import 'react-native-url-polyfill/auto';
import { useState, useEffect } from 'react';
import { supabase } from '../SkillSync/src/services/supabase';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getApp } from '@react-native-firebase/app';
import { getMessaging, requestPermission, getToken, onMessage, AuthorizationStatus } from '@react-native-firebase/messaging';
import { Alert, Platform } from 'react-native';
import { Session } from '@supabase/supabase-js';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  // Supabase session handling
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    supabase.auth.onAuthStateChange((_event, session) => setSession(session));
  }, []);

  // ----------------------------
  // Request notification permission
  // ----------------------------
  useEffect(() => {
    const setupFCM = async () => {
      try {
        const messaging = getMessaging(getApp());

        if (Platform.OS === 'ios') {
          const authStatus = await messaging.requestPermission();
          const enabled =
            authStatus === AuthorizationStatus.AUTHORIZED ||
            authStatus === AuthorizationStatus.PROVISIONAL;

          if (enabled) {
            const fcmToken = await getToken(messaging);
            console.log('[FCM] iOS token:', fcmToken);
          } else {
            console.log('[FCM] iOS permission denied');
          }
        } else {
          // Android < 33 no runtime permission required
          // Android 33+ requires POST_NOTIFICATIONS permission
          const fcmToken = await getToken(messaging);
          console.log('[FCM] Android token:', fcmToken);
        }

        // Listen to foreground messages
        const unsubscribe = onMessage(messaging, remoteMessage => {
          console.log('[FCM] Foreground message:', remoteMessage);
          if (remoteMessage.notification) {
            Alert.alert(remoteMessage.notification.title || '', remoteMessage.notification.body || '');
          }
        });

        return unsubscribe; // Cleanup listener
      } catch (err) {
        console.error('[FCM] Setup error:', err);
      }
    };

    setupFCM();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
