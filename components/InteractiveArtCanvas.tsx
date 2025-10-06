
import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, PanGestureHandler, State } from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { colors } from '@/styles/commonStyles';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

interface TouchPoint {
  id: string;
  x: number;
  y: number;
  timestamp: number;
  color: string;
  size: number;
}

interface TouchPointComponentProps {
  point: TouchPoint;
}

interface InteractiveArtCanvasProps {
  children?: React.ReactNode;
  maxTouchPoints?: number;
  fadeOutDuration?: number;
}

export default function InteractiveArtCanvas({
  children,
  maxTouchPoints = 20,
  fadeOutDuration = 3000
}: InteractiveArtCanvasProps) {
  const [touchPoints, setTouchPoints] = useState<TouchPoint[]>([]);
  const gestureScale = useSharedValue(1);
  const gestureRotation = useSharedValue(0);

  const colorPalette = [
    colors.primary,
    colors.secondary,
    colors.accent,
    colors.tertiary,
    '#FF6B9D', // Rose vif
    '#4ECDC4', // Turquoise
    '#45B7D1', // Bleu ciel
    '#96CEB4', // Vert menthe
    '#FFEAA7', // Jaune pastel
    '#DDA0DD', // Violet clair
  ];

  const addTouchPoint = (x: number, y: number) => {
    const newPoint: TouchPoint = {
      id: Date.now().toString() + Math.random(),
      x,
      y,
      timestamp: Date.now(),
      color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
      size: Math.random() * 30 + 10,
    };

    setTouchPoints(prev => {
      const updated = [...prev, newPoint];
      if (updated.length > maxTouchPoints) {
        return updated.slice(-maxTouchPoints);
      }
      return updated;
    });

    // Supprimer le point après fadeOutDuration
    setTimeout(() => {
      setTouchPoints(prev => prev.filter(point => point.id !== newPoint.id));
    }, fadeOutDuration);
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event) => {
      runOnJS(addTouchPoint)(event.x, event.y);
      gestureScale.value = withSpring(1.1);
    },
    onActive: (event) => {
      runOnJS(addTouchPoint)(event.x, event.y);
      gestureRotation.value = withTiming(Math.random() * 360);
    },
    onEnd: () => {
      gestureScale.value = withSpring(1);
      gestureRotation.value = withTiming(0);
    },
  });

  const canvasStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: gestureScale.value },
      { rotate: `${gestureRotation.value}deg` }
    ],
  }));

  const TouchPointComponent = ({ point }: TouchPointComponentProps) => {
    const opacity = useSharedValue(1);
    const scale = useSharedValue(0);

    React.useEffect(() => {
      scale.value = withSpring(1);
      opacity.value = withTiming(0, { duration: fadeOutDuration });
    }, [opacity, scale]);

    const animatedStyle = useAnimatedStyle(() => ({
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    }));

    return (
      <Animated.View
        style={[
          styles.touchPoint,
          {
            left: point.x - point.size / 2,
            top: point.y - point.size / 2,
            width: point.size,
            height: point.size,
          },
          animatedStyle
        ]}
      >
        <LinearGradient
          colors={[point.color, point.color + '80', 'transparent']}
          style={styles.touchGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        
        {/* Effet de pulsation */}
        <View style={[styles.pulse, { backgroundColor: point.color + '40' }]} />
        <View style={[styles.pulse, styles.pulse2, { backgroundColor: point.color + '20' }]} />
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.canvas, canvasStyle]}>
          {/* Points de touche interactifs */}
          {touchPoints.map(point => (
            <TouchPointComponent key={point.id} point={point} />
          ))}
          
          {/* Contenu */}
          <View style={styles.content}>
            {children}
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  canvas: {
    flex: 1,
    position: 'relative',
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
  touchPoint: {
    position: 'absolute',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 50,
  },
  pulse: {
    position: 'absolute',
    width: '150%',
    height: '150%',
    borderRadius: 50,
    opacity: 0.6,
  },
  pulse2: {
    width: '200%',
    height: '200%',
    opacity: 0.3,
  },
});
