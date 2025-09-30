import React, { useEffect, useRef, useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import {
  mediaDevices,
  RTCPeerConnection,
  RTCView,
  RTCIceCandidate,
  RTCSessionDescription,
  MediaStream,
} from 'react-native-webrtc';

const iceServers = [
  { urls: 'stun:stun.l.google.com:19302' },
  // Add TURN server if you have one
  // { urls: 'turn:your.turn.server:3478', username: 'user', credential: 'pass' }
];

const pcConfig = { iceServers };

const DemoWebsocket: React.FC = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const pc = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    pc.current = new RTCPeerConnection(pcConfig);

    // Handle remote stream
    (pc.current as any).ontrack = (event: any) => {
        setRemoteStream(event.streams[0]);
      };

    return () => {
      pc.current?.close();
    };
  }, []);

  const startCall = async () => {
    // Get local stream
    const stream = await mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setLocalStream(stream);

    // Add tracks to peer connection
    stream.getTracks().forEach((track) => {
      pc.current?.addTrack(track, stream);
    });

    // Create an SDP offer
    const offer = await pc.current?.createOffer();
    await pc.current?.setLocalDescription(offer!);

    // Send `offer` to remote peer via your signaling server
    console.log('SDP Offer:', offer);
  };

  const handleAnswer = async (answer: RTCSessionDescription) => {
    await pc.current?.setRemoteDescription(new RTCSessionDescription(answer));
  };

  return (
    <View style={styles.container}>
      {localStream && (
        <RTCView
          streamURL={localStream.toURL()}
          style={styles.video}
          objectFit="cover"
        />
      )}
      {remoteStream && (
        <RTCView
          streamURL={remoteStream.toURL()}
          style={styles.video}
          objectFit="cover"
        />
      )}
      <Button title="Start Call" onPress={startCall} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: 400,
    height: 600,
    margin: 10,
    backgroundColor: 'black',
  },
});

export default DemoWebsocket;
