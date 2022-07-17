import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  CategoryDto,
  CreateUpdateCategoryDto,
} from '../../../server/common/categories.dto';

export function useCategoriesQuery() {
  return useQuery('categories', () =>
    axios
      .get('categories')
      .then((response) => response.data as CategoryDto[]),
  );
}

export function useCategoryQuery(categoryId: string | undefined) {
  const queryClient = useQueryClient();
  return useQuery(
    ['categories', categoryId],
    () =>
      axios
        .get(`categories/${categoryId}`)
        .then((response) => response.data as CategoryDto),
    {
      enabled: !!categoryId,
      initialData: () => {
        // Use a todo from the 'todos' query as the initial data for this todo query
        return (queryClient.getQueryData('categories') as CategoryDto[] | undefined)?.find(c => c.id === categoryId)
      },
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  );
}

export function useCreateCategoryMutation() {
  return useMutation((category: CreateUpdateCategoryDto) =>
    axios.post('categories/create', category).then((response) => response.data),
  );
}

export function useUpdateCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation((params: {categoryId: string, category: CreateUpdateCategoryDto}) =>
    axios
      .put(`categories/update/${encodeURIComponent(params.categoryId)}`, params.category)
      .then((response) => {
        queryClient.invalidateQueries('categories');

        return response.data;
      }),
  );
}

export function useDeleteCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation((categoryId: string) =>
    axios
      .delete(`categories/delete/${encodeURIComponent(categoryId)}`)
      .then((response) => {
        queryClient.invalidateQueries('categories');

        return response.data;
      }),
  );
}
