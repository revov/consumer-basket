import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Alert,
  Button,
  Card,
  Grid,
  InputAdornment,
  Paper,
  TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import bg from 'date-fns/locale/bg';

import { useProductQuery } from '../queries/products';
import { ProductHistoryTable } from '../components/product-history-table';

export function EditProductRoute() {
  const { productId } = useParams();
  const existingProductQuery = useProductQuery(productId);

  const navigate = useNavigate();

  const [serverError, setServerError] = useState('');

  const [productName, setProductName] = useState('');

  useEffect(() => {
    setProductName((prev) => existingProductQuery.data?.name ?? prev);
  }, [existingProductQuery.data]);

  const handleUpdate = async () => {
    try {
      // await createProductMutation.mutateAsync({
      //   name: productFormState.name,
      //   price: +productFormState.price,
      //   promoPrice: productFormState.promoPrice || undefined,
      //   store: productFormState.store,
      //   quantityInThePackage: productFormState.quantityInThePackage,
      //   date: formatISO(productFormState.date ?? startOfToday(), { representation: 'date' }),
      // });

      navigate('/products');
    } catch (e) {
      setServerError('Имате невалидно попълнени данни');
    }
  };

  return (
    <Paper
      elevation={2}
      square
      sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
    >
      <h3>Редактиране на продукт "{existingProductQuery.data?.name}"</h3>

      {existingProductQuery.data && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            handleUpdate();
          }}
          noValidate
        >
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={bg}>
            <Grid container spacing={3}>
              {!!serverError && (
                <Grid item xs={12}>
                  <Alert severity="error">{serverError}</Alert>
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  label="Име на продукта"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  fullWidth
                  autoComplete="off"
                />
              </Grid>

              <Grid item xs={12}>
                <ProductHistoryTable
                  history={existingProductQuery.data.history ?? []}
                />
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <Grid container spacing={3} sx={{ padding: 3 }}>
                    <Grid item xs={12}>
                      Регистриране на нова цена:
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        label="Цена (без намаление)"
                        value={0}
                        type="number"
                        fullWidth
                        inputProps={{ min: 0 }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">лв</InputAdornment>
                          ),
                        }}
                        autoComplete="off"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        label="Промо цена"
                        value={0}
                        type="number"
                        fullWidth
                        inputProps={{ min: 0 }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">лв</InputAdornment>
                          ),
                        }}
                        autoComplete="off"
                        size="small"
                      />
                    </Grid>
                  </Grid>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  startIcon={<EditIcon />}
                >
                  Редактирай
                </Button>
              </Grid>
            </Grid>
          </LocalizationProvider>
        </form>
      )}
    </Paper>
  );
}
