import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import './api';
import { AuthProvider } from './auth/auth-provider';
import { RequireAuth } from './auth/require-auth';
import { Layout } from './components/layout';
import { CategoriesRoute } from './routes/categories-route';
import { LoginRoute } from './routes/login-route';
import { LogoutRoute } from './routes/logout-route';
import { ProductsRoute } from './routes/products-route';
import { CreateProductRoute } from './routes/create-product-route';
import { EditProductRoute } from './routes/edit-product-route';

const queryClient = new QueryClient();
const theme = createTheme({
  palette: {
    primary: {
      main: '#ff8a80',
    },
    secondary: {
      main: '#aed581',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <CssBaseline />

            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Navigate replace to="products" />} />

                <Route
                  path="products"
                  element={
                    <RequireAuth>
                      <ProductsRoute />
                    </RequireAuth>
                  }
                />

                <Route
                  path="products/create"
                  element={
                    <RequireAuth>
                      <CreateProductRoute />
                    </RequireAuth>
                  }
                />

                <Route
                  path="products/edit/:productId"
                  element={
                    <RequireAuth>
                      <EditProductRoute/>
                    </RequireAuth>
                  }
                />

                <Route
                  path="categories"
                  element={
                    <RequireAuth>
                      <CategoriesRoute />
                    </RequireAuth>
                  }
                />
              </Route>

              <Route path="login" element={<LoginRoute />} />
              <Route path="logout" element={<LogoutRoute />} />
            </Routes>
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
