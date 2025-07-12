export type Item = {
  id: string;
  name: string;
  description: string;
  category: 'Tops' | 'Bottoms' | 'Dresses' | 'Outerwear' | 'Accessories' | 'Shoes';
  condition: 'New with tags' | 'Excellent' | 'Good' | 'Fair';
  size: string;
  images: string[];
  points: number;
  tags: string[];
  userId: string;
};

export type User = {
  id: string;
  name: string;
  avatar: string;
  location: string;
  memberSince: Date;
  points: number;
};

export type SwapRequest = {
  id: string;
  itemId: string;
  requesterId: string;
  ownerId: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: Date;
};
