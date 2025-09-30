// import React from 'react';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import AppNavigator from './src/navigation/AppNavigator';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import LoginScreen from './src/screens/Demoscreens/LoginScreen';

// const App = () => {
//   return (
    // <GestureHandlerRootView style={{ flex: 1 }}>
    //   <SafeAreaProvider>
    //     {/* <AppNavigator /> */}
    //     <LoginScreen/>
    //   </SafeAreaProvider>
    // </GestureHandlerRootView>
//   );
// };

// export default App;


import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from '../SkillSync/src/services/supabase'
import LoginScreen from './src/screens/Demoscreens/LoginScreen'
import { View, Text } from 'react-native'
import { Session } from '@supabase/supabase-js'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

 
  

  return (
    // <View>
    //   <LoginScreen />
    //   {/* {session && session.user && <Text>{session.user.id}</Text>} */}
    // </View>
        <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <AppNavigator />
        </SafeAreaProvider>
      </GestureHandlerRootView>
  )
}