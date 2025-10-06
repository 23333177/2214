
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  // Palette créative pour beatmaker/art
  primary: '#FF6B35', // Orange vibrant
  secondary: '#4ECDC4', // Turquoise
  accent: '#FFE66D', // Jaune doré
  background: '#1A1A2E', // Bleu foncé
  surface: '#16213E', // Bleu marine
  text: '#EAEAEA', // Blanc cassé
  textSecondary: '#B8B8B8', // Gris clair
  success: '#4ECDC4',
  warning: '#FFE66D',
  error: '#FF6B6B',
  
  // Mode clair
  lightBackground: '#F8F9FA',
  lightSurface: '#FFFFFF',
  lightText: '#2D3436',
  lightTextSecondary: '#636E72',
  
  // Transparences
  overlay: 'rgba(26, 26, 46, 0.8)',
  cardOverlay: 'rgba(22, 33, 62, 0.9)',
  glassEffect: 'rgba(255, 255, 255, 0.1)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
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
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
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
  glassCard: {
    backgroundColor: colors.glassEffect,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
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
});
