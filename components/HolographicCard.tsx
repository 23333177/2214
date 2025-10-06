
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/styles/commonStyles';

const { width } = Dimensions.get('window');

interface HolographicCardProps {
  children: React.ReactNode;
  style?: any;
  intensity?: 'low' | 'medium' | 'high';
  animated?: boolean;
}

export default function HolographicCard({
  children,
  style,
  intensity = 'medium',
  animated = true
}: HolographicCardProps) {
  const shimmer = useSharedValue(0);
  const glow = useSharedValue(0);
  const rainbow = useSharedValue(0);

  React.useEffect(() => {
    if (animated) {
      shimmer.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 2000 }),
          withTiming(0, { duration: 2000 })
        ),
        -1,
        false
      );

      glow.value = withRepeat(
        withTiming(1, { duration: 3000 }),
        -1,
        true
      );

      rainbow.value = withRepeat(
        withTiming(1, { duration: 4000 }),
        -1,
        false
      );
    }
  }, [animated, glow, rainbow, shimmer]);

  const getIntensityMultiplier = () => {
    switch (intensity) {
      case 'low': return 0.3;
      case 'medium': return 0.6;
      case 'high': return 1;
      default: return 0.6;
    }
  };

  const intensityMultiplier = getIntensityMultiplier();

  const shimmerStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      shimmer.value,
      [0, 1],
      [-width, width]
    );

    return {
      transform: [{ translateX }],
      opacity: interpolate(shimmer.value, [0, 0.5, 1], [0, 0.8, 0]) * intensityMultiplier,
    };
  });

  const glowStyle = useAnimatedStyle(() => {
    const scale = interpolate(glow.value, [0, 1], [1, 1.05]);
    const opacity = interpolate(glow.value, [0, 1], [0.5, 0.9]) * intensityMultiplier;

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  const rainbowStyle = useAnimatedStyle(() => {
    const hue = interpolate(rainbow.value, [0, 1], [0, 360]);
    
    return {
      opacity: 0.4 * intensityMultiplier,
    };
  });

  const holographicColors = [
    '#FF0080', // Magenta
    '#0080FF', // Cyan
    '#80FF00', // Vert lime
    '#FF8000', // Orange
    '#8000FF', // Violet
    '#00FF80', // Vert menthe
    '#FF0040', // Rouge rose
    '#4000FF', // Bleu violet
  ];

  return (
    <View style={[styles.container, style]}>
      {/* Couche de base holographique */}
      <Animated.View style={[styles.holographicBase, glowStyle]}>
        <LinearGradient
          colors={[
            colors.surface + 'E0',
            colors.surfaceLight + 'F0',
            colors.surface + 'E0'
          ]}
          style={styles.baseGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>

      {/* Effet arc-en-ciel */}
      <Animated.View style={[styles.rainbowLayer, rainbowStyle]}>
        <LinearGradient
          colors={holographicColors}
          style={styles.rainbow}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>

      {/* Effet de brillance */}
      <Animated.View style={[styles.shimmerLayer, shimmerStyle]}>
        <LinearGradient
          colors={['transparent', '#FFFFFF60', 'transparent']}
          style={styles.shimmer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </Animated.View>

      {/* Bordures holographiques */}
      <View style={styles.borderContainer}>
        <LinearGradient
          colors={[colors.primary + '80', colors.secondary + '80', colors.accent + '80']}
          style={styles.topBorder}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
        <LinearGradient
          colors={[colors.accent + '80', colors.tertiary + '80', colors.primary + '80']}
          style={styles.bottomBorder}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
        <LinearGradient
          colors={[colors.secondary + '80', colors.primary + '80', colors.accent + '80']}
          style={styles.leftBorder}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
        <LinearGradient
          colors={[colors.tertiary + '80', colors.secondary + '80', colors.primary + '80']}
          style={styles.rightBorder}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
      </View>

      {/* Contenu */}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderRadius: 20,
    overflow: 'hidden',
  },
  holographicBase: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
  },
  baseGradient: {
    flex: 1,
    borderRadius: 20,
  },
  rainbowLayer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
  },
  rainbow: {
    flex: 1,
    borderRadius: 20,
  },
  shimmerLayer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
  },
  shimmer: {
    flex: 1,
    width: 100,
    borderRadius: 20,
  },
  borderContainer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
  },
  topBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomBorder: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  leftBorder: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 2,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  rightBorder: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: 2,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  content: {
    padding: 20,
    zIndex: 10,
  },
});
