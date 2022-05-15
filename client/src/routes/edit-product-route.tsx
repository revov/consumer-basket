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

export function EditProductRoute() {
  const { productId } = useParams();
  const existingProductQuery = useProductQuery(productId);
  const updateProductMutation = useUpdateProductMutation();

  const navigate = useNavigate();

  const [serverError, setServerError] = useState("");

  const [productName, setProductName] = useState("");
  const [productUnit, setProductUnit] = useState<Unit>("ITEM");
  const [productPurchase, setProductPurchase] = useState<PurchaseFormState>({
    price: null,
    promoPrice: null,
    quantityInThePackage: 1,
    store: "",
    date: startOfToday(),
    description: '',
  });
  const [registerNewPurchase, setRegisterNewPurchase] = useState(false);

  const [purchasesForDeletion, setPurchasesForDeletion] = useState<
    ProductHistoryItem[]
  >([]);

  useEffect(() => {
    setProductName((prev) => existingProductQuery.data?.name ?? prev);
    setProductUnit((prev) => existingProductQuery.data?.unit ?? prev);
  }, [existingProductQuery.data]);

  const handleUpdate = async () => {
    try {
      const history = [
        ...(existingProductQuery.data?.history.filter(
          (existingPurchase) => !purchasesForDeletion.includes(existingPurchase)
        ) ?? []),
      ];

      if (registerNewPurchase) {
        history.push({
          ...productPurchase,
          price: productPurchase.price ?? 0,
          date: formatISO(productPurchase.date ?? startOfToday(), {
            representation: "date",
          }),
        });
      }
      await updateProductMutation.mutateAsync({
        productId: productId!,
        product: {
          name: productName,
          unit: productUnit,
          history: history,
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
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <UnitSelector
                value={productUnit}
                onChange={(unit) => setProductUnit(unit)}
              />
            </Grid>

            <Grid item xs={12}>
              <PurchaseHistoryTable
                history={existingProductQuery.data.history ?? []}
                unit={productUnit}
                purchasesForDeletion={purchasesForDeletion}
                onDelete={(purchaseForDeletion) =>
                  setPurchasesForDeletion((prev) => {
                    const result = prev.filter(
                      (prevPurchase) => prevPurchase !== purchaseForDeletion
                    );

                    if (result.length < prev.length) {
                      return result;
                    } else {
                      return [...prev, purchaseForDeletion];
                    }
                  })
                }
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
                Запази промените
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Paper>
  );
}
