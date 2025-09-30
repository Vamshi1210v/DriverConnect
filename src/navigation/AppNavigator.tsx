import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/Demoscreens/HomeScreen';
import ProfileScreen from '../screens/Home/ProfileScreen';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Demoscreens/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import BottomTabs from './BottomTabs';
import WelcomeScreen from '../screens/WelcomeScreen';
import { RootStackParamList } from './NavigationTypes';
import DrawerNavigator from './DrawerNavigator';
import IntroScreens from '../screens/IntroScreens';
import Settings from '../screens/Settings/Settings';
import Agreements from '../screens/Agreements/Agreements';
import Wallet from '../screens/Wallet/Wallet';
import AddAmount from '../screens/Wallet/AddAmount';
import ReferAndEarn from '../screens/ReferAndEarn/ReferAndEarn';
import VideoCall from '../screens/Demoscreens/VideoCall';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name='BottomTabs' component={BottomTabs}/>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="VideoCall" component={VideoCall} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Intro" component={IntroScreens} />
      <Stack.Screen name="Main" component={DrawerNavigator} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Agreements" component={Agreements} />
      <Stack.Screen name="Wallet" component={Wallet}/>
      <Stack.Screen name="AddAmount" component={AddAmount}/>
      <Stack.Screen name="ReferAndEarn" component={ReferAndEarn}/>

{/* 

        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} /> */}
      </Stack.Navigator>
      {/* <BottomTabs/> */}
    </NavigationContainer>
  );
};

export default AppNavigator;
