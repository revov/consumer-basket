import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import startOfToday from "date-fns/startOfToday";
import formatISO from "date-fns/formatISO";

import { useCreateProductMutation } from "../queries/products";
import { ProductPurchaseForm } from "src/components/product-purchase-form";
import Paper from "@mui/material/Paper";
import { Unit } from "../../../server/common/products.dto";
import { UnitSelector } from "src/components/inputs/unit-selector";
import { CategoriesSelector } from "src/components/inputs/categories-selector";

interface ProductFormState {
  name: string;
  price: number | null;
  promoPrice: number | null;
  quantityInThePackage: number;
  unit: Unit;
  categoryIds: string[];
  store: string;
  date: Date;
  description?: string;
}

export function CreateProductRoute() {
  const createProductMutation = useCreateProductMutation();

  const navigate = useNavigate();

  const [serverError, setServerError] = useState("");

  const [productFormState, setProductFormState] = useState<ProductFormState>({
    name: "",
    price: null,
    promoPrice: null,
    quantityInThePackage: 1,
    unit: "ITEM",
    categoryIds: [],
    store: "",
    date: startOfToday(),
    description: "",
  });

  const handleCreate = async () => {
    try {
      await createProductMutation.mutateAsync({
        name: productFormState.name,
        price: productFormState.price ?? 0,
        promoPrice: productFormState.promoPrice || undefined,
        store: productFormState.store,
        quantityInThePackage: productFormState.quantityInThePackage,
        unit: productFormState.unit,
        categoryIds: productFormState.categoryIds,
        date: formatISO(productFormState.date ?? startOfToday(), {
          representation: "date",
        }),
        description: productFormState.description,
      });

      navigate("/products");
    } catch (e) {
      setServerError("Имате невалидно попълнени данни");
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
        <Grid container spacing={3}>
          {!!serverError && (
            <Grid item xs={12}>
              <Alert severity="error">{serverError}</Alert>
            </Grid>
          )}

          <Grid item xs={12} sm={8}>
            <TextField
              label="Име на продукта"
              value={productFormState.name ?? ""}
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
          <Grid item xs={12} sm={4}>
            <UnitSelector
              value={productFormState.unit}
              onChange={(unit) =>
                setProductFormState({
                  ...productFormState,
                  unit,
                })
              }
            />
          </Grid>

          <Grid item xs={12}>
            <CategoriesSelector
              value={productFormState.categoryIds}
              onChange={(e) =>
                setProductFormState({ ...productFormState, categoryIds: e })
              }
            />
          </Grid>

          <Grid item xs={12}>
            <ProductPurchaseForm
              value={productFormState}
              onChange={(value) =>
                setProductFormState((prev) => ({ ...prev, ...value }))
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
            >
              Създай
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
