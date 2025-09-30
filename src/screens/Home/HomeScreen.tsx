import React from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DataCard from "./DataCard";
import TabOne from "./TabOne";
import TabTwo from "./TabTwo";

const Tab = createMaterialTopTabNavigator();

const HomeScreenTabs = () => {
  const { width } = useWindowDimensions();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabelStyle: { fontSize: 14, fontWeight: "600" },
        tabBarStyle: {
          backgroundColor: "#fff",
          marginHorizontal: 10,
          marginTop: 10,
          borderRadius: 20,
          elevation: 2,
          shadowColor: "#fff",
          borderColor:"#ff6f00"
        },
        tabBarActiveTintColor: "#FF6F00",
        tabBarInactiveTintColor: "#999",
        tabBarIndicatorStyle: {
          backgroundColor: "#FF6F00",
          height: 4,
          borderRadius: 2,
          width: width / 2.6,
          marginLeft: width / 20,
        },
        tabBarShowIcon: true,
      })}
    >
      <Tab.Screen name="TabOne" component={TabOne} options={{ title: "Home" }} />
      <Tab.Screen name="TabTwo" component={TabTwo} options={{ title: "Tasks" }} />
    </Tab.Navigator>
  );
};

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <HomeScreenTabs />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  center: {
    width: "90%",
    borderRadius: 10,
    backgroundColor: "#fff",
    alignSelf: "center",
    top: 10,
    // height:"70%"
  },
  tabText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
    paddingLeft: 10
  },
  paidView: {
    backgroundColor: "#FF6F00",
    paddingHorizontal: 10,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    height: 30,
  },
  paidText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  scrollContainer: {
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  label: {
    fontWeight: "600",
    marginRight: 5,
    color: "#555",
  },
  description: {
    flex: 1,
    color: "#666",
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconText: {
    marginLeft: 10,
    fontSize: 15,
    color: "#333",
  },
  blockRow: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
    justifyContent: "space-between",
  },
  block: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#F2F2F2",
    borderRadius: 8,
  },
  randomTextBox: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    borderWidth: 1,
    borderColor: "#F2F2F2",
    borderRadius: 10,
  },
  randomText: {
    fontSize: 18,
    color: "#808080",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: "#444",
  },
  card: {
    backgroundColor: "#fff",
    width: "95%",
    alignSelf: "center",
    borderRadius: 12,
    padding: 16,
    marginVertical: 20,
  
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  
    // Android elevation
    elevation: 4,
  },
  ActiveFooterRow:{
    borderWidth: 1,
    borderColor: "##F3F3F1",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#05714B",
    flexDirection: "row",
    gap: 10,
    width: "95%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText:{
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",

  }

});
