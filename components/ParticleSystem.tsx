
import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { colors } from '@/styles/commonStyles';

const { width, height } = Dimensions.get('window');

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  direction: number;
  life: number;
  type: 'circle' | 'star' | 'heart' | 'note' | 'diamond';
}

interface ParticleSystemProps {
  particleCount?: number;
  colors?: string[];
  animated?: boolean;
  style?: any;
}

const ParticleComponent = ({ particle, animationValue }: { particle: Particle; animationValue: Animated.SharedValue<number> }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const progress = animationValue.value;
    const newX = particle.x + Math.cos(particle.direction) * particle.speed * progress * 100;
    const newY = particle.y + Math.sin(particle.direction) * particle.speed * progress * 100;
    
    const opacity = interpolate(
      progress,
      [0, 0.5, 1],
      [0.8, 1, 0.3]
    );

    const scale = interpolate(
      progress,
      [0, 0.5, 1],
      [0.5, 1.2, 0.8]
    );

    return {
      transform: [
        { translateX: newX % width },
        { translateY: newY % height },
        { scale },
        { rotate: `${progress * 360}deg` }
      ],
      opacity,
    };
  });

  const ParticleShape = () => {
    switch (particle.type) {
      case 'star':
        return (
          <View style={[styles.star, { backgroundColor: particle.color, width: particle.size, height: particle.size }]}>
            <View style={[styles.starPoint, { backgroundColor: particle.color }]} />
            <View style={[styles.starPoint, { backgroundColor: particle.color, transform: [{ rotate: '45deg' }] }]} />
          </View>
        );
      case 'heart':
        return (
          <View style={[styles.heart, { width: particle.size, height: particle.size }]}>
            <View style={[styles.heartLeft, { backgroundColor: particle.color }]} />
            <View style={[styles.heartRight, { backgroundColor: particle.color }]} />
            <View style={[styles.heartBottom, { backgroundColor: particle.color }]} />
          </View>
        );
      case 'note':
        return (
          <View style={[styles.note, { backgroundColor: particle.color, width: particle.size, height: particle.size }]}>
            <View style={[styles.noteStem, { backgroundColor: particle.color }]} />
          </View>
        );
      case 'diamond':
        return (
          <View style={[styles.diamond, { backgroundColor: particle.color, width: particle.size, height: particle.size }]} />
        );
      default:
        return (
          <View style={[styles.circle, { backgroundColor: particle.color, width: particle.size, height: particle.size }]} />
        );
    }
  };

  return (
    <Animated.View
      key={particle.id}
      style={[styles.particle, animatedStyle]}
    >
      <ParticleShape />
    </Animated.View>
  );
};

export default function ParticleSystem({
  particleCount = 25,
  colors: particleColors = [colors.primary, colors.secondary, colors.accent, colors.tertiary],
  animated = true,
  style
}: ParticleSystemProps) {
  const particles = React.useRef<Particle[]>([]);
  const animationValue = useSharedValue(0);

  const createParticle = (id: number): Particle => ({
    id,
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 8 + 4,
    color: particleColors[Math.floor(Math.random() * particleColors.length)],
    speed: Math.random() * 2 + 0.5,
    direction: Math.random() * Math.PI * 2,
    life: Math.random() * 100 + 50,
    type: ['circle', 'star', 'heart', 'note', 'diamond'][Math.floor(Math.random() * 5)] as any,
  });

  React.useEffect(() => {
    particles.current = Array.from({ length: particleCount }, (_, i) => createParticle(i));
  }, [particleCount, createParticle]);

  useEffect(() => {
    if (animated) {
      animationValue.value = withRepeat(
        withTiming(1, { duration: 100 }),
        -1,
        false
      );
    }
  }, [animated, animationValue]);

  return (
    <View style={[styles.container, style]} pointerEvents="none">
      {particles.current.map((particle) => (
        <ParticleComponent key={particle.id} particle={particle} animationValue={animationValue} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  particle: {
    position: 'absolute',
  },
  circle: {
    borderRadius: 50,
  },
  star: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  starPoint: {
    position: 'absolute',
    width: '100%',
    height: 2,
    borderRadius: 1,
  },
  heart: {
    position: 'relative',
    transform: [{ rotate: '45deg' }],
  },
  heartLeft: {
    position: 'absolute',
    left: '25%',
    top: 0,
    width: '50%',
    height: '50%',
    borderRadius: 50,
  },
  heartRight: {
    position: 'absolute',
    right: '25%',
    top: 0,
    width: '50%',
    height: '50%',
    borderRadius: 50,
  },
  heartBottom: {
    position: 'absolute',
    left: '25%',
    top: '25%',
    width: '50%',
    height: '50%',
    transform: [{ rotate: '45deg' }],
  },
  note: {
    borderRadius: 50,
    position: 'relative',
  },
  noteStem: {
    position: 'absolute',
    right: -1,
    top: -4,
    width: 2,
    height: 8,
    borderRadius: 1,
  },
  diamond: {
    transform: [{ rotate: '45deg' }],
    borderRadius: 2,
  },
});
