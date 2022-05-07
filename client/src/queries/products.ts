import axios from 'axios';
import { useQuery } from 'react-query';
import { ProductDto } from '../../../dto/products.dto';

export function useProductsQuery() {
  return useQuery('products', () =>
    axios
      .get('products')
      .then((response) => response.data as ProductDto[])
  );
}
