
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { IconSymbol } from './IconSymbol';
import { colors, spacing, borderRadius, typography, shadows } from '../styles/commonStyles';
import { useApp } from '../contexts/AppContext';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface CartSheetProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function CartSheet({ isVisible, onClose }: CartSheetProps) {
  const { state, dispatch } = useApp();
  const translateY = useSharedValue(isVisible ? 0 : 1000);

  React.useEffect(() => {
    translateY.value = withSpring(isVisible ? 0 : 1000);
  }, [isVisible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const totalPrice = state.cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { productId, quantity } });
  };

  const handleRemoveItem = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const handleCheckout = () => {
    Alert.alert(
      'Commande confirmée !',
      `Total: ${totalPrice.toFixed(2)}€\n\nMerci pour votre achat ! Vous recevrez un email de confirmation.`,
      [
        {
          text: 'OK',
          onPress: () => {
            dispatch({ type: 'CLEAR_CART' });
            onClose();
          },
        },
      ]
    );
  };

  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.backdrop} onPress={onClose} />
      <Animated.View style={[styles.sheet, animatedStyle]}>
        <View style={styles.header}>
          <Text style={styles.title}>Panier ({state.cart.length})</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <IconSymbol name="xmark" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {state.cart.length === 0 ? (
          <View style={styles.emptyCart}>
            <IconSymbol name="cart" size={64} color={colors.textSecondary} />
            <Text style={styles.emptyText}>Votre panier est vide</Text>
            <Text style={styles.emptySubtext}>
              Ajoutez des beats pour commencer vos achats
            </Text>
          </View>
        ) : (
          <>
            <ScrollView style={styles.cartItems} showsVerticalScrollIndicator={false}>
              {state.cart.map((item) => (
                <View key={item.product.id} style={styles.cartItem}>
                  <Image
                    source={{ uri: item.product.imageUrl }}
                    style={styles.itemImage}
                  />
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemTitle} numberOfLines={2}>
                      {item.product.title}
                    </Text>
                    <Text style={styles.itemPrice}>
                      {item.product.price.toFixed(2)}€
                    </Text>
                    <View style={styles.quantityControls}>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() =>
                          handleUpdateQuantity(item.product.id, item.quantity - 1)
                        }
                      >
                        <IconSymbol name="minus" size={16} color={colors.text} />
                      </TouchableOpacity>
                      <Text style={styles.quantity}>{item.quantity}</Text>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() =>
                          handleUpdateQuantity(item.product.id, item.quantity + 1)
                        }
                      >
                        <IconSymbol name="plus" size={16} color={colors.text} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveItem(item.product.id)}
                  >
                    <IconSymbol name="trash" size={20} color={colors.error} />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>

            <View style={styles.footer}>
              <View style={styles.totalSection}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalPrice}>{totalPrice.toFixed(2)}€</Text>
              </View>
              <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                <Text style={styles.checkoutText}>Commander</Text>
                <IconSymbol name="arrow.right" size={20} color={colors.background} />
              </TouchableOpacity>
            </View>
          </>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    maxHeight: '80%',
    ...shadows.large,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  closeButton: {
    padding: spacing.sm,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
    marginTop: spacing.md,
  },
  emptySubtext: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  cartItems: {
    flex: 1,
    padding: spacing.lg,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.sm,
  },
  itemInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  itemTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemPrice: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: colors.surface,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: spacing.md,
  },
  removeButton: {
    padding: spacing.sm,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.background,
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  totalLabel: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
  totalPrice: {
    color: colors.accent,
    fontSize: 24,
    fontWeight: '700',
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    ...shadows.medium,
  },
  checkoutText: {
    color: colors.background,
    fontSize: 18,
    fontWeight: '700',
    marginRight: spacing.sm,
  },
});
