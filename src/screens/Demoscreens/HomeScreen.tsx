import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { supabase } from '../../services/supabase';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/NavigationTypes';

interface OnlineUser {
  user_id: string;
  email?: string;
  status: string;
}

export default function HomeScreen() {
  const [userId, setUserId] = useState<string | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // --------------------------
  // Fetch logged-in user
  // --------------------------
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) setUserId(data.user.id);
    };
    fetchUser();
  }, []);

  // --------------------------
  // Fetch online users
  // --------------------------
  useEffect(() => {
    if (!userId) return;

    const fetchOnlineUsers = async () => {
      const { data, error } = await supabase
        .from('online_users')
        .select('*')
        .eq('status', 'online')
        .neq('user_id', userId);

      if (error) {
        Alert.alert('Error fetching users', error.message);
        return;
      }

      setOnlineUsers(data || []);
    };

    fetchOnlineUsers();

    // Subscribe to online_users changes
    const onlineSubscription = supabase
      .channel('online_users')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'online_users' }, (payload) => {
        const newUser = payload.new as OnlineUser;
        if (newUser.user_id === userId) return; // skip self

        setOnlineUsers(prev => {
          if (newUser.status === 'online') {
            // add or update
            return [...prev.filter(u => u.user_id !== newUser.user_id), newUser];
          } else {
            // remove offline
            return prev.filter(u => u.user_id !== newUser.user_id);
          }
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(onlineSubscription);
    };
  }, [userId]);

  // --------------------------
  // Subscribe to incoming calls
  // --------------------------
  useEffect(() => {
    if (!userId) return;

    const callSubscription = supabase
      .channel('webrtc_signaling')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'webrtc_signaling', filter: `receiver=eq.${userId}` }, (payload) => {
        const call = payload.new as any;
        console.log('[HomeScreen] Incoming call:', call);

        if (call.type === 'offer') {
          Alert.alert('Incoming Call', `Call from ${call.sender}`, [
            {
              text: 'Answer',
              onPress: () => {
                navigation.navigate('VideoCall', {
                  userId,
                  roomId: call.room_id,
                  remoteUserId: call.sender,
                });
              },
            },
            { text: 'Reject', style: 'cancel' },
          ]);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(callSubscription);
    };
  }, [userId]);

  // --------------------------
  // Start a call
  // --------------------------
  const startCallWith = async (remoteUserId: string) => {
    if (!userId) return;

    const ids = [userId.toString(), remoteUserId.toString()].sort();
    const roomId = ids.join('-');
    console.log('[VideoCall] Computed roomId:', roomId, { userId, remoteUserId, sortedIds: ids });

    navigation.navigate('VideoCall', { userId, roomId, remoteUserId });
  };

  // --------------------------
  // Render
  // --------------------------
  if (!userId) return null;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Online Users:</Text>
      {onlineUsers.length === 0 && <Text>No users online</Text>}
      <FlatList
        data={onlineUsers}
        keyExtractor={(item) => item.user_id}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text style={styles.userText}>{item.email || item.user_id}</Text>
            <Button title="Call" onPress={() => startCallWith(item.user_id)} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  userItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  userText: { fontSize: 16 },
});
