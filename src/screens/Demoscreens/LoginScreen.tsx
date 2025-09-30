import React, { useState } from 'react';
import { Alert, StyleSheet, View, TextInput, Button, Text } from 'react-native';
import { supabase } from '../../services/supabase';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/NavigationTypes';

export default function LoginScreen() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // --------------------------
  // Sign In
  // --------------------------
  async function signInWithEmail(): Promise<void> {
    try {
      setLoading(true);

      const { data: { session }, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        Alert.alert(error.message);
        return;
      }

      if (!session) {
        Alert.alert('Login failed. Please check your credentials.');
        return;
      }

      const user = session.user;
      setUserId(user.id);

      // Mark user as online
      await supabase.from('online_users').upsert({
        user_id: user.id,
        email: user.email,
        status: 'online',
        last_seen: new Date(),
      });

      // Navigate to Home
      navigation.navigate('Home', { userId: user.id });

    } catch (err) {
      console.error('Sign-in error:', err);
      Alert.alert('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  // --------------------------
  // Sign Up
  // --------------------------
  async function signUpWithEmail(): Promise<void> {
    try {
      setLoading(true);
      const { data: { session }, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        Alert.alert(error.message);
        return;
      }

      if (!session) {
        Alert.alert('Please check your inbox for email verification!');
      }
    } catch (err) {
      console.error('Sign-up error:', err);
      Alert.alert('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        autoCapitalize="none"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.button}>
        <Button title="Sign in" disabled={loading} onPress={signInWithEmail} />
      </View>
      <View style={styles.button}>
        <Button title="Sign up" disabled={loading} onPress={signUpWithEmail} />
      </View>

      <Text>User ID: {userId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 8,
    borderRadius: 6,
  },
  button: {
    marginVertical: 8,
  },
});
