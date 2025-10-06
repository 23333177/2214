
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, spacing, borderRadius, shadows } from '@/styles/commonStyles';
import { useApp } from '@/contexts/AppContext';
import ArtworkCard from '@/components/ArtworkCard';
import DecorativeBackground from '@/components/DecorativeBackground';
import StarburstPattern from '@/components/StarburstPattern';
import FloralElement from '@/components/FloralElement';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GalleryScreen() {
  const { state } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Animations
  const headerOpacity = useSharedValue(0);
  const searchScale = useSharedValue(0.9);

  React.useEffect(() => {
    headerOpacity.value = withTiming(1, { duration: 800 });
    searchScale.value = withSpring(1);
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
  }));

  const searchAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: searchScale.value }],
  }));

  const categories = [
    { id: 'all', name: 'Tout', icon: 'photo' },
    { id: 'digital', name: 'Digital', icon: 'computer' },
    { id: 'painting', name: 'Peinture', icon: 'paintbrush' },
    { id: 'photography', name: 'Photo', icon: 'camera' },
  ];

  const filteredArtworks = state.artworks.filter(artwork => {
    const matchesSearch = artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         artwork.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || artwork.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <DecorativeBackground variant="floral" intensity="medium">
      <SafeAreaView style={styles.container}>
        {/* Header décoratif */}
        <Animated.View style={[styles.header, headerAnimatedStyle]}>
          <LinearGradient
            colors={colors.gradientSecondary}
            style={styles.headerGradient}
          >
            <View style={styles.headerContent}>
              <View style={styles.headerLeft}>
                <FloralElement size={32} color={colors.text} animated={true} variant="simple" />
                <View style={styles.headerText}>
                  <Text style={styles.headerTitle}>Galerie d'Art</Text>
                  <Text style={styles.headerSubtitle}>Explorez l'art contemporain</Text>
                </View>
              </View>
              <View style={styles.headerDecoration}>
                <StarburstPattern size={24} color={colors.accent} animated={true} />
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Barre de recherche */}
        <Animated.View style={[styles.searchContainer, searchAnimatedStyle]}>
          <LinearGradient
            colors={[colors.surface, colors.surfaceLight]}
            style={styles.searchGradient}
          >
            <IconSymbol name="magnifyingglass" size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher des œuvres ou artistes..."
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <IconSymbol name="xmark.circle.fill" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            )}
          </LinearGradient>
        </Animated.View>

        {/* Catégories */}
        <View style={styles.categoriesContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categories}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <LinearGradient
                  colors={selectedCategory === category.id ? colors.gradientPrimary : [colors.surface, colors.surface]}
                  style={styles.categoryGradient}
                >
                  <IconSymbol 
                    name={category.icon as any} 
                    size={18} 
                    color={selectedCategory === category.id ? colors.text : colors.textSecondary} 
                  />
                  <Text style={[
                    styles.categoryText,
                    selectedCategory === category.id && styles.categoryTextActive
                  ]}>
                    {category.name}
                  </Text>
                  {selectedCategory === category.id && (
                    <View style={styles.categoryDecoration}>
                      <StarburstPattern size={12} color={colors.text} animated={true} />
                    </View>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Liste des œuvres */}
        <ScrollView
          style={styles.artworksList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.artworksContent}
        >
          {filteredArtworks.length > 0 ? (
            <>
              <View style={styles.resultsHeader}>
                <View style={styles.resultsInfo}>
                  <FloralElement size={16} color={colors.primary} animated={true} variant="simple" />
                  <Text style={styles.resultsText}>
                    {filteredArtworks.length} œuvre{filteredArtworks.length > 1 ? 's' : ''} trouvée{filteredArtworks.length > 1 ? 's' : ''}
                  </Text>
                </View>
              </View>
              
              {filteredArtworks.map((artwork, index) => (
                <View key={artwork.id} style={styles.artworkContainer}>
                  <ArtworkCard
                    artwork={artwork}
                    onPress={() => console.log('Artwork pressed:', artwork.title)}
                  />
                  {/* Éléments décoratifs alternés */}
                  {index % 3 === 0 && (
                    <View style={styles.artworkDecoration}>
                      <StarburstPattern size={20} color={colors.secondary} animated={true} />
                    </View>
                  )}
                  {index % 3 === 1 && (
                    <View style={[styles.artworkDecoration, styles.artworkDecorationRight]}>
                      <FloralElement size={18} color={colors.tertiary} animated={true} variant="simple" />
                    </View>
                  )}
                </View>
              ))}
            </>
          ) : (
            <View style={styles.emptyState}>
              <LinearGradient
                colors={colors.gradientNeutral}
                style={styles.emptyStateGradient}
              >
                <FloralElement size={48} color={colors.textSecondary} animated={true} variant="detailed" />
                <Text style={styles.emptyStateTitle}>Aucune œuvre trouvée</Text>
                <Text style={styles.emptyStateText}>
                  Essayez de modifier vos critères de recherche
                </Text>
              </LinearGradient>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </DecorativeBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  headerGradient: {
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.medium,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerText: {
    marginLeft: spacing.md,
  },
  headerTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '700',
  },
  headerSubtitle: {
    color: colors.text,
    fontSize: 14,
    opacity: 0.8,
  },
  headerDecoration: {
    opacity: 0.7,
  },
  searchContainer: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  searchGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.primary,
    ...shadows.small,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    marginLeft: spacing.md,
  },
  categoriesContainer: {
    marginBottom: spacing.lg,
  },
  categories: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  categoryButton: {
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  categoryButtonActive: {
    ...shadows.glow,
  },
  categoryGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    position: 'relative',
  },
  categoryText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
    marginLeft: spacing.sm,
  },
  categoryTextActive: {
    color: colors.text,
    fontWeight: '600',
  },
  categoryDecoration: {
    position: 'absolute',
    top: 2,
    right: 2,
    opacity: 0.6,
  },
  artworksList: {
    flex: 1,
  },
  artworksContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 120,
  },
  resultsHeader: {
    marginBottom: spacing.lg,
  },
  resultsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  resultsText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  artworkContainer: {
    position: 'relative',
    marginBottom: spacing.lg,
  },
  artworkDecoration: {
    position: 'absolute',
    top: -spacing.sm,
    left: -spacing.sm,
    opacity: 0.6,
    zIndex: -1,
  },
  artworkDecorationRight: {
    left: 'auto',
    right: -spacing.sm,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xxxl,
  },
  emptyStateGradient: {
    padding: spacing.xl,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    ...shadows.medium,
  },
  emptyStateTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '600',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  emptyStateText: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
  },
});
