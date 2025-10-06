
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  withRepeat,
  interpolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

import { IconSymbol } from '@/components/IconSymbol';
import { colors, spacing, borderRadius, shadows } from '@/styles/commonStyles';
import { useApp } from '@/contexts/AppContext';

// Composants créatifs
import MorphingBackground from '@/components/MorphingBackground';
import ParticleSystem from '@/components/ParticleSystem';
import InteractiveArtCanvas from '@/components/InteractiveArtCanvas';
import HolographicCard from '@/components/HolographicCard';
import ChaosButton from '@/components/ChaosButton';
import ArtworkCard from '@/components/ArtworkCard';
import FloralElement from '@/components/FloralElement';
import StarburstPattern from '@/components/StarburstPattern';

const { width, height } = Dimensions.get('window');

export default function GalleryScreen() {
  const { artworks, favoriteArtworks } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'digital' | 'traditional' | 'mixed'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'chaos' | 'spiral'>('chaos');

  // Animations créatives délirants
  const galaxyRotation = useSharedValue(0);
  const artPulse = useSharedValue(0);
  const chaosMode = useSharedValue(0);

  React.useEffect(() => {
    // Rotation galactique
    galaxyRotation.value = withRepeat(
      withTiming(360, { duration: 20000 }),
      -1,
      false
    );

    // Pulsation artistique
    artPulse.value = withRepeat(
      withTiming(1, { duration: 3000 }),
      -1,
      true
    );

    // Mode chaos
    chaosMode.value = withRepeat(
      withTiming(1, { duration: 4000 }),
      -1,
      true
    );
  }, [artPulse, chaosMode, galaxyRotation]);

  const filteredArtworks = artworks.filter(artwork => {
    const matchesSearch = artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         artwork.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || artwork.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const galaxyStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${galaxyRotation.value}deg` }],
  }));

  const pulseStyle = useAnimatedStyle(() => {
    const scale = interpolate(artPulse.value, [0, 1], [0.95, 1.05]);
    return { transform: [{ scale }] };
  });

  const chaosStyle = useAnimatedStyle(() => {
    const translateX = interpolate(chaosMode.value, [0, 1], [-5, 5]);
    const translateY = interpolate(chaosMode.value, [0, 1], [-3, 3]);
    return {
      transform: [
        { translateX },
        { translateY }
      ],
    };
  });

  const renderArtworkInChaosMode = (artwork: any, index: number) => {
    const randomSize = 0.7 + Math.random() * 0.6; // Entre 0.7 et 1.3
    const randomRotation = Math.random() * 20 - 10; // Entre -10 et 10 degrés
    const randomX = Math.random() * 50 - 25; // Décalage horizontal aléatoire
    const randomY = Math.random() * 30 - 15; // Décalage vertical aléatoire

    return (
      <Animated.View
        key={artwork.id}
        style={[
          styles.chaosArtworkContainer,
          chaosStyle,
          {
            transform: [
              { scale: randomSize },
              { rotate: `${randomRotation}deg` },
              { translateX: randomX },
              { translateY: randomY }
            ],
            zIndex: Math.floor(Math.random() * 10),
          }
        ]}
      >
        <HolographicCard intensity="medium" animated={true}>
          <ArtworkCard artwork={artwork} />
        </HolographicCard>
      </Animated.View>
    );
  };

  const renderArtworkInSpiralMode = (artwork: any, index: number) => {
    const angle = (index * 45) % 360;
    const radius = 50 + (index * 10) % 150;
    const x = Math.cos(angle * Math.PI / 180) * radius;
    const y = Math.sin(angle * Math.PI / 180) * radius;

    return (
      <Animated.View
        key={artwork.id}
        style={[
          styles.spiralArtworkContainer,
          pulseStyle,
          {
            transform: [
              { translateX: x },
              { translateY: y },
              { rotate: `${angle}deg` }
            ],
          }
        ]}
      >
        <HolographicCard intensity="low" animated={true}>
          <ArtworkCard artwork={artwork} />
        </HolographicCard>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <MorphingBackground intensity="medium" speed="fast">
        <ParticleSystem 
          particleCount={20} 
          colors={[colors.primary, colors.secondary, colors.accent, '#FF6B9D', '#4ECDC4']}
          animated={true} 
        />
        
        <InteractiveArtCanvas maxTouchPoints={25} fadeOutDuration={5000}>
          <SafeAreaView style={styles.safeArea}>
            {/* Header galactique */}
            <Animated.View style={[styles.header, galaxyStyle]}>
              <HolographicCard intensity="high" style={styles.headerCard}>
                <Text style={styles.headerTitle}>🌌 GALERIE COSMIQUE 🎨</Text>
                <Text style={styles.headerSubtitle}>L'art qui transcende les dimensions</Text>
              </HolographicCard>
            </Animated.View>

            {/* Barre de recherche créative */}
            <View style={styles.searchContainer}>
              <HolographicCard intensity="medium">
                <View style={styles.searchInputContainer}>
                  <IconSymbol name="search" size={20} color={colors.primary} />
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Chercher dans l'univers artistique..."
                    placeholderTextColor={colors.textSecondary}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                </View>
              </HolographicCard>
            </View>

            {/* Contrôles de vue créatifs */}
            <View style={styles.controlsContainer}>
              <HolographicCard intensity="medium" style={styles.controlsCard}>
                <View style={styles.viewModeButtons}>
                  <ChaosButton
                    title="🌀 CHAOS"
                    onPress={() => setViewMode('chaos')}
                    variant={viewMode === 'chaos' ? 'chaos' : 'secondary'}
                    size="small"
                  />
                  <ChaosButton
                    title="🌀 SPIRALE"
                    onPress={() => setViewMode('spiral')}
                    variant={viewMode === 'spiral' ? 'glitch' : 'secondary'}
                    size="small"
                  />
                  <ChaosButton
                    title="📱 GRILLE"
                    onPress={() => setViewMode('grid')}
                    variant={viewMode === 'grid' ? 'primary' : 'secondary'}
                    size="small"
                  />
                </View>
              </HolographicCard>
            </View>

            {/* Filtres de catégorie */}
            <View style={styles.categoryContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {['all', 'digital', 'traditional', 'mixed'].map((category) => (
                  <TouchableOpacity
                    key={category}
                    onPress={() => setSelectedCategory(category as any)}
                    style={styles.categoryButton}
                  >
                    <HolographicCard 
                      intensity={selectedCategory === category ? "high" : "low"}
                      animated={selectedCategory === category}
                    >
                      <Text style={[
                        styles.categoryText,
                        selectedCategory === category && styles.categoryTextActive
                      ]}>
                        {category === 'all' ? '🌟 TOUT' : 
                         category === 'digital' ? '💻 DIGITAL' :
                         category === 'traditional' ? '🎨 TRADITIONNEL' : '🔮 MIXTE'}
                      </Text>
                    </HolographicCard>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Galerie d'art créative */}
            <ScrollView style={styles.galleryContainer} showsVerticalScrollIndicator={false}>
              {viewMode === 'chaos' && (
                <View style={styles.chaosGallery}>
                  {/* Éléments décoratifs flottants */}
                  <Animated.View style={[styles.floatingDecoration, { top: 50, left: 30 }, pulseStyle]}>
                    <StarburstPattern size={60} color={colors.primary} animated={true} />
                  </Animated.View>
                  <Animated.View style={[styles.floatingDecoration, { top: 200, right: 20 }, pulseStyle]}>
                    <FloralElement size={45} color={colors.secondary} animated={true} variant="detailed" />
                  </Animated.View>
                  <Animated.View style={[styles.floatingDecoration, { bottom: 100, left: 50 }, pulseStyle]}>
                    <StarburstPattern size={40} color={colors.accent} animated={true} />
                  </Animated.View>

                  {filteredArtworks.map((artwork, index) => renderArtworkInChaosMode(artwork, index))}
                </View>
              )}

              {viewMode === 'spiral' && (
                <View style={styles.spiralGallery}>
                  <View style={styles.spiralCenter}>
                    <Animated.View style={galaxyStyle}>
                      <StarburstPattern size={80} color={colors.primary} animated={true} />
                    </Animated.View>
                  </View>
                  {filteredArtworks.map((artwork, index) => renderArtworkInSpiralMode(artwork, index))}
                </View>
              )}

              {viewMode === 'grid' && (
                <View style={styles.gridGallery}>
                  {filteredArtworks.map((artwork, index) => (
                    <Animated.View key={artwork.id} style={[styles.gridItem, pulseStyle]}>
                      <HolographicCard intensity="low" animated={true}>
                        <ArtworkCard artwork={artwork} />
                      </HolographicCard>
                    </Animated.View>
                  ))}
                </View>
              )}

              <View style={styles.bottomSpacer} />
            </ScrollView>
          </SafeAreaView>
        </InteractiveArtCanvas>
      </MorphingBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    padding: spacing.md,
    alignItems: 'center',
  },
  headerCard: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  searchContainer: {
    padding: spacing.md,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: 16,
    color: colors.text,
  },
  controlsContainer: {
    padding: spacing.md,
  },
  controlsCard: {
    paddingVertical: spacing.md,
  },
  viewModeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  categoryContainer: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  categoryButton: {
    marginRight: spacing.sm,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  categoryTextActive: {
    color: colors.text,
    fontWeight: '800',
  },
  galleryContainer: {
    flex: 1,
    padding: spacing.md,
  },
  chaosGallery: {
    position: 'relative',
    minHeight: height * 2,
    paddingVertical: spacing.xl,
  },
  chaosArtworkContainer: {
    position: 'absolute',
    width: width * 0.4,
    marginBottom: spacing.lg,
  },
  spiralGallery: {
    position: 'relative',
    minHeight: height * 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  spiralCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -40 }, { translateY: -40 }],
    zIndex: 100,
  },
  spiralArtworkContainer: {
    position: 'absolute',
    width: width * 0.3,
  },
  gridGallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    marginBottom: spacing.md,
  },
  floatingDecoration: {
    position: 'absolute',
    zIndex: 1,
  },
  bottomSpacer: {
    height: 100,
  },
});
