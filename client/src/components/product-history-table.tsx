import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { ProductHistoryItem } from '../../../dto/products.dto';
import { CurrencyRenderer } from './currency-renderer';
import { DateRenderer } from './date-renderer';

interface Props {
  history: ProductHistoryItem[];
}

export function ProductHistoryTable(props: Props) {
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
        {props.history?.map((historyItem, index) => (
          <TableRow
            key={index}
            sx={{
              '&:last-child td, &:last-child th': { border: 0 },
              '&:hover': { cursor: 'pointer' },
            }}
            hover
          >
            <TableCell>
              <DateRenderer dateAsIso8601={historyItem.date} />
            </TableCell>
            <TableCell align="right">
              <CurrencyRenderer value={historyItem.promoPrice} />
            </TableCell>
            <TableCell align="right">
              <CurrencyRenderer value={historyItem.price} />
            </TableCell>
            <TableCell>{historyItem.quantityInThePackage}</TableCell>
            <TableCell>{historyItem.store}</TableCell>
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
