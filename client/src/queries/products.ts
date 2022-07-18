import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  CreateProductDto,
  UpdateProductDto,
  ProductDto,
  ProductListItemDto,
} from '../../../server/common/products.dto';

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
            categoryIds: [],
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

export function useUpdateProductMutation() {
  const queryClient = useQueryClient();

  return useMutation((params: {productId: string, product: UpdateProductDto}) =>
    axios
      .put(`products/update/${encodeURIComponent(params.productId)}`, params.product)
      .then((response) => {
        queryClient.invalidateQueries('products');

        return response.data;
      }),
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
