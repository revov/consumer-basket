import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Button,
  Grid,
  InputAdornment,
  Paper,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import startOfToday from 'date-fns/startOfToday';
import formatISO from 'date-fns/formatISO';
import bg from 'date-fns/locale/bg';

import { useCreateProductMutation } from '../queries/products';
import { ProductHistoryItem } from '../../../server/common/products.dto';

interface ProductFormState {
  name: string;
  price: number | null,
  promoPrice: number | null,
  quantityInThePackage: number,
  store: string,
  date: Date,
  history: ProductHistoryItem[],
}

export function CreateProductRoute() {
  const createProductMutation = useCreateProductMutation();

  const navigate = useNavigate();

  const [serverError, setServerError] = useState('');

  const [productFormState, setProductFormState] = useState<ProductFormState>({
    name: '',
    price: null,
    promoPrice: null,
    quantityInThePackage: 1,
    store: '',
    date: startOfToday(),
    history: [],
  });

  const handleCreate = async () => {
    try {
      await createProductMutation.mutateAsync({
        name: productFormState.name,
        price: productFormState.price ?? 0,
        promoPrice: productFormState.promoPrice || undefined,
        store: productFormState.store,
        quantityInThePackage: productFormState.quantityInThePackage,
        date: formatISO(productFormState.date ?? startOfToday(), {
          representation: 'date',
        }),
      });

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
      <h3>Добавяне на продукт</h3>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          handleCreate();
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

            <Grid item xs={12} sm={6}>
              <TextField
                label="Име на продукта"
                value={productFormState.name ?? ''}
                onChange={(e) =>
                  setProductFormState({
                    ...productFormState,
                    name: e.target.value,
                  })
                }
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Цена (без намаление)"
                value={productFormState.price ?? ''}
                onChange={(e) =>
                  setProductFormState({
                    ...productFormState,
                    price: +e.target.value,
                  })
                }
                type="number"
                fullWidth
                inputProps={{ min: 0 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">лв</InputAdornment>
                  ),
                }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Промо цена"
                value={productFormState.promoPrice ?? ''}
                onChange={(e) =>
                  setProductFormState({
                    ...productFormState,
                    promoPrice: +e.target.value,
                  })
                }
                type="number"
                fullWidth
                inputProps={{ min: 0 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">лв</InputAdornment>
                  ),
                }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Количество в опаковка"
                value={productFormState.quantityInThePackage}
                onChange={(e) =>
                  setProductFormState({
                    ...productFormState,
                    quantityInThePackage: +e.target.value,
                  })
                }
                type="number"
                fullWidth
                inputProps={{ min: 0, step: 1 }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Магазин"
                value={productFormState.store}
                onChange={(e) =>
                  setProductFormState({
                    ...productFormState,
                    store: e.target.value,
                  })
                }
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Дата на закупуване"
                inputFormat="dd/MM/yyyy"
                value={productFormState.date}
                onChange={(value) =>
                  setProductFormState({ ...productFormState, date: value! })
                }
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
              >
                Добави
              </Button>
            </Grid>
          </Grid>
        </LocalizationProvider>
      </form>
    </Paper>
  );
}
