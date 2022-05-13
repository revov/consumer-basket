import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import bg from 'date-fns/locale/bg';
import formatISO from 'date-fns/formatISO';

import { useProductQuery, useUpdateProductMutation } from '../queries/products';
import { PurchaseHistoryTable } from '../components/purchase-history-table';
import startOfToday from 'date-fns/startOfToday';
import {
  ProductPurchaseForm,
  PurchaseFormState,
} from '../components/product-purchase-form';

export function EditProductRoute() {
  const { productId } = useParams();
  const existingProductQuery = useProductQuery(productId);
  const updateProductMutation = useUpdateProductMutation();

  const navigate = useNavigate();

  const [serverError, setServerError] = useState('');

  const [productName, setProductName] = useState('');
  const [productPurchase, setProductPurchase] = useState<PurchaseFormState>({
    price: null,
    promoPrice: null,
    quantityInThePackage: 1,
    store: '',
    date: startOfToday(),
  });
  const [registerNewPurchase, setRegisterNewPurchase] = useState(false);

  useEffect(() => {
    setProductName((prev) => existingProductQuery.data?.name ?? prev);
  }, [existingProductQuery.data]);

  const handleUpdate = async () => {
    try {
      const history = [...(existingProductQuery.data?.history ?? [])];
      if (registerNewPurchase) {
        history.push({
          ...productPurchase,
          price: productPurchase.price ?? 0,
          date: formatISO(productPurchase.date ?? startOfToday(), { representation: 'date' })
        })
      }
      await updateProductMutation.mutateAsync({
        productId: productId!,
        product: {
          name: productName,
          history: history,
        }
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
                <PurchaseHistoryTable
                  history={existingProductQuery.data.history ?? []}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  label={'Регистриране на нова покупка'}
                  control={
                    <Checkbox
                      checked={registerNewPurchase}
                      onChange={() => setRegisterNewPurchase((prev) => !prev)}
                    />
                  }
                />
              </Grid>

              {registerNewPurchase && (
                <Grid item xs={12}>
                  <ProductPurchaseForm
                    value={productPurchase}
                    onChange={setProductPurchase}
                  />
                </Grid>
              )}

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
