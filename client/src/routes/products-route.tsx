import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { DateRenderer } from '../components/date-renderer';
import {
  useDeleteProductMutation,
  useProductsQuery,
} from '../queries/products';
import { ConfirmationDialog } from '../components/confirmation-dialog';
import { useState } from 'react';
import { ProductListItemDto } from '../../../dto/products.dto';
import { CurrencyRenderer } from '../components/currency-renderer';

export function ProductsRoute() {
  const { data: products } = useProductsQuery();
  const deleteProductMutation = useDeleteProductMutation();
  const navigate = useNavigate();

  const [productForDeletion, setProductForDeletion] = useState<
    undefined | ProductListItemDto
  >(undefined);

  const formatter = new Intl.NumberFormat('bg-BG', {
    style: 'currency',
    currency: 'BGN',
  });

  return (
    <div>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ marginBottom: '10px' }}
        onClick={() => navigate('create')}
      >
        Нов продукт
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, maxHeight: 800 }} stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Продукт</TableCell>
              <TableCell align="right">Цена</TableCell>
              <TableCell align="right">Промо цена</TableCell>
              <TableCell>Кол. в опакова</TableCell>
              <TableCell>Магазин</TableCell>
              <TableCell>Категория</TableCell>
              <TableCell>Дата</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((product) => (
              <TableRow
                key={product.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { cursor: 'pointer' },
                }}
                hover
                onClick={() => navigate(`edit/${product.id}`)}
              >
                <TableCell>{product.name}</TableCell>
                <TableCell align="right">
                  <CurrencyRenderer value={product.price} />
                </TableCell>
                <TableCell align="right">
                  <CurrencyRenderer value={product.promoPrice} />
                </TableCell>
                <TableCell>{product.quantityInThePackage}</TableCell>
                <TableCell>{product.store}</TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <DateRenderer dateAsIso8601={product.date} />
                </TableCell>

                <TableCell>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      setProductForDeletion(product);
                    }}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ConfirmationDialog
        open={!!productForDeletion}
        text={`Сигурни ли сте, че искате да изтриете ${productForDeletion?.name} и цялата му история?`}
        onCancel={() => setProductForDeletion(undefined)}
        onConfirm={async () => {
          await deleteProductMutation.mutateAsync(productForDeletion!.id);
          setProductForDeletion(undefined);
        }}
      />
    </div>
  );
}
