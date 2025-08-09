// components/VerificationScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

const API_KEY = 'YOUR_SUREPASS_API_KEY_HERE';

const Verifications = () => {
  const [pan, setPan] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [otp, setOtp] = useState('');
  const [aadhaarTxnId, setAadhaarTxnId] = useState('');
  const [dlNumber, setDlNumber] = useState('');
  const [dlDob, setDlDob] = useState('');

  // 1. PAN Verification
  const verifyPAN = async () => {
    try {
      const response = await fetch('https://kyc-api.surepass.io/api/v1/pan/pan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify({ id_number: pan }),
      });
      const data = await response.json();
      console.log(data);
      Alert.alert('PAN Response', JSON.stringify(data));
    } catch (err) {
      console.error(err);
      Alert.alert('PAN Error', 'Verification failed');
    }
  };

  // 2. Aadhaar - Step 1 (Generate OTP)
  const generateAadhaarOTP = async () => {
    try {
      const response = await fetch('https://kyc-api.surepass.io/api/v1/aadhaar-v2/generate-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify({ id_number: aadhaar }),
      });
      const data = await response.json();
      setAadhaarTxnId(data.data.txn_id);
      Alert.alert('OTP Sent', 'Check your Aadhaar-linked mobile.');
    } catch (err) {
      console.error(err);
      Alert.alert('Aadhaar OTP Error', 'Failed to generate OTP');
    }
  };

  // 3. Aadhaar - Step 2 (Verify OTP)
  const verifyAadhaarOTP = async () => {
    try {
      const response = await fetch('https://kyc-api.surepass.io/api/v1/aadhaar-v2/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify({ otp: otp, txn_id: aadhaarTxnId }),
      });
      const data = await response.json();
      console.log(data);
      Alert.alert('Aadhaar Verified', JSON.stringify(data));
    } catch (err) {
      console.error(err);
      Alert.alert('OTP Error', 'OTP verification failed');
    }
  };

  // 4. Driving License Verification
  const verifyDL = async () => {
    try {
      const response = await fetch('https://kyc-api.surepass.io/api/v1/dl-basic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify({
          id_number: dlNumber,
          dob: dlDob, // Format: "DD-MM-YYYY"
        }),
      });
      const data = await response.json();
      console.log(data);
      Alert.alert('DL Verification', JSON.stringify(data));
    } catch (err) {
      console.error(err);
      Alert.alert('DL Error', 'DL verification failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>PAN Verification</Text>
      <TextInput style={styles.input} placeholder="PAN Number" value={pan} onChangeText={setPan} />
      <Button title="Verify PAN" onPress={verifyPAN} />

      <Text style={styles.header}>Aadhaar Verification</Text>
      <TextInput style={styles.input} placeholder="Aadhaar Number" value={aadhaar} onChangeText={setAadhaar} />
      <Button title="Send OTP" onPress={generateAadhaarOTP} />
      <TextInput style={styles.input} placeholder="Enter OTP" value={otp} onChangeText={setOtp} />
      <Button title="Verify OTP" onPress={verifyAadhaarOTP} />

      <Text style={styles.header}>DL Verification</Text>
      <TextInput style={styles.input} placeholder="DL Number" value={dlNumber} onChangeText={setDlNumber} />
      <TextInput style={styles.input} placeholder="DOB (DD-MM-YYYY)" value={dlDob} onChangeText={setDlDob} />
      <Button title="Verify DL" onPress={verifyDL} />
    </View>
  );
}

export default Verifications;

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, marginVertical: 10, padding: 10, borderRadius: 5 },
  header: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
});
