
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol } from './IconSymbol';
import { ArtWork } from '../types';
import { colors, spacing, borderRadius, shadows } from '../styles/commonStyles';
import { useApp } from '../contexts/AppContext';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const cardWidth = width - spacing.lg * 2;

interface ArtworkCardProps {
  artwork: ArtWork;
  onPress?: () => void;
}

export default function ArtworkCard({ artwork, onPress }: ArtworkCardProps) {
  const { state, dispatch } = useApp();
  const scale = useSharedValue(1);
  const heartScale = useSharedValue(1);

  const isFavorite = state.favoriteArtworks.includes(artwork.id);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const heartAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const handleToggleFavorite = () => {
    dispatch({ type: 'TOGGLE_FAVORITE_ARTWORK', payload: artwork.id });
    
    // Animation du cœur
    heartScale.value = withTiming(1.3, { duration: 150 }, () => {
      heartScale.value = withTiming(1, { duration: 150 });
    });
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: artwork.imageUrl }} style={styles.image} />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={styles.gradient}
            />
            
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={handleToggleFavorite}
            >
              <Animated.View style={heartAnimatedStyle}>
                <IconSymbol
                  name={isFavorite ? 'heart.fill' : 'heart'}
                  size={24}
                  color={isFavorite ? colors.error : colors.text}
                />
              </Animated.View>
            </TouchableOpacity>

            <View style={styles.categoryTag}>
              <Text style={styles.categoryText}>{artwork.category}</Text>
            </View>
          </View>
          
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.artistInfo}>
                <Image
                  source={{ uri: artwork.artist.profileImageUrl }}
                  style={styles.artistAvatar}
                />
                <View>
                  <Text style={styles.artistName}>{artwork.artist.name}</Text>
                  {artwork.artist.verified && (
                    <View style={styles.verifiedBadge}>
                      <IconSymbol name="checkmark.circle.fill" size={12} color={colors.secondary} />
                      <Text style={styles.verifiedText}>Vérifié</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
            
            <Text style={styles.title} numberOfLines={2}>
              {artwork.title}
            </Text>
            <Text style={styles.description} numberOfLines={3}>
              {artwork.description}
            </Text>
            
            <View style={styles.stats}>
              <View style={styles.stat}>
                <IconSymbol name="heart" size={16} color={colors.textSecondary} />
                <Text style={styles.statText}>{artwork.likes}</Text>
              </View>
              <View style={styles.stat}>
                <IconSymbol name="eye" size={16} color={colors.textSecondary} />
                <Text style={styles.statText}>{artwork.views}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    marginBottom: spacing.lg,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.medium,
  },
  imageContainer: {
    position: 'relative',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  favoriteButton: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryTag: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  categoryText: {
    color: colors.background,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  content: {
    padding: spacing.md,
  },
  header: {
    marginBottom: spacing.sm,
  },
  artistInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  artistAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: spacing.sm,
  },
  artistName: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  verifiedText: {
    color: colors.secondary,
    fontSize: 10,
    marginLeft: 2,
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  description: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    color: colors.textSecondary,
    fontSize: 14,
    marginLeft: 4,
  },
});
