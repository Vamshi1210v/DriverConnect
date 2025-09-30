import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
// import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import Ionicons from "react-native-vector-icons/Ionicons";
import { RootStackParamList } from '../../navigation/NavigationTypes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Settings'>;

const badges = [
  require('../../assests/images/badge1.png'),
  require('../../assests/images/badge1.png'),
  require('../../assests/images/badge1.png'),
  require('../../assests/images/badge1.png'),
  require('../../assests/images/badge1.png'),
  require('../../assests/images/badge1.png'),
];

const bookings = [
  {
    title: 'Crispy Calamari',
    date: '24 July',
    time: '10.00 AM',
    coins: '12,560',
  },
  {
    title: 'Teatro Cubano',
    date: '26 July',
    time: '12.00 PM',
    coins: '10,560',
  },
];

const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleBackPress = () => {
    navigation.goBack();
  };
  const handleSettingsPress = () => {
    navigation.navigate('Settings');
  };

  const handleReferandEarn =() => {
    navigation.navigate("ReferAndEarn");
  };

  const handleNavigateToVerifications = () => {
    // navigation.navigate('Verifications');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subConatiner}>
      <View style={styles.headerCard}>
        <View style={styles.mainRow}>
      <TouchableOpacity style={styles.backArrowButton} onPress={handleBackPress}>
      <Ionicons name="arrow-back-circle-outline" size={30} color="#ffffff" />
          </TouchableOpacity>
      <TouchableOpacity style={styles.settingsButton} onPress={handleSettingsPress}>
            <Text style={styles.settingsText}>Settings</Text>
          </TouchableOpacity>
          </View>
        <View style={styles.userRow}>
          <Image
            source={require('../../assests/images/profile.png')}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.name}>Jenny Wilson</Text>
            <Text style={styles.location}>1234567890</Text>
            <Text style={styles.location}>jenny@gmail.com</Text>
            <View style={styles.pointsRow}>
          <View style={styles.pointItem}>
            <Ionicons name="location" size={25} color="#00C853" />
            <Text style={styles.pointText}>70</Text>
          </View>
          <View style={styles.pointItem}>
            <Ionicons name="wallet-outline" size={25} color="#FFC107" />
            <Text style={styles.pointText}>12,560</Text>
          </View>
        </View>
          </View>

        </View>


      </View>

      <View style={styles.badgeSection}>
        <Text style={styles.sectionTitle}>Badges</Text>

        <TouchableOpacity style={styles.badgesRow} onPress={handleNavigateToVerifications}>
          <Text>Verifications</Text>
        </TouchableOpacity>


        {/* Uncomment the following section if you want to display badges */}
        {/* <View style={styles.badgesRow}>
          {badges.map((badge, index) => (
            <Image key={index} source={badge} style={styles.badgeIcon} />
          ))}
        </View> */}
      </View>

      <View>
        {bookings.map((booking, index) => (
          <View key={index} style={styles.bookingCard}>
            <View style={styles.bookingRow}>
              <Text style={styles.bookingTitle}>{booking.title}</Text>
              <Ionicons name="fast-food-outline" size={25} color="#3696F7" />
            </View>
            <View style={styles.bookingDetails}>
              <Ionicons name="calendar" size={16} color="#6C63FF" />
              <Text style={styles.bookingInfo}>{booking.date}</Text>
              <Ionicons name="time-outline" size={16} color="#6C63FF" />
              <Text style={styles.bookingInfo}>{booking.time}</Text>
              <Ionicons name="wallet-outline" size={16} color="#FFC107" />
              <Text style={styles.bookingInfo}>{booking.coins}</Text>
            </View>
          </View>
        ))}
      </View>
      
      <TouchableOpacity style={styles.referWrapper} onPress={handleReferandEarn}>
          <LinearGradient colors={['#FF6B9A', '#FF4081']} style={styles.referButton}>
            <Ionicons name="add-circle-outline" size={20} color="#fff" />
            <Text style={styles.referText}>Invite Friends, Earn Rewards</Text>
          </LinearGradient>
        </TouchableOpacity>
      
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E6ECFF',
    flex: 1,
  },
  subConatiner: {
    flex: 1,
    padding: 20,
  },
  headerCard: {
    backgroundColor: '#3696F7',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  mainRow:{
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  backArrowButton:{
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userRow: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 40,
    marginRight: 15,
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  location: {
    color: '#ddd',
    fontSize: 14,
    top:1
  },
  settingsButton: {
    marginLeft: 'auto',
    backgroundColor: '#D6A198',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    width: "30%",
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  pointsRow: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 12,
  },
  pointItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    gap: 5,
  },
  pointText: {
    color: '#fff',
    fontSize: 18,
  },
  badgeSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 12,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  badgeIcon: {
    width: 100,
    height: 100,
    borderRadius: 24,
    backgroundColor: '#F6F6F6',
    padding: 10,
  },
  bookingCard: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
  },
  bookingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  bookingTitle: {
    fontWeight: '600',
    fontSize: 15,
  },
  bookingDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  bookingInfo: {
    fontSize: 13,
    color: '#444',
    marginRight: 10,
  },
  referWrapper: {
     marginTop: 20 ,
     paddingVertical: 14,
     borderRadius: 30,
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'center',
    },
  referButton: {
     height:60,
     width:"90%",
     borderRadius:30,
     flexDirection:"row",
     alignItems:"center",
     justifyContent:"center"
  },
  referText: { color: '#fff', fontWeight: '600', marginLeft: 10,textAlign:'center' },
});

export default ProfileScreen;
