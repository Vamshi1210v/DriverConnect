import React, { useEffect, useState, useRef } from 'react';
import {
  mediaDevices,
  RTCPeerConnection,
  RTCView,
  RTCIceCandidate,
  RTCSessionDescription,
  MediaStream,
} from 'react-native-webrtc';
import { View, Button, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { supabase } from '../../services/supabase';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/NavigationTypes';
import type { RTCSessionDescriptionInit } from 'react-native-webrtc/lib/typescript/RTCSessionDescription';

const ICE_SERVERS = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

type VideoCallRouteProp = RouteProp<RootStackParamList, 'VideoCall'>;

interface Props {
  route: VideoCallRouteProp;
}

const VideoCall = ({ route }: Props) => {
  const { userId, roomId, remoteUserId } = route.params;

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const subscriptionRef = useRef<any>(null);

  useEffect(() => {
    console.log('[VideoCall] Initializing VideoCall', { userId, roomId, remoteUserId });

    const init = async () => {
      try {
        // -------------------
        // 1️⃣ Start local media
        // -------------------
        const stream = await mediaDevices.getUserMedia({ audio: true, video: true });
        setLocalStream(stream);
        console.log('[VideoCall] Local media stream started', stream);

        // -------------------
        // 2️⃣ Create PeerConnection
        // -------------------
        pcRef.current = new RTCPeerConnection(ICE_SERVERS);
        console.log('[VideoCall] RTCPeerConnection created');

        // Add local tracks
        stream.getTracks().forEach((track) => {
          pcRef.current?.addTrack(track, stream);
          console.log(`[VideoCall] Added local track: ${track.kind}`);
        });

        // -------------------
        // 3️⃣ Remote track
        // -------------------
        (pcRef.current  as any).ontrack = (event: any) => {
          if (event.streams && event.streams[0]) {
            setRemoteStream(event.streams[0]);
            console.log('[VideoCall] Remote stream received', event.streams[0]);
          }
        };

        // -------------------
        // 4️⃣ ICE candidates
        // -------------------
        (pcRef.current as any).onicecandidate = async (event: any) => {
          if (event.candidate) {
            console.log('[VideoCall] Sending ICE candidate:', event.candidate);
            const { error } = await supabase.from('webrtc_signaling').insert([
              {
                room_id: roomId,
                sender: userId,
                receiver: remoteUserId,
                type: 'ice',
                candidate: event.candidate.toJSON(),
              },
            ]);
            if (error) console.error('[VideoCall] Supabase ICE insert error:', error);
          }
        };

        // -------------------
        // 5️⃣ Subscribe to signaling
        // -------------------
        subscriptionRef.current = supabase
          .channel('webrtc-signaling-channel')
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'webrtc_signaling', filter: `room_id=eq.${roomId}` },
            async (payload: any) => {
              const msg = payload.new;
              if (!msg) return;
              if (msg.sender === userId) return; // Ignore our own messages

              console.log('[VideoCall] Received signal from table:', msg);

              switch (msg.type) {
                case 'offer':
                  await handleOffer(msg.sdp, msg.sender);
                  break;
                case 'answer':
                  await handleAnswer(msg.sdp);
                  break;
                case 'ice':
                  await handleIce(msg.candidate);
                  break;
                default:
                  console.warn('[VideoCall] Unknown signaling type:', msg.type);
              }
            }
          )
          .subscribe();
        console.log('[VideoCall] Subscribed to Supabase signaling channel');

      } catch (error) {
        console.error('[VideoCall] Init error:', error);
        Alert.alert('Init error', (error as Error).message);
      }
    };

    init();

    return () => {
      console.log('[VideoCall] Cleaning up');
      localStream?.getTracks().forEach((t) => t.stop());
      pcRef.current?.close();
      if (subscriptionRef.current) supabase.removeChannel(subscriptionRef.current);
      pcRef.current = null;
      setLocalStream(null);
      setRemoteStream(null);
    };
  }, []);

  // -------------------
  // Signaling Handlers
  // -------------------
  const createOffer = async () => {
    if (!pcRef.current) return;
    try {
      console.log('[VideoCall] Creating offer...');
      const offer = await pcRef.current.createOffer();
      await pcRef.current.setLocalDescription(offer);

      const { error } = await supabase.from('webrtc_signaling').insert([
        {
          room_id: roomId,
          sender: userId,
          receiver: remoteUserId,
          type: 'offer',
          sdp: JSON.stringify(offer), // Store as JSON string
        },
      ]);

      if (error) console.error('[VideoCall] Supabase offer insert error:', error);

      console.log('[VideoCall] Offer sent:', offer);
    } catch (error) {
      console.error('[VideoCall] Offer creation error:', error);
      Alert.alert('Offer error', (error as Error).message);
    }
  };

  const handleOffer = async (sdp: any, senderId: string) => {
    if (!pcRef.current) return;
    try {
      console.log('[VideoCall] Received offer:', sdp);

      // If sdp is stored as JSON string, parse it
      const offer = typeof sdp === 'string' ? JSON.parse(sdp) : sdp;

      await pcRef.current.setRemoteDescription(new RTCSessionDescription(offer));

      const answer = await pcRef.current.createAnswer();
      console.log('[VideoCall] Created answer:', answer);
      await pcRef.current.setLocalDescription(answer);

      const { error } = await supabase.from('webrtc_signaling').insert([
        {
          room_id: roomId,
          sender: userId,
          receiver: senderId,
          type: 'answer',
          sdp: JSON.stringify(answer), // Store as JSON string
        },
      ]);
      if (error) console.error('[VideoCall] Supabase answer insert error:', error);

      console.log('[VideoCall] Answer sent to DB');
    } catch (error) {
      console.error('[VideoCall] Offer handling error:', error);
      Alert.alert('Offer handling error', (error as Error).message);
    }
  };

  const handleAnswer = async (sdp: any) => {
    if (!pcRef.current) return;
    try {
      console.log('[VideoCall] Received answer:', sdp);

      const answer = typeof sdp === 'string' ? JSON.parse(sdp) : sdp;
      await pcRef.current.setRemoteDescription(new RTCSessionDescription(answer));

      console.log('[VideoCall] Answer set successfully');
    } catch (error) {
      console.error('[VideoCall] Answer handling error:', error);
      Alert.alert('Answer handling error', (error as Error).message);
    }
  };

  const handleIce = async (candidate: any) => {
    if (!pcRef.current) return;
    try {
      await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
      console.log('[VideoCall] ICE candidate added:', candidate);
    } catch (error) {
      console.warn('[VideoCall] ICE candidate error:', error);
    }
  };

  // -------------------
  // UI
  // -------------------
  return (
    <SafeAreaView style={styles.container}>
      {localStream && (
        <RTCView
          streamURL={localStream.toURL()}
          style={styles.localVideo}
          zOrder={1}
          objectFit="cover"
        />
      )}
      {remoteStream && (
        <RTCView
          streamURL={remoteStream.toURL()}
          style={styles.remoteVideo}
          zOrder={0}
          objectFit="cover"
        />
      )}
      <Button title="Start Call" onPress={createOffer} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  localVideo: {
    width: 120,
    height: 160,
    position: 'absolute',
    top: 40,
    right: 20,
    borderWidth: 1,
    borderColor: 'white',
    zIndex: 2,
  },
  remoteVideo: { flex: 1, backgroundColor: 'black' },
});

export default VideoCall;
