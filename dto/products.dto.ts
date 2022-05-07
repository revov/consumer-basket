import { Category } from '@prisma/client';
import { ProductHistoryItem } from 'src/products/product-history-item';

export interface CreateProductDto {
  name: string;
  price: number;
  promoPrice?: number;
  store: string;
  quantityInThePackage?: number;
  categoryId: string;
  date: string;
}

export type ProductDto = {
  id: string;
  name: string;
  price: string;
  promoPrice: string | null;
  store: string;
  quantityInThePackage: string;
  categoryId: string | null;
  date: string;
  history: ProductHistoryItem[];
  category: Category;
};
