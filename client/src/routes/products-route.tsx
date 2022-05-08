import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { DateRenderer } from '../components/date-renderer';
import { useProductsQuery } from '../queries/products';

export function ProductsRoute() {
  const { data: products } = useProductsQuery();
  const navigate = useNavigate();

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
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
                <TableCell align="right">{product.price}лв</TableCell>
                <TableCell align="right">{product.promoPrice}лв</TableCell>
                <TableCell>{product.quantityInThePackage}</TableCell>
                <TableCell>{product.store}</TableCell>
                <TableCell>{product.category?.name}</TableCell>
                <TableCell>
                  <DateRenderer dateAsIso8601={product.date} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
