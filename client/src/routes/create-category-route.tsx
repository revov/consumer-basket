import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";

import Paper from "@mui/material/Paper";
import { useCreateCategoryMutation } from "src/queries/categories";

interface CategoryFormState {
  name: string;
  description?: string;
}

export function CreateCategoryRoute() {
  const createCategoryMutation = useCreateCategoryMutation();

  const navigate = useNavigate();

  const [serverError, setServerError] = useState("");

  const [categoryFormState, setCategoryFormState] = useState<CategoryFormState>(
    {
      name: "",
      description: "",
    }
  );

  const handleCreate = async () => {
    try {
      await createCategoryMutation.mutateAsync({
        name: categoryFormState.name,
        description: categoryFormState.description,
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
      <h3>Добавяне на категория</h3>

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

          <Grid item xs={12}>
            <TextField
              label="Име на категорията"
              value={categoryFormState.name ?? ""}
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

          <Grid item xs={12}>
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
