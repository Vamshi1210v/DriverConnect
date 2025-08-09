import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';

const RegisterScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Email and password are required.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('✅ Registration Successful!');
      navigation.navigate('Intro'); // Navigate to Intro screen after successful registration
    } catch (error: any) {
      console.error('Registration error:', error.message);
      Alert.alert('❌ Registration Error', error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text>Email:</Text>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text>Password:</Text>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen;
