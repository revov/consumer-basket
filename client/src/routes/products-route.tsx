import { useMemo, useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { DateRenderer } from "../components/date-renderer";
import {
  useDeleteProductMutation,
  useProductsQuery,
} from "../queries/products";
import { ConfirmationDialog } from "../components/confirmation-dialog";
import { ProductListItemDto } from "../../../server/common/products.dto";
import { CurrencyRenderer } from "../components/currency-renderer";
import { QuantityRenderer } from "src/components/quantity-renderer";
import { CategoriesSelector } from "src/components/inputs/categories-selector";

export function ProductsRoute() {
  const { data: products } = useProductsQuery();
  const deleteProductMutation = useDeleteProductMutation();
  const navigate = useNavigate();

  const [productForDeletion, setProductForDeletion] = useState<
    undefined | ProductListItemDto
  >(undefined);

  const [categoriesFilter, setCategoriesFilter] = useState<string[]>([]);

  const filteredProducts = useMemo(() => {
    if (categoriesFilter.length === 0) {
      return products;
    }

    return products?.filter(
      (p) => !!p.categories.find((c) => categoriesFilter.includes(c.id))
    );
  }, [categoriesFilter, products]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Paper
        elevation={0}
        sx={{ p: { xs: 1 }, width: '100%' }}
      >
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ marginBottom: "10px" }}
              onClick={() => navigate("create")}
            >
              Нов продукт
            </Button>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <CategoriesSelector
              value={categoriesFilter}
              onChange={(e) => setCategoriesFilter(e)}
            />
          </Grid>
        </Grid>
      </Paper>

      <TableContainer component={Paper} sx={{ minWidth: 650 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ ".MuiTableCell-root": { fontWeight: "bold" } }}>
              <TableCell>Продукт</TableCell>
              <TableCell align="right">Цена</TableCell>
              <TableCell align="right">Промо цена</TableCell>
              <TableCell>Кол. в опаковка</TableCell>
              <TableCell>Магазин</TableCell>
              <TableCell>Категория</TableCell>
              <TableCell>Дата</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts?.map((product) => (
              <TableRow
                key={product.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { cursor: "pointer" },
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
                <TableCell>
                  <QuantityRenderer
                    quantity={+product.quantityInThePackage}
                    unit={product.unit}
                  />
                </TableCell>
                <TableCell>{product.store}</TableCell>
                <TableCell>
                  {product.categories.map((c) => c.name).join(", ")}
                </TableCell>
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
