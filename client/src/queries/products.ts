import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { CreateProductDto, ProductDto } from '../../../dto/products.dto';

export function useProductsQuery() {
  return useQuery('products', () =>
    axios
      .get('products')
      .then((response) => response.data as ProductDto[])
  );
}

export function useCreateProductMutation() {
  return useMutation((product: CreateProductDto) =>
    axios
      .post('products/create', product)
      .then((response) => response.data),
  );
}
