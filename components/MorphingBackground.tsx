
import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  interpolate,
  withSequence,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/styles/commonStyles';

const { width, height } = Dimensions.get('window');

interface MorphingBackgroundProps {
  children?: React.ReactNode;
  intensity?: 'subtle' | 'medium' | 'intense';
  speed?: 'slow' | 'medium' | 'fast';
}

export default function MorphingBackground({
  children,
  intensity = 'medium',
  speed = 'medium'
}: MorphingBackgroundProps) {
  const morphValue = useSharedValue(0);
  const colorShift = useSharedValue(0);
  const waveValue = useSharedValue(0);

  const getDuration = () => {
    switch (speed) {
      case 'slow': return 8000;
      case 'medium': return 5000;
      case 'fast': return 3000;
      default: return 5000;
    }
  };

  useEffect(() => {
    const duration = getDuration();
    
    morphValue.value = withRepeat(
      withSequence(
        withTiming(1, { duration }),
        withTiming(0, { duration })
      ),
      -1,
      false
    );

    colorShift.value = withRepeat(
      withTiming(1, { duration: duration * 1.5 }),
      -1,
      true
    );

    waveValue.value = withRepeat(
      withTiming(1, { duration: duration * 0.7 }),
      -1,
      false
    );
  }, [speed]);

  const morphingStyle1 = useAnimatedStyle(() => {
    const scale = interpolate(morphValue.value, [0, 0.5, 1], [1, 1.3, 0.8]);
    const translateX = interpolate(morphValue.value, [0, 1], [0, width * 0.3]);
    const translateY = interpolate(morphValue.value, [0, 1], [0, height * 0.2]);
    const rotate = interpolate(morphValue.value, [0, 1], [0, 180]);

    return {
      transform: [
        { scale },
        { translateX },
        { translateY },
        { rotate: `${rotate}deg` }
      ],
    };
  });

  const morphingStyle2 = useAnimatedStyle(() => {
    const scale = interpolate(morphValue.value, [0, 0.5, 1], [0.6, 1.1, 1.4]);
    const translateX = interpolate(morphValue.value, [0, 1], [width * 0.5, -width * 0.2]);
    const translateY = interpolate(morphValue.value, [0, 1], [height * 0.7, height * 0.1]);
    const rotate = interpolate(morphValue.value, [0, 1], [45, -90]);

    return {
      transform: [
        { scale },
        { translateX },
        { translateY },
        { rotate: `${rotate}deg` }
      ],
    };
  });

  const morphingStyle3 = useAnimatedStyle(() => {
    const scale = interpolate(morphValue.value, [0, 0.5, 1], [1.2, 0.7, 1.5]);
    const translateX = interpolate(morphValue.value, [0, 1], [-width * 0.1, width * 0.6]);
    const translateY = interpolate(morphValue.value, [0, 1], [height * 0.3, height * 0.8]);
    const rotate = interpolate(morphValue.value, [0, 1], [0, 270]);

    return {
      transform: [
        { scale },
        { translateX },
        { translateY },
        { rotate: `${rotate}deg` }
      ],
    };
  });

  const waveStyle = useAnimatedStyle(() => {
    const translateY = interpolate(waveValue.value, [0, 1], [0, 50]);
    const scaleY = interpolate(waveValue.value, [0, 0.5, 1], [1, 1.5, 1]);

    return {
      transform: [
        { translateY },
        { scaleY }
      ],
    };
  });

  const getIntensityOpacity = () => {
    switch (intensity) {
      case 'subtle': return 0.3;
      case 'medium': return 0.5;
      case 'intense': return 0.7;
      default: return 0.5;
    }
  };

  const opacity = getIntensityOpacity();

  return (
    <View style={styles.container}>
      {/* Couche de base */}
      <LinearGradient
        colors={[colors.background, colors.surface, colors.surfaceLight]}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Formes morphantes */}
      <Animated.View style={[styles.morphShape, morphingStyle1, { opacity }]}>
        <LinearGradient
          colors={[colors.primary + '80', colors.secondary + '60']}
          style={styles.gradientShape}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>

      <Animated.View style={[styles.morphShape, morphingStyle2, { opacity: opacity * 0.8 }]}>
        <LinearGradient
          colors={[colors.accent + '70', colors.tertiary + '50']}
          style={styles.gradientShape}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
      </Animated.View>

      <Animated.View style={[styles.morphShape, morphingStyle3, { opacity: opacity * 0.6 }]}>
        <LinearGradient
          colors={[colors.secondary + '60', colors.primary + '40']}
          style={styles.gradientShape}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
      </Animated.View>

      {/* Effet de vague */}
      <Animated.View style={[styles.waveContainer, waveStyle]}>
        <LinearGradient
          colors={[colors.accent + '30', 'transparent', colors.primary + '20']}
          style={styles.wave}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </Animated.View>

      {/* Contenu */}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  morphShape: {
    position: 'absolute',
    width: width * 0.8,
    height: height * 0.6,
    borderRadius: width * 0.4,
  },
  gradientShape: {
    flex: 1,
    borderRadius: width * 0.4,
  },
  waveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  wave: {
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  content: {
    flex: 1,
    zIndex: 10,
  },
});
