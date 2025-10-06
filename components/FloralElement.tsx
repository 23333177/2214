
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import { colors } from '@/styles/commonStyles';

interface FloralElementProps {
  size?: number;
  color?: string;
  animated?: boolean;
  style?: any;
  variant?: 'simple' | 'detailed';
}

export default function FloralElement({ 
  size = 40, 
  color = colors.secondary, 
  animated = true,
  style,
  variant = 'simple'
}: FloralElementProps) {
  const sway = useSharedValue(0);
  const bloom = useSharedValue(0.8);

  React.useEffect(() => {
    if (animated) {
      sway.value = withRepeat(
        withSequence(
          withTiming(5, { duration: 2000 }),
          withTiming(-5, { duration: 2000 })
        ),
        -1,
        false
      );
      
      bloom.value = withRepeat(
        withTiming(1, { duration: 3000 }),
        -1,
        true
      );
    }
  }, [animated]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${sway.value}deg` },
      { scale: bloom.value }
    ],
  }));

  if (variant === 'simple') {
    return (
      <Animated.View style={[styles.container, { width: size, height: size }, style, animatedStyle]}>
        {/* Pétales */}
        {Array.from({ length: 5 }, (_, i) => (
          <View
            key={i}
            style={[
              styles.petal,
              {
                backgroundColor: color,
                width: size * 0.3,
                height: size * 0.6,
                transform: [{ rotate: `${i * 72}deg` }],
              }
            ]}
          />
        ))}
        {/* Centre */}
        <View style={[styles.center, { 
          backgroundColor: colors.accent,
          width: size * 0.25,
          height: size * 0.25,
        }]} />
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[styles.container, { width: size, height: size * 1.5 }, style, animatedStyle]}>
      {/* Tige */}
      <View style={[styles.stem, { 
        backgroundColor: '#4CAF50',
        width: 2,
        height: size * 0.8,
      }]} />
      
      {/* Feuilles */}
      <View style={[styles.leaf, styles.leftLeaf, { 
        backgroundColor: '#4CAF50',
        width: size * 0.2,
        height: size * 0.3,
      }]} />
      <View style={[styles.leaf, styles.rightLeaf, { 
        backgroundColor: '#4CAF50',
        width: size * 0.2,
        height: size * 0.3,
      }]} />
      
      {/* Fleur */}
      <View style={[styles.flower, { top: -size * 0.1 }]}>
        {Array.from({ length: 6 }, (_, i) => (
          <View
            key={i}
            style={[
              styles.detailedPetal,
              {
                backgroundColor: color,
                width: size * 0.25,
                height: size * 0.4,
                transform: [{ rotate: `${i * 60}deg` }],
              }
            ]}
          />
        ))}
        <View style={[styles.center, { 
          backgroundColor: colors.accent,
          width: size * 0.2,
          height: size * 0.2,
        }]} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  petal: {
    position: 'absolute',
    borderRadius: 20,
    transformOrigin: 'center bottom',
  },
  center: {
    borderRadius: 50,
    position: 'absolute',
  },
  stem: {
    position: 'absolute',
    bottom: 0,
    borderRadius: 1,
  },
  leaf: {
    position: 'absolute',
    borderRadius: 10,
    transform: [{ rotate: '45deg' }],
  },
  leftLeaf: {
    left: -8,
    bottom: '30%',
  },
  rightLeaf: {
    right: -8,
    bottom: '50%',
    transform: [{ rotate: '-45deg' }],
  },
  flower: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailedPetal: {
    position: 'absolute',
    borderRadius: 15,
    transformOrigin: 'center bottom',
  },
});
