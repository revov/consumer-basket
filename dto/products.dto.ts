export interface CreateProductDto {
  name: string;
  price: number;
  promoPrice?: number;
  store: string;
  quantityInThePackage?: number;
  categoryId?: string;
  date: string;
}

export interface ProductListItemDto {
  id: string;
  name: string;
  price: string;
  promoPrice: string | null;
  store: string;
  quantityInThePackage: number;
  date: string;
}

export interface ProductDto extends ProductListItemDto {
  history: ProductHistoryItem[];
  createdAt: string;
  updatedAt: string;
  //category?
}

export interface ProductHistoryItem {
  name: string;
  price: number;
  promoPrice: number;
  store: string;
  quantityInThePackage: number;
  date: string;
}
