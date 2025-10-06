
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  // Palette inspirée des images - couleurs vibrantes et contrastées
  primary: '#FF4757', // Rouge vibrant (inspiré de l'image aux fleurs rouges)
  secondary: '#3742FA', // Bleu électrique (inspiré des étoiles bleues)
  accent: '#FFA502', // Orange doré (inspiré de l'étoile dorée)
  tertiary: '#2ED573', // Vert vif (inspiré des feuilles)
  
  // Couleurs de fond
  background: '#0F0F23', // Bleu très foncé
  surface: '#1A1A2E', // Bleu foncé
  surfaceLight: '#16213E', // Bleu marine
  
  // Textes
  text: '#EAEAEA', // Blanc cassé
  textSecondary: '#A4A4A4', // Gris clair
  textMuted: '#6C6C6C', // Gris moyen
  
  // États
  success: '#2ED573',
  warning: '#FFA502',
  error: '#FF4757',
  info: '#3742FA',
  
  // Mode clair
  lightBackground: '#F8F9FA',
  lightSurface: '#FFFFFF',
  lightText: '#2D3436',
  lightTextSecondary: '#636E72',
  
  // Transparences et effets
  overlay: 'rgba(15, 15, 35, 0.85)',
  cardOverlay: 'rgba(26, 26, 46, 0.9)',
  glassEffect: 'rgba(255, 255, 255, 0.1)',
  starburstGlow: 'rgba(255, 71, 87, 0.3)',
  floralGlow: 'rgba(58, 66, 250, 0.3)',
  
  // Dégradés décoratifs
  gradientPrimary: ['#FF4757', '#FFA502'],
  gradientSecondary: ['#3742FA', '#2ED573'],
  gradientAccent: ['#FFA502', '#FF4757'],
  gradientNeutral: ['#1A1A2E', '#16213E'],
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  round: 50,
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  h4: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 26,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodyLarge: {
    fontSize: 18,
    fontWeight: '400' as const,
    lineHeight: 26,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  small: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
};

export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  glow: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  coloredGlow: (color: string) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  }),
};

export const animations = {
  spring: {
    damping: 15,
    stiffness: 150,
  },
  timing: {
    duration: 300,
  },
  longTiming: {
    duration: 800,
  },
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.medium,
  },
  cardElevated: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.large,
  },
  glassCard: {
    backgroundColor: colors.glassEffect,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
  },
  decorativeCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: colors.primary,
    ...shadows.glow,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textPrimary: {
    color: colors.text,
    ...typography.body,
  },
  textSecondary: {
    color: colors.textSecondary,
    ...typography.caption,
  },
  textMuted: {
    color: colors.textMuted,
    ...typography.small,
  },
  heading1: {
    color: colors.text,
    ...typography.h1,
  },
  heading2: {
    color: colors.text,
    ...typography.h2,
  },
  heading3: {
    color: colors.text,
    ...typography.h3,
  },
  heading4: {
    color: colors.text,
    ...typography.h4,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.medium,
  },
  buttonSecondary: {
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.medium,
  },
  buttonText: {
    color: colors.text,
    ...typography.button,
  },
  decorativeElement: {
    position: 'absolute',
    opacity: 0.6,
  },
});
