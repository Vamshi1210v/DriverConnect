import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import {cardData} from "./data"; // Assuming you have some data to display

const DataCard = () => {
    
const [data, setData] = React.useState(cardData); // Initialize with your data
  return (
 <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
    {data.map((item, index) => (
    <View key={item.id} style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.tabText}>{item.title}</Text>
        <View style={styles.paidView}>
          <Text style={styles.paidText}>{item.paymentMethod}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Text:</Text>
        <Text style={styles.description}>
         {item.description}
        </Text>
      </View>

      <View style={styles.iconRow}>
        <Ionicons name="radio-button-on-outline" size={20} color="red" />
        <Text style={styles.iconText}>Text1</Text>
      </View>

      <View style={styles.iconRow}>
        <Ionicons name="ellipsis-vertical-outline" size={20} color="#333" />
      </View>

      <View style={styles.iconRow}>
        <Ionicons name="location-outline" size={20} color="green" />
        <Text style={styles.iconText}>Text2</Text>
      </View>

      {/* Block Sections */}
      <View style={styles.blockRow}>
        <View style={styles.block} />
        <View style={styles.block} />
        <View style={styles.block} />
      </View>

      <View style={styles.blockRow}>
        <View style={styles.block} />
        <View style={styles.block} />
      </View>

      <View style={styles.blockRow}>
        <View style={styles.block} />
      </View>

      {/* Random Text Block */}
      <View style={styles.randomTextBox}>
        <Text style={styles.randomText}>{item.location}</Text>
      </View>

      {/* Footer Row Text */}
      <View style={styles.footerRow}>
        <Text style={styles.footerText}>Text1 :</Text>
        <Text style={styles.footerText}>Text2</Text>
      </View>

      <View style={styles.footerRow}>
        <Text style={styles.footerText}>Text1 :</Text>
        <Text style={styles.footerText}>Text2</Text>
      </View>

      <TouchableOpacity style={styles.ActiveFooterRow}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
    ))}
  </ScrollView>
  )
}

export default DataCard

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