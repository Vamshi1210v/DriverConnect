// ScratchCardScreen.tsx
import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import ScratchCard from 'react-native-scratch-card'

const { width } = Dimensions.get('window');

const ScratchCardScreen = () => {
  const onScratchDone = () => {
    console.log('Scratch Completed!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Scratch & Win!</Text>

      <ScratchCard
        brushSize={50}
        threshold={70}
        fadeOut={true}
        onScratchDone={onScratchDone}
        image={
          <View style={styles.prizeContainer}>
            <Text style={styles.prizeText}>🎉 You Won ₹100!</Text>
          </View>
        }
        style={styles.scratchArea}
        maskColor="#C5C5C5"
      >
        <Image
          source={require('../../assests/images/profile.png')}
          style={styles.overlayImage}
        />
      </ScratchCard>
    </View>
  );
};

export default ScratchCardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 30,
  },
  scratchArea: {
    width: width * 0.9,
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
  },
  prizeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0ffe0',
  },
  prizeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0a9800',
  },
  overlayImage: {
    width: '100%',
    height: '100%',
  },
});
