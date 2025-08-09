import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/NavigationTypes';
  
const CustomDrawerContent = (props: any) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();


  const handleLogout = () => {
    navigation.navigate('Login'); // Navigate to Login screen
  }
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.header}>
        <Image
          source={require('../assests/images/profile.png')}
          style={styles.avatar}
        />
        <Text style={styles.username}>John Doe</Text>
        <Text style={styles.email}>john@example.com</Text>
      </View>

      <View style={styles.drawerList}>
        <DrawerItemList {...props} />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="log-out-outline" size={22} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: '#C892AF',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  avatar: {
    height: 70,
    width: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  username: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  email: {
    color: '#ddd',
    fontSize: 14,
  },
  drawerList: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  logoutButton: {
    backgroundColor: '#C892AF',
    margin: 20,
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    marginLeft: 10,
    fontWeight: 'bold',
  },
});

export default CustomDrawerContent;
