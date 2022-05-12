import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { orderBy } from 'lodash';
import { useMemo } from 'react';
import { ProductHistoryItem } from '../../../dto/products.dto';
import { CurrencyRenderer } from './currency-renderer';
import { DateRenderer } from './date-renderer';

interface Props {
  history: ProductHistoryItem[];
}

export function PurchaseHistoryTable(props: Props) {
  const sortedPurchases = useMemo(
    () =>
      orderBy(props.history, 'date' as keyof typeof props.history[0], 'desc'),
    [],
  );

  return (
    <Table sx={{ minWidth: 650, maxHeight: 400 }} stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell>Дата</TableCell>
          <TableCell align="right">Промо цена</TableCell>
          <TableCell align="right">Цена</TableCell>
          <TableCell>Кол. в опакова</TableCell>
          <TableCell>Магазин</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedPurchases?.map((purchase, index) => (
          <TableRow
            key={index}
            sx={{
              '&:last-child td, &:last-child th': { border: 0 },
              '&:hover': { cursor: 'pointer' },
            }}
            hover
          >
            <TableCell>
              <DateRenderer dateAsIso8601={purchase.date} />
            </TableCell>
            <TableCell align="right">
              <CurrencyRenderer value={purchase.promoPrice} />
            </TableCell>
            <TableCell align="right">
              <CurrencyRenderer value={purchase.price} />
            </TableCell>
            <TableCell>{purchase.quantityInThePackage}</TableCell>
            <TableCell>{purchase.store}</TableCell>
            <TableCell></TableCell>

            <TableCell>
              {/* <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    setProductForDeletion(product);
                  }}
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton> */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
