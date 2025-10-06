
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product, ArtWork, CartItem, User } from '../types';
import { mockProducts, mockArtworks } from '../data/mockData';

interface AppState {
  products: Product[];
  artworks: ArtWork[];
  cart: CartItem[];
  user: User | null;
  favoriteArtworks: string[];
  currentView: 'home' | 'shop' | 'gallery' | 'profile';
}

type AppAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'TOGGLE_FAVORITE_ARTWORK'; payload: string }
  | { type: 'SET_CURRENT_VIEW'; payload: AppState['currentView'] }
  | { type: 'CLEAR_CART' };

const initialState: AppState = {
  products: mockProducts,
  artworks: mockArtworks,
  cart: [],
  user: null,
  favoriteArtworks: [],
  currentView: 'home',
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => item.product.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { product: action.payload, quantity: 1 }],
      };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload),
      };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0),
      };
    case 'TOGGLE_FAVORITE_ARTWORK': {
      const isFavorite = state.favoriteArtworks.includes(action.payload);
      return {
        ...state,
        favoriteArtworks: isFavorite
          ? state.favoriteArtworks.filter(id => id !== action.payload)
          : [...state.favoriteArtworks, action.payload],
      };
    }
    case 'SET_CURRENT_VIEW':
      return {
        ...state,
        currentView: action.payload,
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
