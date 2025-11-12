// src/types.ts
export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  mrp?: number;
  category: string;
  brand?: string;
  description?: string;
  fullDescription?: string;
  howToUse?: string;
  variation?: string;
  features?: string[];
  specifications?: Record<string, string | number>;
  trending?: boolean;
  stock: number;
}
