import axios from 'axios';
import { useMutation } from 'react-query';

export function useLoginMutation() {
  return useMutation((params: { password: string }) =>
    axios
      .post('auth/login', params)
      .then((response) => response.data as { accessToken: string }),
  );
}
