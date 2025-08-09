import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/NavigationTypes';

import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('✅ Login successful');
      navigation.navigate('Welcome');
    } catch (err) {
      console.error('❌ Login error:', (err as Error).message);
      setError((err as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.Text entering={FadeInDown.delay(100).duration(500)} style={styles.header}>
        Login to Your Account
      </Animated.Text>

      <Animated.View entering={FadeInUp.delay(200).duration(500)} style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
          style={styles.input}
        />
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(300).duration(500)} style={styles.inputContainer}>
        <TextInput
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          style={styles.input}
        />
      </Animated.View>

      {error ? (
        <Animated.Text entering={FadeInUp.delay(400)} style={styles.error}>
          {error}
        </Animated.Text>
      ) : null}

      <Animated.View entering={FadeInUp.delay(500).duration(500)} style={styles.button}>
        <Button title="Login" onPress={handleLogin} />
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(600).duration(500)} style={styles.button}>
        <Button title="Register" onPress={() => navigation.navigate('Register')} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 80,
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
  },
  button: {
    marginTop: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});
