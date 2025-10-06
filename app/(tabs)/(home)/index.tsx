
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
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, spacing, borderRadius, typography, shadows } from '@/styles/commonStyles';
import { useApp } from '@/contexts/AppContext';
import ProductCard from '@/components/ProductCard';
import ArtworkCard from '@/components/ArtworkCard';
import CartSheet from '@/components/CartSheet';
import DecorativeBackground from '@/components/DecorativeBackground';
import StarburstPattern from '@/components/StarburstPattern';
import FloralElement from '@/components/FloralElement';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  withRepeat,
  interpolate,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const { state, dispatch } = useApp();
  const [showCart, setShowCart] = useState(false);
  
  // Animations
  const headerOpacity = useSharedValue(0);
  const headerTranslateY = useSharedValue(-50);
  const pulseScale = useSharedValue(1);
  const rotateValue = useSharedValue(0);
  const floatY = useSharedValue(0);

  React.useEffect(() => {
    // Animation d'entrée
    headerOpacity.value = withTiming(1, { duration: 1000 });
    headerTranslateY.value = withSpring(0);
    
    // Animation de pulsation continue
    pulseScale.value = withRepeat(
      withTiming(1.05, { duration: 2000 }),
      -1,
      true
    );
    
    // Rotation continue
    rotateValue.value = withRepeat(
      withTiming(360, { duration: 15000 }),
      -1,
      false
    );

    // Animation de flottement
    floatY.value = withRepeat(
      withTiming(-10, { duration: 3000 }),
      -1,
      true
    );
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ translateY: headerTranslateY.value }],
  }));

  const pulseAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const rotateAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotateValue.value}deg` }],
  }));

  const floatAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: floatY.value }],
  }));

  const featuredProducts = state.products.slice(0, 4);
  const featuredArtworks = state.artworks.slice(0, 3);
  const cartItemsCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <DecorativeBackground variant="mixed" intensity="light">
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={colors.background} />
        
        {/* Header avec panier */}
        <Animated.View style={[styles.header, headerAnimatedStyle]}>
          <View style={styles.headerLeft}>
            <Animated.View style={[styles.logoContainer, floatAnimatedStyle]}>
              <StarburstPattern size={32} color={colors.primary} animated={true} />
            </Animated.View>
            <View style={styles.headerText}>
              <Text style={styles.greeting}>Bienvenue sur</Text>
              <Text style={styles.appName}>BeatGallery</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => setShowCart(true)}
          >
            <LinearGradient
              colors={colors.gradientPrimary}
              style={styles.cartButtonGradient}
            >
              <IconSymbol name="cart" size={24} color={colors.text} />
              {cartItemsCount > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{cartItemsCount}</Text>
                </View>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Hero Section avec éléments décoratifs */}
          <View style={styles.heroContainer}>
            <LinearGradient
              colors={colors.gradientSecondary}
              style={styles.heroSection}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              {/* Éléments décoratifs dans le hero */}
              <View style={styles.heroDecorations}>
                <Animated.View style={[styles.heroDecoration, styles.topLeft, rotateAnimatedStyle]}>
                  <StarburstPattern size={24} color={colors.accent} animated={false} />
                </Animated.View>
                <Animated.View style={[styles.heroDecoration, styles.topRight, floatAnimatedStyle]}>
                  <FloralElement size={20} color={colors.tertiary} animated={false} variant="simple" />
                </Animated.View>
                <Animated.View style={[styles.heroDecoration, styles.bottomLeft, floatAnimatedStyle]}>
                  <FloralElement size={16} color={colors.accent} animated={false} variant="simple" />
                </Animated.View>
                <Animated.View style={[styles.heroDecoration, styles.bottomRight, rotateAnimatedStyle]}>
                  <StarburstPattern size={20} color={colors.tertiary} animated={false} />
                </Animated.View>
              </View>

              <Animated.View style={[styles.heroContent, pulseAnimatedStyle]}>
                <View style={styles.heroIconContainer}>
                  <LinearGradient
                    colors={[colors.accent, colors.primary]}
                    style={styles.heroIconGradient}
                  >
                    <IconSymbol name="music.note" size={48} color={colors.text} />
                  </LinearGradient>
                </View>
                <Text style={styles.heroTitle}>Beats & Art</Text>
                <Text style={styles.heroSubtitle}>
                  Découvrez des beats uniques et explorez l'art contemporain
                </Text>
              </Animated.View>
            </LinearGradient>
          </View>

          {/* Navigation rapide avec décorations */}
          <View style={styles.quickNav}>
            <TouchableOpacity
              style={styles.navButtonContainer}
              onPress={() => dispatch({ type: 'SET_CURRENT_VIEW', payload: 'shop' })}
            >
              <LinearGradient
                colors={colors.gradientPrimary}
                style={styles.navButton}
              >
                <View style={styles.navButtonContent}>
                  <IconSymbol name="music.note" size={24} color={colors.text} />
                  <Text style={styles.navButtonText}>Boutique</Text>
                </View>
                <View style={styles.navButtonDecoration}>
                  <StarburstPattern size={16} color={colors.text} animated={true} />
                </View>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.navButtonContainer}
              onPress={() => dispatch({ type: 'SET_CURRENT_VIEW', payload: 'gallery' })}
            >
              <LinearGradient
                colors={colors.gradientSecondary}
                style={styles.navButton}
              >
                <View style={styles.navButtonContent}>
                  <IconSymbol name="photo" size={24} color={colors.text} />
                  <Text style={styles.navButtonText}>Galerie</Text>
                </View>
                <View style={styles.navButtonDecoration}>
                  <FloralElement size={16} color={colors.text} animated={true} variant="simple" />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Produits en vedette */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <StarburstPattern size={20} color={colors.primary} animated={true} />
                <Text style={styles.sectionTitle}>Beats en vedette</Text>
              </View>
              <TouchableOpacity
                onPress={() => dispatch({ type: 'SET_CURRENT_VIEW', payload: 'shop' })}
              >
                <Text style={styles.seeAllText}>Voir tout</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.productsGrid}>
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onPress={() => console.log('Product pressed:', product.title)}
                />
              ))}
            </View>
          </View>

          {/* Œuvres d'art en vedette */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <FloralElement size={20} color={colors.secondary} animated={true} variant="simple" />
                <Text style={styles.sectionTitle}>Art en vedette</Text>
              </View>
              <TouchableOpacity
                onPress={() => dispatch({ type: 'SET_CURRENT_VIEW', payload: 'gallery' })}
              >
                <Text style={styles.seeAllText}>Voir tout</Text>
              </TouchableOpacity>
            </View>
            
            {featuredArtworks.map((artwork) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                onPress={() => console.log('Artwork pressed:', artwork.title)}
              />
            ))}
          </View>

          {/* Call to action pour les artistes avec décorations */}
          <View style={styles.ctaContainer}>
            <LinearGradient
              colors={colors.gradientAccent}
              style={styles.ctaSection}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              {/* Décorations CTA */}
              <View style={styles.ctaDecorations}>
                <View style={[styles.ctaDecoration, styles.ctaTopLeft]}>
                  <FloralElement size={24} color={colors.background} animated={true} variant="detailed" />
                </View>
                <View style={[styles.ctaDecoration, styles.ctaTopRight]}>
                  <StarburstPattern size={28} color={colors.background} animated={true} />
                </View>
              </View>

              <View style={styles.ctaContent}>
                <Text style={styles.ctaTitle}>Vous êtes artiste ?</Text>
                <Text style={styles.ctaSubtitle}>
                  Exposez gratuitement vos œuvres dans notre galerie
                </Text>
                <TouchableOpacity style={styles.ctaButton}>
                  <LinearGradient
                    colors={[colors.background, colors.surface]}
                    style={styles.ctaButtonGradient}
                  >
                    <Text style={styles.ctaButtonText}>Rejoindre la galerie</Text>
                    <IconSymbol name="arrow.right" size={20} color={colors.text} />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </ScrollView>

        {/* Panier modal */}
        <CartSheet isVisible={showCart} onClose={() => setShowCart(false)} />
      </SafeAreaView>
    </DecorativeBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: 'rgba(15, 15, 35, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    marginRight: spacing.md,
  },
  headerText: {
    flex: 1,
  },
  greeting: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  appName: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '700',
  },
  cartButton: {
    position: 'relative',
  },
  cartButtonGradient: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.error,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.background,
  },
  cartBadgeText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120, // Space for floating tab bar
  },
  heroContainer: {
    margin: spacing.lg,
  },
  heroSection: {
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    ...shadows.large,
  },
  heroDecorations: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  heroDecoration: {
    position: 'absolute',
  },
  topLeft: {
    top: spacing.md,
    left: spacing.md,
  },
  topRight: {
    top: spacing.md,
    right: spacing.md,
  },
  bottomLeft: {
    bottom: spacing.md,
    left: spacing.md,
  },
  bottomRight: {
    bottom: spacing.md,
    right: spacing.md,
  },
  heroContent: {
    alignItems: 'center',
    zIndex: 1,
  },
  heroIconContainer: {
    marginBottom: spacing.lg,
  },
  heroIconGradient: {
    padding: spacing.lg,
    borderRadius: borderRadius.round,
    ...shadows.glow,
  },
  heroTitle: {
    color: colors.text,
    fontSize: 32,
    fontWeight: '700',
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  heroSubtitle: {
    color: colors.text,
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.9,
    maxWidth: width * 0.8,
  },
  quickNav: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
    gap: spacing.md,
  },
  navButtonContainer: {
    flex: 1,
  },
  navButton: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    position: 'relative',
    overflow: 'hidden',
    ...shadows.medium,
  },
  navButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: spacing.sm,
  },
  navButtonDecoration: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    opacity: 0.6,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
  },
  seeAllText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.lg,
    justifyContent: 'space-between',
  },
  ctaContainer: {
    margin: spacing.lg,
  },
  ctaSection: {
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    position: 'relative',
    overflow: 'hidden',
    ...shadows.large,
  },
  ctaDecorations: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  ctaDecoration: {
    position: 'absolute',
    opacity: 0.7,
  },
  ctaTopLeft: {
    top: spacing.md,
    left: spacing.md,
  },
  ctaTopRight: {
    top: spacing.md,
    right: spacing.md,
  },
  ctaContent: {
    alignItems: 'center',
    zIndex: 1,
  },
  ctaTitle: {
    color: colors.background,
    fontSize: 26,
    fontWeight: '700',
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  ctaSubtitle: {
    color: colors.background,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: spacing.xl,
    opacity: 0.9,
    maxWidth: width * 0.8,
  },
  ctaButton: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  ctaButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    gap: spacing.sm,
  },
  ctaButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
});
