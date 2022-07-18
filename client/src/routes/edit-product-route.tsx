import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import formatISO from "date-fns/formatISO";

import { useProductQuery, useUpdateProductMutation } from "../queries/products";
import { PurchaseHistoryTable } from "../components/purchase-history-table";
import startOfToday from "date-fns/startOfToday";
import {
  ProductPurchaseForm,
  PurchaseFormState,
} from "../components/product-purchase-form";
import { ProductHistoryItem, Unit } from "../../../server/common/products.dto";
import { UnitSelector } from "src/components/inputs/unit-selector";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import produce from "immer";
import { CategoriesSelector } from "src/components/inputs/categories-selector";

export function EditProductRoute() {
  const { productId } = useParams();
  const existingProductQuery = useProductQuery(productId);
  const updateProductMutation = useUpdateProductMutation();

  const navigate = useNavigate();

  const [serverError, setServerError] = useState("");

  const [productFormState, setProductFormState] = useState<{
    name: string;
    unit: Unit;
    categoryIds: string[];
    history: ProductHistoryItem[];
  }>({
    name: "",
    unit: "ITEM",
    categoryIds: [],
    history: [],
  });

  const [productPurchaseToEditIndex, setProductPurchaseToEditIndex] =
    useState(-1);
  const [productPurchaseToEdit, setProductPurchaseToEdit] =
    useState<PurchaseFormState | null>(null);

  const [registerNewPurchase, setRegisterNewPurchase] = useState(false);
  const [newProductPurchase, setNewProductPurchase] =
    useState<PurchaseFormState>({
      price: null,
      promoPrice: null,
      quantityInThePackage: 1,
      store: "",
      date: startOfToday(),
      description: "",
    });

  useEffect(() => {
    if (existingProductQuery.data) {
      setProductFormState({
        name: existingProductQuery.data.name,
        unit: existingProductQuery.data.unit,
        categoryIds: existingProductQuery.data.categoryIds,
        history: existingProductQuery.data.history,
      });
    }
  }, [existingProductQuery.data]);

  const handleUpdate = async () => {
    try {
      await updateProductMutation.mutateAsync({
        productId: productId!,
        product: {
          name: productFormState.name,
          unit: productFormState.unit,
          categoryIds: productFormState.categoryIds,
          history: registerNewPurchase
            ? [
                ...productFormState.history,
                {
                  ...newProductPurchase,
                  price: newProductPurchase.price ?? 0,
                  date: formatISO(newProductPurchase.date ?? startOfToday(), {
                    representation: "date",
                  }),
                },
              ]
            : productFormState.history,
        },
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
      <h3>Редактиране на продукт "{existingProductQuery.data?.name}"</h3>

      {existingProductQuery.data && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            handleUpdate();
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
                value={productFormState.name}
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
              <PurchaseHistoryTable
                history={productFormState.history}
                unit={productFormState.unit}
                onRowClick={(clickedPurchase) => {
                  setProductPurchaseToEditIndex(
                    productFormState.history.findIndex(
                      (p) => p === clickedPurchase
                    )
                  );
                  setProductPurchaseToEdit({
                    ...clickedPurchase,
                    date: new Date(clickedPurchase.date),
                  });
                }}
                onDelete={(purchaseForDeletion) => {
                  const history = productFormState.history.filter(
                    (existingPurchase) =>
                      existingPurchase !== purchaseForDeletion
                  );

                  setProductFormState({ ...productFormState, history });
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                label={"Регистриране на нова покупка"}
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
                  value={newProductPurchase}
                  onChange={setNewProductPurchase}
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
                Запази промените
              </Button>
            </Grid>
          </Grid>
        </form>
      )}

      <Dialog
        open={!!productPurchaseToEdit}
        maxWidth="lg"
        transitionDuration={0}
      >
        <DialogTitle>Редактиране на покупка</DialogTitle>
        <DialogContent sx={{ overflow: "visible" }}>
          {productPurchaseToEdit && (
            <ProductPurchaseForm
              value={productPurchaseToEdit}
              onChange={setProductPurchaseToEdit}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProductPurchaseToEdit(null)}>Отказ</Button>
          <Button
            onClick={() => {
              const updatedHistory = produce(
                productFormState.history,
                (draft) => {
                  draft[productPurchaseToEditIndex] = {
                    ...productPurchaseToEdit!,
                    price: productPurchaseToEdit!.price ?? 0,
                    date: formatISO(
                      productPurchaseToEdit!.date ?? startOfToday(),
                      {
                        representation: "date",
                      }
                    ),
                  };
                }
              );
              setProductFormState({
                ...productFormState,
                history: updatedHistory,
              });
              setProductPurchaseToEdit(null);
            }}
            autoFocus
          >
            Ок
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
