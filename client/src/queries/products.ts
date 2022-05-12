import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  CreateProductDto,
  ProductDto,
  ProductListItemDto,
} from '../../../dto/products.dto';

export function useProductsQuery() {
  return useQuery('products', () =>
    axios
      .get('products')
      .then((response) => response.data as ProductListItemDto[]),
  );
}

export function useProductQuery(productId: string | undefined) {
  const queryClient = useQueryClient();
  return useQuery(
    ['products', productId],
    () =>
      axios
        .get(`products/${productId}`)
        .then((response) => response.data as ProductDto),
    {
      enabled: !!productId,
      placeholderData: () => {
        const cachedProductListItem = (queryClient.getQueryData('products') as ProductListItemDto[] | undefined)?.find(
          (p) => p.id === productId,
        );

        if (cachedProductListItem) {
          return {
            ...cachedProductListItem,
            createdAt: '',
            updatedAt: '',
            history: [],
          };
        } else {
          return undefined;
        }
      },
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  );
}

export function useCreateProductMutation() {
  return useMutation((product: CreateProductDto) =>
    axios.post('products/create', product).then((response) => response.data),
  );
}

export function useDeleteProductMutation() {
  const queryClient = useQueryClient();

  return useMutation((productId: string) =>
    axios
      .delete(`products/delete/${encodeURIComponent(productId)}`)
      .then((response) => {
        queryClient.invalidateQueries('products');

        return response.data;
      }),
  );
}
