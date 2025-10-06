
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
  withSequence,
  interpolate,
} from 'react-native-reanimated';

import { IconSymbol } from '@/components/IconSymbol';
import { colors, spacing, borderRadius, shadows } from '@/styles/commonStyles';
import { useApp } from '@/contexts/AppContext';

// Composants créatifs
import MorphingBackground from '@/components/MorphingBackground';
import ParticleSystem from '@/components/ParticleSystem';
import InteractiveArtCanvas from '@/components/InteractiveArtCanvas';
import HolographicCard from '@/components/HolographicCard';
import ChaosButton from '@/components/ChaosButton';
import ProductCard from '@/components/ProductCard';
import CartSheet from '@/components/CartSheet';
import FloralElement from '@/components/FloralElement';
import StarburstPattern from '@/components/StarburstPattern';

const { width, height } = Dimensions.get('window');

export default function ShopScreen() {
  const { products, cartItems, isCartVisible, setIsCartVisible } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'cd' | 'usb' | 'vinyl'>('all');
  const [sortBy, setSortBy] = useState<'price' | 'name' | 'chaos'>('chaos');

  // Animations créatives extrêmes
  const shopRotation = useSharedValue(0);
  const priceGlitch = useSharedValue(0);
  const productFloat = useSharedValue(0);
  const chaosSort = useSharedValue(0);

  React.useEffect(() => {
    // Rotation de la boutique
    shopRotation.value = withRepeat(
      withTiming(360, { duration: 15000 }),
      -1,
      false
    );

    // Glitch des prix
    priceGlitch.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 2000 }),
        withTiming(1, { duration: 100 }),
        withTiming(0, { duration: 100 }),
        withTiming(1, { duration: 50 }),
        withTiming(0, { duration: 50 })
      ),
      -1,
      false
    );

    // Flottement des produits
    productFloat.value = withRepeat(
      withTiming(1, { duration: 4000 }),
      -1,
      true
    );

    // Tri chaotique
    if (sortBy === 'chaos') {
      chaosSort.value = withRepeat(
        withTiming(1, { duration: 1000 }),
        -1,
        true
      );
    }
  }, [sortBy]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Tri créatif délirant
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'name':
        return a.title.localeCompare(b.title);
      case 'chaos':
        return Math.random() - 0.5; // Tri complètement aléatoire !
      default:
        return 0;
    }
  });

  const shopStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${shopRotation.value * 0.1}deg` }], // Rotation subtile
  }));

  const glitchStyle = useAnimatedStyle(() => {
    const glitchX = interpolate(priceGlitch.value, [0, 1], [0, Math.random() * 4 - 2]);
    const glitchY = interpolate(priceGlitch.value, [0, 1], [0, Math.random() * 4 - 2]);
    
    return {
      transform: [
        { translateX: glitchX },
        { translateY: glitchY }
      ],
    };
  });

  const floatStyle = useAnimatedStyle(() => {
    const translateY = interpolate(productFloat.value, [0, 1], [-10, 10]);
    const scale = interpolate(productFloat.value, [0, 1], [0.98, 1.02]);
    
    return {
      transform: [
        { translateY },
        { scale }
      ],
    };
  });

  const chaosStyle = useAnimatedStyle(() => {
    if (sortBy !== 'chaos') return {};
    
    const rotate = interpolate(chaosSort.value, [0, 1], [-2, 2]);
    const scale = interpolate(chaosSort.value, [0, 1], [0.99, 1.01]);
    
    return {
      transform: [
        { rotate: `${rotate}deg` },
        { scale }
      ],
    };
  });

  return (
    <View style={styles.container}>
      <MorphingBackground intensity="intense" speed="fast">
        <ParticleSystem 
          particleCount={35} 
          colors={[colors.primary, colors.secondary, colors.accent, '#FF1744', '#00E676', '#FF9100']}
          animated={true} 
        />
        
        <InteractiveArtCanvas maxTouchPoints={30} fadeOutDuration={3000>
          <SafeAreaView style={styles.safeArea}>
            <Animated.View style={[styles.content, shopStyle]}>
              {/* Header de boutique galactique */}
              <View style={styles.header}>
                <HolographicCard intensity="high" style={styles.headerCard}>
                  <Text style={styles.headerTitle}>🛒 BOUTIQUE COSMIQUE 🎵</Text>
                  <Text style={styles.headerSubtitle}>Des beats qui défient les lois de la physique !</Text>
                  
                  <View style={styles.cartButtonContainer}>
                    <ChaosButton
                      title={`🛒 PANIER MAGIQUE (${cartItems.length})`}
                      onPress={() => setIsCartVisible(true)}
                      variant="glitch"
                      size="medium"
                    />
                  </View>
                </HolographicCard>
              </View>

              {/* Barre de recherche créative */}
              <View style={styles.searchContainer}>
                <HolographicCard intensity="medium">
                  <View style={styles.searchInputContainer}>
                    <IconSymbol name="search" size={20} color={colors.primary} />
                    <TextInput
                      style={styles.searchInput}
                      placeholder="Chercher des beats interdimensionnels..."
                      placeholderTextColor={colors.textSecondary}
                      value={searchQuery}
                      onChangeText={setSearchQuery}
                    />
                  </View>
                </HolographicCard>
              </View>

              {/* Contrôles de tri créatifs */}
              <View style={styles.controlsContainer}>
                <HolographicCard intensity="medium" style={styles.controlsCard}>
                  <Text style={styles.controlsTitle}>🎛️ CONTRÔLES QUANTIQUES</Text>
                  
                  <View style={styles.sortButtons}>
                    <ChaosButton
                      title="💰 PRIX"
                      onPress={() => setSortBy('price')}
                      variant={sortBy === 'price' ? 'primary' : 'secondary'}
                      size="small"
                    />
                    <ChaosButton
                      title="📝 NOM"
                      onPress={() => setSortBy('name')}
                      variant={sortBy === 'name' ? 'primary' : 'secondary'}
                      size="small"
                    />
                    <ChaosButton
                      title="🌀 CHAOS"
                      onPress={() => setSortBy('chaos')}
                      variant={sortBy === 'chaos' ? 'chaos' : 'secondary'}
                      size="small"
                    />
                  </View>
                </HolographicCard>
              </View>

              {/* Filtres de catégorie */}
              <View style={styles.categoryContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {['all', 'cd', 'usb', 'vinyl'].map((category) => (
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
                           category === 'cd' ? '💿 CD' :
                           category === 'usb' ? '💾 USB' : '📀 VINYL'}
                        </Text>
                      </HolographicCard>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Boutique de produits créative */}
              <ScrollView style={styles.productsContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.productsGrid}>
                  {/* Éléments décoratifs flottants */}
                  <Animated.View style={[styles.floatingDecoration, { top: 20, left: 20 }, floatStyle]}>
                    <StarburstPattern size={50} color={colors.primary} animated={true} />
                  </Animated.View>
                  <Animated.View style={[styles.floatingDecoration, { top: 150, right: 30 }, floatStyle]}>
                    <FloralElement size={40} color={colors.secondary} animated={true} variant="detailed" />
                  </Animated.View>
                  <Animated.View style={[styles.floatingDecoration, { bottom: 200, left: 40 }, floatStyle]}>
                    <StarburstPattern size={35} color={colors.accent} animated={true} />
                  </Animated.View>

                  {sortedProducts.map((product, index) => (
                    <Animated.View 
                      key={`${product.id}-${sortBy}`} // Key change pour forcer re-render en mode chaos
                      style={[
                        styles.productItem, 
                        floatStyle, 
                        chaosStyle,
                        sortBy === 'chaos' && {
                          transform: [
                            { rotate: `${(Math.random() - 0.5) * 10}deg` },
                            { scale: 0.9 + Math.random() * 0.2 }
                          ]
                        }
                      ]}
                    >
                      <HolographicCard intensity="medium" animated={true}>
                        <ProductCard product={product} />
                        
                        {/* Prix avec effet glitch */}
                        <Animated.View style={[styles.priceContainer, glitchStyle]}>
                          <Text style={styles.priceText}>
                            💎 {product.price}€ 💎
                          </Text>
                        </Animated.View>
                      </HolographicCard>
                    </Animated.View>
                  ))}
                </View>

                {/* Message si aucun produit */}
                {sortedProducts.length === 0 && (
                  <View style={styles.emptyContainer}>
                    <HolographicCard intensity="high" style={styles.emptyCard}>
                      <Text style={styles.emptyTitle}>🌌 DIMENSION VIDE 🌌</Text>
                      <Text style={styles.emptyText}>
                        Aucun beat trouvé dans cette dimension...
                        Essayez de modifier vos filtres quantiques !
                      </Text>
                    </HolographicCard>
                  </View>
                )}

                <View style={styles.bottomSpacer} />
              </ScrollView>
            </Animated.View>
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
  content: {
    flex: 1,
  },
  header: {
    padding: spacing.md,
    alignItems: 'center',
  },
  headerCard: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
    width: '100%',
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
    marginBottom: spacing.md,
  },
  cartButtonContainer: {
    marginTop: spacing.md,
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
  controlsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  sortButtons: {
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
  productsContainer: {
    flex: 1,
    padding: spacing.md,
  },
  productsGrid: {
    position: 'relative',
  },
  productItem: {
    marginBottom: spacing.lg,
  },
  priceContainer: {
    alignItems: 'center',
    marginTop: spacing.sm,
    paddingVertical: spacing.xs,
  },
  priceText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  floatingDecoration: {
    position: 'absolute',
    zIndex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyCard: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  bottomSpacer: {
    height: 100,
  },
});
