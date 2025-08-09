import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { use, useEffect } from 'react';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/NavigationTypes';
import { widthPercentageToDP as wp ,heightPercentageToDP as hp } from 'react-native-responsive-screen';

const WelcomeScreen = () => {
  const innerRingScale = useSharedValue(0);
  const outerRingScale = useSharedValue(0);
  const imageOpacity = useSharedValue(0);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Animated style for image (fade-in)
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: imageOpacity.value,
    };
  });

  const innerRingAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: innerRingScale.value }],
    };
  });

  const outerRingAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: outerRingScale.value }],
    };
  });

  useEffect(() => {
    // Step 1: Image fades in
    imageOpacity.value = withTiming(1, { duration: 500 });

    // Step 2: Inner ring expands after a short delay
    setTimeout(() => {
      innerRingScale.value = withSpring(1, { damping: 10, stiffness: 100 });
    }, 600);

    // Step 3: Outer ring expands after inner ring
    setTimeout(() => {
      outerRingScale.value = withSpring(1, { damping: 10, stiffness: 100 });
    }, 1000);
    setTimeout(() => {
      navigation.navigate('Intro'); // Navigate to Home after animation
    }
    , 2500);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* Outer ring wraps everything */}
      <Animated.View style={[styles.outerRing, outerRingAnimatedStyle]}>
        {/* Inner ring around image */}
        <Animated.View style={[styles.innerRing, innerRingAnimatedStyle]}>
          {/* Image in center */}
          <Animated.Image
            source={require('../assests/images/WelcomeScreen.png')}
            style={[styles.imageStyle, imageAnimatedStyle]}
          />
        </Animated.View>
      </Animated.View>

      <View style={{ position: 'absolute', bottom: hp(8), alignItems: 'center' }}>
        <Text style={{color:"#fff",fontSize:35,fontWeight:"400"}}>Best Fast Food</Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF8C00',
  },
  outerRing: {
    width: 300,
    height: 300,
    backgroundColor: '#FAC898',
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ scale: 0 }],
  },
  innerRing: {
    width: 220,
    height: 220,
    backgroundColor: '#FFB347',
    borderRadius: 110,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ scale: 0 }],
  },
  imageStyle: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
    borderRadius: 70,
    opacity: 0,
  },
});
