import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import { useCategoriesQuery } from "src/queries/categories";
import { useCallback } from "react";

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
}

export function CategoriesSelector(props: Props) {
  const { data: categories } = useCategoriesQuery();

  const renderValue = useCallback((selectedCategoryIds: string[]) => {
    return selectedCategoryIds
      .map(
        (selectedCategoryId) =>
          categories?.find((c) => c.id === selectedCategoryId)?.name
      )
      .join(", ");
  }, [categories]);

  return (
    <FormControl fullWidth>
      <InputLabel id='categories-selector-label'>Категории</InputLabel>
      <Select
        labelId="categories-selector-label"
        multiple
        value={props.value}
        onChange={(e) => props.onChange([...e.target.value])}
        input={<OutlinedInput label="Категории" />}
        renderValue={renderValue}
      >
        {categories?.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            <Checkbox checked={props.value.indexOf(category.id) > -1} />
            <ListItemText primary={category.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
