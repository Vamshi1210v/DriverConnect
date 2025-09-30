import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home/HomeScreen"; 
import ProfileScreen from "../screens/Home/ProfileScreen"; 
import Ionicons from "react-native-vector-icons/Ionicons";
import { View, Text } from "react-native";

const Tab = createBottomTabNavigator();

const CustomTabIcon = ({ name, focused }: { name: string; focused: boolean }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Ionicons name={name} size={24} color={focused ? "#4B0082" : "gray"} />
      {focused && <Text style={{ fontSize: 10, color: "#4B0082" }}>●</Text>}
    </View>
  );
};

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { height: 60, backgroundColor: "white" },
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === "Home") iconName = "home-outline";
          else if (route.name === "Profile") iconName = "person-outline";
          else if (route.name === "Courses") iconName = "play-circle-outline";
          else if (route.name === "Schedule") iconName = "calendar-outline";

          return <CustomTabIcon name={iconName!} focused={focused} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      {/* <Tab.Screen name="Courses" component={HomeScreen} />
      <Tab.Screen name="Schedule" component={HomeScreen} /> */}
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
