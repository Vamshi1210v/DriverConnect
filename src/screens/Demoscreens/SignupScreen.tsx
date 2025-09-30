// src/screens/SignupScreen.tsx
import React, { useContext, useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { AuthContext } from '../../context/AuthContext';

export default function SignupScreen({ navigation }: any) {
  const { signUp } = useContext(AuthContext)!;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    try {
      await signUp(email, password);
      navigation.replace('Home');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Signup</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{ borderWidth: 1, marginBottom: 10 }} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={{ borderWidth: 1, marginBottom: 10 }} />
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      <Button title="Signup" onPress={handleSignup} />
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}
