import { useNavigate } from "react-router-dom";
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

import {
  useCategoriesQuery,
  useDeleteCategoryMutation,
} from "src/queries/categories";
import { CategoryDto } from "../../../server/common/categories.dto";
import { ConfirmationDialog } from "src/components/confirmation-dialog";
import { useState } from "react";

export function CategoriesRoute() {
  const { data: categories } = useCategoriesQuery();
  const deleteCategoryMutation = useDeleteCategoryMutation();
  const navigate = useNavigate();

  const [categoryForDeletion, setCategoryForDeletion] = useState<
    undefined | CategoryDto
  >(undefined);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ marginBottom: "10px" }}
        onClick={() => navigate("create")}
      >
        Нова категория
      </Button>
      <TableContainer component={Paper} sx={{ minWidth: 650 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ ".MuiTableCell-root": { fontWeight: "bold" } }}>
              <TableCell>Категория</TableCell>
              <TableCell>Описание</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories?.map((category) => (
              <TableRow
                key={category.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { cursor: "pointer" },
                }}
                hover
                onClick={() => navigate(`edit/${category.id}`)}
              >
                <TableCell>{category.name}</TableCell>

                <TableCell>{category.description}</TableCell>

                <TableCell>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCategoryForDeletion(category);
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
        open={!!categoryForDeletion}
        text={`Сигурни ли сте, че искате да изтриете ${categoryForDeletion?.name}? Това ще премахне категорията от асоциираните продукти.`}
        onCancel={() => setCategoryForDeletion(undefined)}
        onConfirm={async () => {
          await deleteCategoryMutation.mutateAsync(categoryForDeletion!.id);
          setCategoryForDeletion(undefined);
        }}
      />
    </div>
  );
}
