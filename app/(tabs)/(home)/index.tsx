
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

  React.useEffect(() => {
    // Animation d'entrée
    headerOpacity.value = withTiming(1, { duration: 1000 });
    headerTranslateY.value = withSpring(0);
    
    // Animation de pulsation continue
    pulseScale.value = withRepeat(
      withTiming(1.1, { duration: 2000 }),
      -1,
      true
    );
    
    // Rotation continue
    rotateValue.value = withRepeat(
      withTiming(360, { duration: 10000 }),
      -1,
      false
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

  const featuredProducts = state.products.slice(0, 4);
  const featuredArtworks = state.artworks.slice(0, 3);
  const cartItemsCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      
      {/* Header avec panier */}
      <Animated.View style={[styles.header, headerAnimatedStyle]}>
        <View>
          <Text style={styles.greeting}>Bienvenue sur</Text>
          <Text style={styles.appName}>BeatGallery</Text>
        </View>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => setShowCart(true)}
        >
          <IconSymbol name="cart" size={24} color={colors.text} />
          {cartItemsCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartItemsCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Section */}
        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          style={styles.heroSection}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Animated.View style={[styles.heroContent, pulseAnimatedStyle]}>
            <Animated.View style={[styles.musicIcon, rotateAnimatedStyle]}>
              <IconSymbol name="music.note" size={48} color={colors.text} />
            </Animated.View>
            <Text style={styles.heroTitle}>Beats & Art</Text>
            <Text style={styles.heroSubtitle}>
              Découvrez des beats uniques et explorez l'art contemporain
            </Text>
          </Animated.View>
        </LinearGradient>

        {/* Navigation rapide */}
        <View style={styles.quickNav}>
          <TouchableOpacity
            style={[styles.navButton, { backgroundColor: colors.primary }]}
            onPress={() => dispatch({ type: 'SET_CURRENT_VIEW', payload: 'shop' })}
          >
            <IconSymbol name="music.note" size={24} color={colors.text} />
            <Text style={styles.navButtonText}>Boutique</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.navButton, { backgroundColor: colors.secondary }]}
            onPress={() => dispatch({ type: 'SET_CURRENT_VIEW', payload: 'gallery' })}
          >
            <IconSymbol name="photo" size={24} color={colors.text} />
            <Text style={styles.navButtonText}>Galerie</Text>
          </TouchableOpacity>
        </View>

        {/* Produits en vedette */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Beats en vedette</Text>
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
            <Text style={styles.sectionTitle}>Art en vedette</Text>
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

        {/* Call to action pour les artistes */}
        <LinearGradient
          colors={[colors.accent, colors.primary]}
          style={styles.ctaSection}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.ctaTitle}>Vous êtes artiste ?</Text>
          <Text style={styles.ctaSubtitle}>
            Exposez gratuitement vos œuvres dans notre galerie
          </Text>
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Rejoindre la galerie</Text>
            <IconSymbol name="arrow.right" size={20} color={colors.background} />
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>

      {/* Panier modal */}
      <CartSheet isVisible={showCart} onClose={() => setShowCart(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
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
    padding: spacing.sm,
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Space for floating tab bar
  },
  heroSection: {
    margin: spacing.lg,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    ...shadows.large,
  },
  heroContent: {
    alignItems: 'center',
  },
  musicIcon: {
    marginBottom: spacing.md,
  },
  heroTitle: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  heroSubtitle: {
    color: colors.text,
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.9,
  },
  quickNav: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  navButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    ...shadows.small,
  },
  navButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: spacing.sm,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
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
  ctaSection: {
    margin: spacing.lg,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    ...shadows.large,
  },
  ctaTitle: {
    color: colors.background,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  ctaSubtitle: {
    color: colors.background,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: spacing.lg,
    opacity: 0.9,
  },
  ctaButton: {
    backgroundColor: colors.background,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    ...shadows.small,
  },
  ctaButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginRight: spacing.sm,
  },
});
