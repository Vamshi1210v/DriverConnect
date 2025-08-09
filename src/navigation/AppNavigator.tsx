import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/Home/HomeScreen';
import ProfileScreen from '../screens/Home/ProfileScreen';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import BottomTabs from './BottomTabs';
import WelcomeScreen from '../screens/WelcomeScreen';
import { RootStackParamList } from './NavigationTypes';
import DrawerNavigator from './DrawerNavigator';
import IntroScreens from '../screens/IntroScreens';
import Settings from '../screens/Settings/Settings';
import Agreements from '../screens/Agreements/Agreements';
import Wallet from '../screens/Wallet/Wallet';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Intro" component={IntroScreens} />
        <Stack.Screen name="Main" component={DrawerNavigator} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Agreements" component={Agreements} />
        <Stack.Screen name="Wallet" component={Wallet}/>

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
