import type { Unit as _UnitType } from '@prisma/client';
import { CategoryDto } from './categories.dto';

export type Unit = _UnitType;

export interface CreateProductDto {
  name: string;
  price: number;
  promoPrice?: number;
  store: string;
  quantityInThePackage?: number;
  unit: Unit;
  categoryIds?: string[];
  date: string;
  description?: string;
}

export interface UpdateProductDto {
  name: string;
  unit: Unit;
  categoryIds?: string[];
  history: ProductHistoryItem[];
}

export interface ProductListItemDto {
  id: string;
  name: string;
  price: string;
  promoPrice: string | null;
  store: string;
  quantityInThePackage: string;
  unit: Unit;
  date: string;
  categories: CategoryDto[];
}

export interface ProductDto extends ProductListItemDto {
  history: ProductHistoryItem[];
  createdAt: string;
  updatedAt: string;
  categoryIds: string[];
}

export interface ProductHistoryItem {
  price: number;
  promoPrice: number | null;
  store: string;
  quantityInThePackage: number;
  date: string;
  description?: string;
}
