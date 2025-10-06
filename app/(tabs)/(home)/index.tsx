
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
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
import { colors, spacing, borderRadius, typography, shadows } from '@/styles/commonStyles';
import { useApp } from '@/contexts/AppContext';

// Nouveaux composants créatifs
import MorphingBackground from '@/components/MorphingBackground';
import ParticleSystem from '@/components/ParticleSystem';
import InteractiveArtCanvas from '@/components/InteractiveArtCanvas';
import HolographicCard from '@/components/HolographicCard';
import ChaosButton from '@/components/ChaosButton';

// Composants existants
import ArtworkCard from '@/components/ArtworkCard';
import ProductCard from '@/components/ProductCard';
import CartSheet from '@/components/CartSheet';
import FloralElement from '@/components/FloralElement';
import StarburstPattern from '@/components/StarburstPattern';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const { products, artworks, cartItems, isCartVisible, setIsCartVisible } = useApp();
  const [selectedSection, setSelectedSection] = useState<'beats' | 'art' | 'chaos'>('chaos');
  
  // Animations créatives
  const chaosMode = useSharedValue(0);
  const sectionTransition = useSharedValue(0);
  const floatingElements = useSharedValue(0);

  React.useEffect(() => {
    // Mode chaos permanent
    chaosMode.value = withRepeat(
      withTiming(1, { duration: 5000 }),
      -1,
      true
    );

    // Éléments flottants
    floatingElements.value = withRepeat(
      withTiming(1, { duration: 8000 }),
      -1,
      false
    );

    // Transition de section
    sectionTransition.value = withSpring(selectedSection === 'chaos' ? 1 : 0);
  }, [selectedSection, chaosMode, floatingElements, sectionTransition]);

  const chaosAnimatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(chaosMode.value, [0, 1], [0, 360]);
    const scale = interpolate(chaosMode.value, [0, 0.5, 1], [1, 1.1, 1]);
    
    return {
      transform: [
        { rotate: `${rotate}deg` },
        { scale }
      ],
    };
  });

  const floatingStyle = useAnimatedStyle(() => {
    const translateY = interpolate(floatingElements.value, [0, 1], [0, -20]);
    const opacity = interpolate(floatingElements.value, [0, 0.5, 1], [0.6, 1, 0.6]);
    
    return {
      transform: [{ translateY }],
      opacity,
    };
  });

  const renderChaosSection = () => (
    <View style={styles.chaosSection}>
      {/* Titre créatif délirant */}
      <Animated.View style={[styles.chaosTitleContainer, chaosAnimatedStyle]}>
        <HolographicCard intensity="high" animated={true}>
          <Text style={styles.chaosTitle}>🎵 BEATMAKER GALAXY 🎨</Text>
          <Text style={styles.chaosSubtitle}>Où la musique rencontre l'art dans le chaos créatif !</Text>
        </HolographicCard>
      </Animated.View>

      {/* Boutons créatifs délirants */}
      <View style={styles.chaosButtonsContainer}>
        <ChaosButton
          title="🔥 BEATS EXPLOSIFS"
          onPress={() => setSelectedSection('beats')}
          variant="chaos"
          size="large"
          style={styles.chaosButton}
        />
        
        <ChaosButton
          title="🎨 ART GALACTIQUE"
          onPress={() => setSelectedSection('art')}
          variant="glitch"
          size="large"
          style={styles.chaosButton}
        />
        
        <ChaosButton
          title="🛒 PANIER MAGIQUE"
          onPress={() => setIsCartVisible(true)}
          variant="primary"
          size="medium"
          style={styles.chaosButton}
        />
      </View>

      {/* Éléments décoratifs flottants */}
      <Animated.View style={[styles.floatingElement, floatingStyle, { top: 100, left: 50 }]}>
        <StarburstPattern size={40} color={colors.primary} animated={true} />
      </Animated.View>
      
      <Animated.View style={[styles.floatingElement, floatingStyle, { top: 200, right: 30 }]}>
        <FloralElement size={35} color={colors.secondary} animated={true} variant="detailed" />
      </Animated.View>
      
      <Animated.View style={[styles.floatingElement, floatingStyle, { bottom: 150, left: 80 }]}>
        <StarburstPattern size={50} color={colors.accent} animated={true} />
      </Animated.View>

      {/* Stats créatives */}
      <View style={styles.statsContainer}>
        <HolographicCard intensity="medium" style={styles.statCard}>
          <Text style={styles.statNumber}>🎵 {products.length}</Text>
          <Text style={styles.statLabel}>Beats Épiques</Text>
        </HolographicCard>
        
        <HolographicCard intensity="medium" style={styles.statCard}>
          <Text style={styles.statNumber}>🎨 {artworks.length}</Text>
          <Text style={styles.statLabel}>Œuvres Magiques</Text>
        </HolographicCard>
        
        <HolographicCard intensity="medium" style={styles.statCard}>
          <Text style={styles.statNumber}>🛒 {cartItems.length}</Text>
          <Text style={styles.statLabel}>Trésors Collectés</Text>
        </HolographicCard>
      </View>
    </View>
  );

  const renderBeatsSection = () => (
    <View style={styles.section}>
      <HolographicCard intensity="medium" style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>🎵 BEATS COLLECTION</Text>
        <Text style={styles.sectionSubtitle}>Des rythmes qui font vibrer l'univers</Text>
      </HolographicCard>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {products.slice(0, 5).map((product) => (
          <View key={product.id} style={styles.cardWrapper}>
            <HolographicCard intensity="low">
              <ProductCard product={product} />
            </HolographicCard>
          </View>
        ))}
      </ScrollView>
      
      <ChaosButton
        title="🔥 EXPLORER TOUS LES BEATS"
        onPress={() => console.log('Navigate to shop')}
        variant="chaos"
        size="large"
        style={styles.exploreButton}
      />
    </View>
  );

  const renderArtSection = () => (
    <View style={styles.section}>
      <HolographicCard intensity="medium" style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>🎨 GALERIE COSMIQUE</Text>
        <Text style={styles.sectionSubtitle}>L'art qui transcende les dimensions</Text>
      </HolographicCard>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {artworks.slice(0, 5).map((artwork) => (
          <View key={artwork.id} style={styles.cardWrapper}>
            <HolographicCard intensity="low">
              <ArtworkCard artwork={artwork} />
            </HolographicCard>
          </View>
        ))}
      </ScrollView>
      
      <ChaosButton
        title="🌌 PLONGER DANS L'ART"
        onPress={() => console.log('Navigate to gallery')}
        variant="glitch"
        size="large"
        style={styles.exploreButton}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      
      {/* Background créatif morphant */}
      <MorphingBackground intensity="intense" speed="medium">
        {/* Système de particules interactif */}
        <ParticleSystem particleCount={30} animated={true} />
        
        {/* Canvas d'art interactif */}
        <InteractiveArtCanvas maxTouchPoints={15} fadeOutDuration={4000}>
          <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
              {/* Navigation créative */}
              <View style={styles.navigationContainer}>
                <HolographicCard intensity="high" style={styles.navCard}>
                  <View style={styles.navButtons}>
                    <TouchableOpacity
                      onPress={() => setSelectedSection('chaos')}
                      style={[styles.navButton, selectedSection === 'chaos' && styles.navButtonActive]}
                    >
                      <Text style={styles.navButtonText}>🌀 CHAOS</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      onPress={() => setSelectedSection('beats')}
                      style={[styles.navButton, selectedSection === 'beats' && styles.navButtonActive]}
                    >
                      <Text style={styles.navButtonText}>🎵 BEATS</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      onPress={() => setSelectedSection('art')}
                      style={[styles.navButton, selectedSection === 'art' && styles.navButtonActive]}
                    >
                      <Text style={styles.navButtonText}>🎨 ART</Text>
                    </TouchableOpacity>
                  </View>
                </HolographicCard>
              </View>

              {/* Contenu selon la section */}
              {selectedSection === 'chaos' && renderChaosSection()}
              {selectedSection === 'beats' && renderBeatsSection()}
              {selectedSection === 'art' && renderArtSection()}

              {/* Espace pour éviter que le contenu soit caché par la tab bar */}
              <View style={styles.bottomSpacer} />
            </ScrollView>
          </SafeAreaView>
        </InteractiveArtCanvas>
      </MorphingBackground>

      {/* Panier */}
      <CartSheet isVisible={isCartVisible} onClose={() => setIsCartVisible(false)} />
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
  scrollView: {
    flex: 1,
  },
  navigationContainer: {
    padding: spacing.md,
    paddingTop: spacing.lg,
  },
  navCard: {
    marginBottom: spacing.md,
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface + '80',
  },
  navButtonActive: {
    backgroundColor: colors.primary + '80',
  },
  navButtonText: {
    ...typography.button,
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  chaosSection: {
    padding: spacing.md,
    minHeight: height * 0.8,
  },
  chaosTitleContainer: {
    marginBottom: spacing.xl,
    alignItems: 'center',
  },
  chaosTitle: {
    ...typography.h1,
    color: colors.text,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '900',
    marginBottom: spacing.sm,
  },
  chaosSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    fontSize: 16,
  },
  chaosButtonsContainer: {
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  chaosButton: {
    marginVertical: spacing.sm,
  },
  floatingElement: {
    position: 'absolute',
    zIndex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.xl,
  },
  statCard: {
    alignItems: 'center',
    minWidth: 100,
  },
  statNumber: {
    ...typography.h2,
    color: colors.primary,
    fontWeight: '900',
    fontSize: 24,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  section: {
    padding: spacing.md,
  },
  sectionHeader: {
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.text,
    textAlign: 'center',
    fontWeight: '800',
    marginBottom: spacing.xs,
  },
  sectionSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  horizontalScroll: {
    marginBottom: spacing.lg,
  },
  cardWrapper: {
    marginRight: spacing.md,
    width: width * 0.7,
  },
  exploreButton: {
    alignSelf: 'center',
    marginTop: spacing.md,
  },
  bottomSpacer: {
    height: 100,
  },
});
