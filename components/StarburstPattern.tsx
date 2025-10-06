
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { colors } from '@/styles/commonStyles';

interface StarburstPatternProps {
  size?: number;
  color?: string;
  animated?: boolean;
  style?: any;
}

export default function StarburstPattern({ 
  size = 60, 
  color = colors.primary, 
  animated = true,
  style 
}: StarburstPatternProps) {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  React.useEffect(() => {
    if (animated) {
      rotation.value = withRepeat(
        withTiming(360, { duration: 8000 }),
        -1,
        false
      );
      scale.value = withRepeat(
        withTiming(1.1, { duration: 2000 }),
        -1,
        true
      );
    }
  }, [animated, rotation, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation.value}deg` },
      { scale: scale.value }
    ],
  }));

  const starPoints = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30) * (Math.PI / 180);
    const isLong = i % 2 === 0;
    const length = isLong ? size * 0.5 : size * 0.25;
    
    return {
      x: Math.cos(angle) * length,
      y: Math.sin(angle) * length,
      isLong,
    };
  });

  return (
    <Animated.View style={[styles.container, { width: size, height: size }, style, animatedStyle]}>
      <View style={styles.center}>
        {starPoints.map((point, index) => (
          <View
            key={index}
            style={[
              styles.ray,
              {
                backgroundColor: color,
                width: point.isLong ? 3 : 2,
                height: point.isLong ? size * 0.5 : size * 0.25,
                transform: [
                  { translateX: point.x },
                  { translateY: point.y },
                  { rotate: `${index * 30}deg` }
                ],
              }
            ]}
          />
        ))}
        <View style={[styles.centerDot, { backgroundColor: color }]} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ray: {
    position: 'absolute',
    borderRadius: 2,
    transformOrigin: 'center bottom',
  },
  centerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    position: 'absolute',
  },
});
