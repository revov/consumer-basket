import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Button, Grid, InputAdornment, Paper, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import startOfToday from 'date-fns/startOfToday';
import formatISO from 'date-fns/formatISO';
import bg from 'date-fns/locale/bg';

import { useCreateProductMutation } from '../queries/products';

interface Props {
  isExisting: boolean;
}

export function SingleProductRoute(props: Props) {
  const { productId } = useParams();
  const createProductMutation = useCreateProductMutation();
  const navigate = useNavigate();

  const [serverError, setServerError] = useState('');

  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [promoPrice, setPromoPrice] = useState<number | ''>('');
  const [quantityInThePackage, setQuantityInThePackage] = useState(1);
  const [store, setStore] = useState('');
  const [date, setDate] = useState<Date | null>(startOfToday());

  const handleCreate = async () => {
    try {
      await createProductMutation.mutateAsync({
        name: name,
        price: +price,
        promoPrice: +promoPrice,
        store: store,
        quantityInThePackage: quantityInThePackage,
        date: formatISO(date ?? startOfToday(), { representation: 'date' }),
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
      <h3>
        {props.isExisting ? 'Редактиране ' : 'Добавяне '}на продукт {productId}
      </h3>

      <form
        onSubmit={async (e) => {
          e.preventDefault();

          if (props.isExisting) {
          } else {
            handleCreate();
          }
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Цена (без намаление)"
                value={price}
                onChange={(e) => setPrice(+e.target.value)}
                type="number"
                fullWidth
                inputProps={{ min: 0 }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">лв</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Промо цена"
                value={promoPrice}
                onChange={(e) => setPromoPrice(+e.target.value)}
                type="number"
                fullWidth
                inputProps={{ min: 0 }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">лв</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Количество в опаковка"
                value={quantityInThePackage}
                onChange={(e) => setQuantityInThePackage(+e.target.value)}
                type="number"
                fullWidth
                inputProps={{ min: 0, step: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Магазин"
                value={store}
                onChange={(e) => setStore(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Дата на закупуване"
                inputFormat="dd/MM/yyyy"
                value={date}
                onChange={setDate}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                startIcon={<AddIcon />}
              >
                {props.isExisting ? 'Редактирай ' : 'Добави'}
              </Button>
            </Grid>
          </Grid>
        </LocalizationProvider>
      </form>
    </Paper>
  );
}
