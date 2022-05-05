import axios from 'axios';
import { useMutation } from 'react-query';

export function useLoginMutation() {
  return useMutation(
    (params: { password: string }) =>
      axios
        .post('auth/login', params)
        .then((response) => response.data as { accessToken: string }),
    {
      onSuccess: (data) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
        localStorage.setItem('api_access_token', data.accessToken);
      },
    },
  );
}
