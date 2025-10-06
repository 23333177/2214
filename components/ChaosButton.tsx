
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withRepeat,
  withSequence,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography } from '@/styles/commonStyles';
import * as Haptics from 'expo-haptics';

interface ChaosButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'chaos' | 'glitch';
  size?: 'small' | 'medium' | 'large';
  style?: any;
}

export default function ChaosButton({
  title,
  onPress,
  variant = 'chaos',
  size = 'medium',
  style
}: ChaosButtonProps) {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const glitch = useSharedValue(0);
  const colorShift = useSharedValue(0);
  const shake = useSharedValue(0);

  React.useEffect(() => {
    if (variant === 'chaos' || variant === 'glitch') {
      // Animation de chaos continue
      rotation.value = withRepeat(
        withTiming(360, { duration: 10000 }),
        -1,
        false
      );

      colorShift.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 2000 }),
          withTiming(0, { duration: 2000 })
        ),
        -1,
        false
      );

      if (variant === 'glitch') {
        glitch.value = withRepeat(
          withSequence(
            withTiming(0, { duration: 3000 }),
            withTiming(1, { duration: 100 }),
            withTiming(0, { duration: 100 }),
            withTiming(1, { duration: 50 }),
            withTiming(0, { duration: 50 })
          ),
          -1,
          false
        );
      }
    }
  }, [variant]);

  const triggerHaptics = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  const handlePress = () => {
    triggerHaptics();
    
    // Animation de pression chaotique
    scale.value = withSequence(
      withTiming(0.8, { duration: 50 }),
      withSpring(1.2, { damping: 8 }),
      withSpring(1, { damping: 12 })
    );

    shake.value = withSequence(
      withTiming(10, { duration: 50 }),
      withTiming(-10, { duration: 50 }),
      withTiming(5, { duration: 50 }),
      withTiming(-5, { duration: 50 }),
      withTiming(0, { duration: 50 })
    );

    runOnJS(onPress)();
  };

  const getButtonSize = () => {
    switch (size) {
      case 'small': return { paddingHorizontal: 16, paddingVertical: 8, fontSize: 14 };
      case 'medium': return { paddingHorizontal: 24, paddingVertical: 12, fontSize: 16 };
      case 'large': return { paddingHorizontal: 32, paddingVertical: 16, fontSize: 18 };
      default: return { paddingHorizontal: 24, paddingVertical: 12, fontSize: 16 };
    }
  };

  const buttonSize = getButtonSize();

  const animatedStyle = useAnimatedStyle(() => {
    const rotationValue = variant === 'chaos' ? interpolate(rotation.value, [0, 360], [0, 360]) : 0;
    const scaleValue = scale.value;
    const shakeValue = shake.value;
    
    let glitchTransform = {};
    if (variant === 'glitch') {
      const glitchX = interpolate(glitch.value, [0, 1], [0, Math.random() * 4 - 2]);
      const glitchY = interpolate(glitch.value, [0, 1], [0, Math.random() * 4 - 2]);
      glitchTransform = { translateX: glitchX, translateY: glitchY };
    }

    return {
      transform: [
        { scale: scaleValue },
        { rotate: `${rotationValue}deg` },
        { translateX: shakeValue },
        ...Object.values(glitchTransform).map((value, index) => 
          index === 0 ? { translateX: value as number } : { translateY: value as number }
        )
      ],
    };
  });

  const getGradientColors = () => {
    switch (variant) {
      case 'primary':
        return [colors.primary, colors.secondary];
      case 'secondary':
        return [colors.secondary, colors.accent];
      case 'chaos':
        return [colors.primary, colors.accent, colors.tertiary, colors.secondary];
      case 'glitch':
        return ['#FF0080', '#00FF80', '#8000FF', '#FF8000'];
      default:
        return [colors.primary, colors.secondary];
    }
  };

  const textAnimatedStyle = useAnimatedStyle(() => {
    if (variant === 'glitch') {
      const textGlitch = interpolate(glitch.value, [0, 1], [0, 1]);
      return {
        opacity: textGlitch > 0.5 ? 0.8 : 1,
        color: textGlitch > 0.7 ? '#FF0080' : colors.text,
      };
    }
    
    const hue = interpolate(colorShift.value, [0, 1], [0, 360]);
    return {
      color: variant === 'chaos' ? `hsl(${hue}, 70%, 80%)` : colors.text,
    };
  });

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8} style={style}>
      <Animated.View style={[styles.button, { ...buttonSize }, animatedStyle]}>
        <LinearGradient
          colors={getGradientColors()}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        
        {/* Effet de surbrillance chaotique */}
        {variant === 'chaos' && (
          <Animated.View style={[styles.chaosOverlay, animatedStyle]}>
            <LinearGradient
              colors={['transparent', '#FFFFFF30', 'transparent']}
              style={styles.chaosGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          </Animated.View>
        )}
        
        <Animated.Text style={[styles.buttonText, { fontSize: buttonSize.fontSize }, textAnimatedStyle]}>
          {title}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 25,
  },
  chaosOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 25,
  },
  chaosGradient: {
    flex: 1,
    borderRadius: 25,
  },
  buttonText: {
    ...typography.button,
    fontWeight: '700',
    textAlign: 'center',
    zIndex: 10,
  },
});
