import { QueryClient, QueryClientProvider } from 'react-query';

import './api';
import { LoginPage } from './pages/login-page';

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <LoginPage />
    </QueryClientProvider>
  );
}

export default App;
