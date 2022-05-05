import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import './api';
import { AuthProvider } from './auth/auth-provider';
import { RequireAuth } from './auth/require-auth';
import { MainNav } from './components/main-nav';
import { HomeRoute } from './routes/home-route';
import { LoginRoute } from './routes/login-route';
import { LogoutRoute } from './routes/logout-route';

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <MainNav />

          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <HomeRoute />
                </RequireAuth>
              }
            />

            <Route path="login" element={<LoginRoute />} />
            <Route path="logout" element={<LogoutRoute />} />
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
