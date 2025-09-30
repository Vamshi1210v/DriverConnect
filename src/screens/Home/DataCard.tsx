import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import { cardData } from "./data"; // Assuming you have some data to display
import Icon from 'react-native-vector-icons/FontAwesome6';

type DataCardProps = {
  option: string;
};

const DataCard: React.FC<DataCardProps> = ({ option }) => {

  const [data, setData] = React.useState(cardData); // Initialize with your data

  const handlebooking = () => {
    // Handle booking logic here
    console.log("Booking accepted");
    // You can also update the state or perform any other actions
  }
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
            <Text style={styles.label}>Pickup:</Text>
            <Text style={styles.description}>
              {item.description}
            </Text>
          </View>

          <View style={styles.iconRow}>
            <Ionicons name="radio-button-on-outline" size={20} color="red" />
            {/* <Text style={styles.iconText}>Pickup</Text> */}
            <Text style={styles.description}>{item.description}</Text>
          </View>

          <View style={styles.iconRow}>
            <Ionicons name="ellipsis-vertical-outline" size={20} color="#333" />
          </View>

          <View style={styles.iconRow}>
            <Ionicons name="location-outline" size={20} color="green" />
            {/* <Text style={styles.iconText}>Drop</Text> */}
            <Text style={styles.description}>{item.description}</Text>
          </View>

          {/* Block Sections */}
          <View style={styles.blockRow}>
            <View style={styles.block1}>
              <Text>
                <Icon name="indian-rupee-sign" size={15} color="#000" /> 450
              </Text>
            </View>
            <View style={styles.block1}>
              <Text>
                <Icon name="car-side" size={15} color="#000" /> SEDAN(AC)
              </Text>
            </View>
            <View style={styles.block1}>
              <Text>
                <Icon name="arrow-right-arrow-left" size={15} color="#000" /> 70.0 KM
              </Text>

            </View>
          </View>

          <View style={styles.blockRow}>
            <View style={styles.block}>
              <Text>  Rs 17.0/km </Text>
              <Text style={styles.randomText}>(for extra km)</Text>
            </View>

            <View style={styles.block} >
              <Text> Included</Text>
              <Text style={styles.randomText}>(driver charge)</Text>
            </View>
          </View>

          {/* Random Text Block */}
          <View style={styles.randomTextBox}>
            <Text style={styles.randomText}>Toll & State Tax Extra Parking Extra if applicable</Text>
          </View>

          {/* Footer Row Text */}
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Departure :</Text>
            <Text style={styles.footerText}>Aug 10,2025 05:00 am</Text>
          </View>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Arrival :</Text>
            <Text style={styles.footerText}>Aug 10,2025</Text>
          </View>

          {option === "one" &&

            <TouchableOpacity style={styles.ActiveFooterRow} onPress={handlebooking}>
              <Text style={styles.buttonText}>Accept Booking</Text>
            </TouchableOpacity>
          }
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
    left: 10,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  iconText: {
    marginLeft: 10,
    right: 10,
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
    justifyContent: "center",
    alignItems: "center",
  },
  block1: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#F2F2F2",
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around"
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
    fontSize: 14,
    color: "#808080",
    textAlign: "center",
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
  ActiveFooterRow: {
    borderWidth: 1,
    borderColor: "#ffffff",
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
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",

  }

});