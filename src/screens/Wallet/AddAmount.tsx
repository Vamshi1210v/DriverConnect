import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput, Platform, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/NavigationTypes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const AddAmount = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [amount, setAmount] = useState("");

  const handleAddAmount = () => {
    Alert.alert("Amount Added successfully")
  }
  return (
    <SafeAreaView style={styles.safeArea}>
    <LinearGradient colors={['#f0f4ff', '#e8f0fe']} >
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backArrowButton} onPress={() => navigation.goBack()}>
          <View style={styles.iconCircle}>
            <Ionicons name="arrow-back" size={22} color="#ffffff" />
          </View>
        </TouchableOpacity>
        <Text style={styles.title}>Add Amount</Text>
        <Text></Text>
      </View>

      {/* Input Section */}
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <Text style={styles.currencySymbol}>₹</Text>
          <TextInput
            style={styles.input}
            placeholder="0"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </View>
        <Text style={styles.hintText}>Minimum ₹100 required</Text>
      </View>

      {/* Proceed Button */}
      <TouchableOpacity style={styles.buttonWrapper} onPress={handleAddAmount}>
        <LinearGradient colors={['#4c8bf5', '#2862C7']} style={styles.proceedMoney}>
          <Text style={styles.proceedMoneyText}>Proceed to Add Money</Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
    </SafeAreaView>
  );
};

export default AddAmount;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  headerRow: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-between"
  },
  backArrowButton: {
    marginRight: 10
  },
  iconCircle: {
    backgroundColor: "#2862C7",
    borderRadius: 20,
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
    left: 10
  },
  title: {
    fontSize: 22,
    color: '#000',
    fontWeight: 'bold',
  },
  container: {
    marginTop: 50,
    alignItems: "center",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 15,
    paddingHorizontal: 15,
    width: "90%",
    height: 100,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  currencySymbol: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#2862C7",
    marginRight: 5,
  },
  input: {
    fontSize: 40,
    fontWeight: "600",
    flex: 1,
    color: "#000",
  },
  hintText: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
  },
  buttonWrapper: {
    marginTop: 60,
    alignItems: "center"
  },
  proceedMoney: {
    borderRadius: 25,
    width: '80%',
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  proceedMoneyText: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "600"
  }
});
