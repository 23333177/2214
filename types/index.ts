
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  type: 'cd' | 'usb';
  imageUrl: string;
  audioPreviewUrl?: string;
  genre: string;
  artist: string;
  createdAt: Date;
  inStock: boolean;
  stockCount: number;
}

export interface ArtWork {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  artist: Artist;
  category: 'painting' | 'digital' | 'photography' | 'sculpture' | 'mixed';
  tags: string[];
  createdAt: Date;
  likes: number;
  views: number;
}

export interface Artist {
  id: string;
  name: string;
  bio: string;
  profileImageUrl: string;
  socialLinks: {
    instagram?: string;
    twitter?: string;
    website?: string;
  };
  artworks: ArtWork[];
  verified: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profileImageUrl?: string;
  isArtist: boolean;
  favoriteArtworks: string[];
  cart: CartItem[];
}
