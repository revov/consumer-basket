import { Unit } from "../../../../server/common/products.dto";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { UNIT_MAPPING_SINGULAR } from "src/components/quantity-renderer";

interface Props {
  value: Unit;
  onChange: (value: Unit) => void;
}

export function UnitSelector(props: Props) {
  return (
    <FormControl fullWidth>
      <InputLabel>Мерна единица</InputLabel>
      <Select
        value={props.value}
        label="Мерна единица"
        onChange={(e) => props.onChange(e.target.value as Unit)}
      >
        <MenuItem key={"ITEM" as Unit} value={"ITEM" as Unit}>
          {UNIT_MAPPING_SINGULAR.ITEM}
        </MenuItem>
        <MenuItem key={"KG" as Unit} value={"KG" as Unit}>
          {UNIT_MAPPING_SINGULAR.KG}
        </MenuItem>
        <MenuItem key={"G" as Unit} value={"G" as Unit}>
          {UNIT_MAPPING_SINGULAR.G}
        </MenuItem>
        <MenuItem key={"L" as Unit} value={"L" as Unit}>
          {UNIT_MAPPING_SINGULAR.L}
        </MenuItem>
        <MenuItem key={"ML" as Unit} value={"ML" as Unit}>
          {UNIT_MAPPING_SINGULAR.ML}
        </MenuItem>
        <MenuItem key={"PAIR" as Unit} value={"PAIR" as Unit}>
          {UNIT_MAPPING_SINGULAR.PAIR}
        </MenuItem>
      </Select>
    </FormControl>
  );
}
