import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/Home/HomeScreen';
import ProfileScreen from '../screens/Home/ProfileScreen';
import CustomDrawerContent from '../components/CustomDrawerContent';
import { Image, Text, TouchableOpacity } from 'react-native';
import Agreements from '../screens/Agreements/Agreements';
import Wallet from '../screens/Wallet/Wallet';
import FlatlistRevealAnimationScreen from '../components/CustomFlatlist/FlatlistRevealAnimationScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerType: 'slide',
        drawerStyle: {
          backgroundColor: 'transparent',
          width: 280,
        },
        headerStyle: {
          backgroundColor: '#3373B0',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => (
          <TouchableOpacity
            onPress={() => console.log('Icon pressed')}
            style={{ marginRight: 15 }}
          >
            <Image
              source={require('../assests/images/profile.png')}
              style={{ width: 35, height: 35, borderRadius: 17.5 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ),
        headerTitle: ({children}) =>(
          <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
            {children}
          </Text>
        ),
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} options={{title :"My APP"}} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Wallet" component={Wallet}/>
      <Drawer.Screen name="Agreements" component={Agreements} />
      <Drawer.Screen name="FlatlistRevealAnimationScreen" component={FlatlistRevealAnimationScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
