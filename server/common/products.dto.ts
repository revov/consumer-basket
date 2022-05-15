import type { Unit as _UnitType } from '@prisma/client';

export type Unit = _UnitType;

export interface CreateProductDto {
  name: string;
  price: number;
  promoPrice?: number;
  store: string;
  quantityInThePackage?: number;
  unit: Unit;
  categoryId?: string;
  date: string;
  description?: string;
}

export interface UpdateProductDto {
  name: string;
  unit: Unit;
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
}

export interface ProductDto extends ProductListItemDto {
  history: ProductHistoryItem[];
  createdAt: string;
  updatedAt: string;
  //category?
}

export interface ProductHistoryItem {
  price: number;
  promoPrice: number | null;
  store: string;
  quantityInThePackage: number;
  date: string;
  description?: string;
}
