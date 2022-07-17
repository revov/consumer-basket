import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";

import {
  useCategoryQuery,
  useUpdateCategoryMutation,
} from "src/queries/categories";

export function EditCategoryRoute() {
  const { categoryId } = useParams();
  const existingCategoryQuery = useCategoryQuery(categoryId);
  const updateCategorytMutation = useUpdateCategoryMutation();

  const navigate = useNavigate();

  const [serverError, setServerError] = useState("");

  const [categoryFormState, setCategoryFormState] = useState<{
    name: string;
    description: string;
  }>({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (existingCategoryQuery.data) {
      setCategoryFormState({
        name: existingCategoryQuery.data.name,
        description: existingCategoryQuery.data.description ?? "",
      });
    }
  }, [existingCategoryQuery.data]);

  const handleUpdate = async () => {
    try {
      await updateCategorytMutation.mutateAsync({
        categoryId: categoryId!,
        category: {
          name: categoryFormState.name,
          description: categoryFormState.description,
        },
      });

      navigate("/categories");
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
      <h3>Редактиране на категория "{existingCategoryQuery.data?.name}"</h3>

      {existingCategoryQuery.data && (
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
            <Grid item xs={12}>
              <TextField
                label="Име на категорията"
                value={categoryFormState.name}
                onChange={(e) =>
                  setCategoryFormState({
                    ...categoryFormState,
                    name: e.target.value,
                  })
                }
                fullWidth
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Допълнително описание"
                value={categoryFormState.description ?? ""}
                onChange={(e) =>
                  setCategoryFormState({
                    ...categoryFormState,
                    description: e.target.value,
                  })
                }
                fullWidth
                autoComplete="off"
                size="small"
              />
            </Grid>

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
