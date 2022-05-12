import { useCallback } from 'react';
import { Grid, InputAdornment, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import bg from 'date-fns/locale/bg';
import { ProductHistoryItem } from '../../../dto/products.dto';

interface Props {
  value: PurchaseFormState;
  onChange: (value: PurchaseFormState) => void;
}

export interface PurchaseFormState {
  price: number | null;
  promoPrice: number | null;
  quantityInThePackage: number;
  store: string;
  date: Date;
}

export function ProductPurchaseForm(props: Props) {
  const renderCurrencyControl = useCallback(
    (
      label: string,
      value: number | null,
      onChange: (value: number) => void,
    ) => {
      return (
        <TextField
          label={label}
          value={value ?? ''}
          onChange={(e) => onChange(+e.target.value)}
          type="number"
          fullWidth
          inputProps={{ min: 0 }}
          InputProps={{
            endAdornment: <InputAdornment position="end">лв</InputAdornment>,
          }}
          autoComplete="off"
          size="small"
        />
      );
    },
    [],
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={bg}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <DatePicker
            label="Дата на закупуване"
            inputFormat="dd/MM/yyyy"
            value={props.value.date}
            onChange={(value) =>
              props.onChange({ ...props.value, date: value! })
            }
            renderInput={(params) => (
              <TextField {...params} fullWidth size="small" />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          {renderCurrencyControl(
            'Цена (без намаление)',
            props.value.price,
            (v) => props.onChange({ ...props.value, price: +v }),
          )}
        </Grid>
        <Grid item xs={12} sm={4}>
          {renderCurrencyControl('Промо цена', props.value.promoPrice, (v) =>
            props.onChange({ ...props.value, promoPrice: +v }),
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Количество в опаковка"
            value={props.value.quantityInThePackage}
            onChange={(e) =>
              props.onChange({
                ...props.value,
                quantityInThePackage: +e.target.value,
              })
            }
            type="number"
            fullWidth
            inputProps={{ min: 0, step: 1 }}
            autoComplete="off"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Магазин"
            value={props.value.store}
            onChange={(e) =>
              props.onChange({ ...props.value, store: e.target.value })
            }
            fullWidth
            autoComplete="off"
            size="small"
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}
