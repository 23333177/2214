
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StarburstPattern from './StarburstPattern';
import FloralElement from './FloralElement';
import { colors } from '@/styles/commonStyles';

const { width, height } = Dimensions.get('window');

interface DecorativeBackgroundProps {
  variant?: 'starburst' | 'floral' | 'mixed';
  intensity?: 'light' | 'medium' | 'heavy';
  children?: React.ReactNode;
}

export default function DecorativeBackground({ 
  variant = 'mixed', 
  intensity = 'light',
  children 
}: DecorativeBackgroundProps) {
  const getElementCount = () => {
    switch (intensity) {
      case 'light': return 3;
      case 'medium': return 6;
      case 'heavy': return 10;
      default: return 3;
    }
  };

  const elementCount = getElementCount();
  const elements = Array.from({ length: elementCount }, (_, i) => ({
    id: i,
    type: variant === 'mixed' ? (i % 2 === 0 ? 'starburst' : 'floral') : variant,
    size: Math.random() * 40 + 20,
    x: Math.random() * (width - 100),
    y: Math.random() * (height - 200) + 100,
    color: [colors.primary, colors.secondary, colors.accent][Math.floor(Math.random() * 3)],
    opacity: Math.random() * 0.3 + 0.1,
  }));

  return (
    <View style={styles.container}>
      {/* Gradient de fond */}
      <LinearGradient
        colors={[colors.background, colors.surface, colors.background]}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      {/* Éléments décoratifs */}
      {elements.map((element) => (
        <View
          key={element.id}
          style={[
            styles.decorativeElement,
            {
              left: element.x,
              top: element.y,
              opacity: element.opacity,
            }
          ]}
        >
          {element.type === 'starburst' ? (
            <StarburstPattern
              size={element.size}
              color={element.color}
              animated={true}
            />
          ) : (
            <FloralElement
              size={element.size}
              color={element.color}
              animated={true}
              variant="simple"
            />
          )}
        </View>
      ))}
      
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
  decorativeElement: {
    position: 'absolute',
    zIndex: 0,
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
});
