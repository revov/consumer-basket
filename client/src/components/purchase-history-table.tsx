import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import orderBy from "lodash/orderBy";
import { useMemo } from "react";
import { ProductHistoryItem, Unit } from "../../../server/common/products.dto";
import { CurrencyRenderer } from "./currency-renderer";
import { DateRenderer } from "./date-renderer";
import { QuantityRenderer, UNIT_MAPPING_SINGULAR } from "./quantity-renderer";

interface Props {
  history: ProductHistoryItem[];
  unit: Unit;
  purchasesForDeletion?: ProductHistoryItem[];
  onRowClick?: (purchase: ProductHistoryItem) => void;
  onDelete: (purchase: ProductHistoryItem) => void;
}

export function PurchaseHistoryTable(props: Props) {
  const sortedPurchases = useMemo(
    () => orderBy(props.history, "date" as keyof ProductHistoryItem, "desc"),
    [props.history]
  );

  return (
    <Table sx={{ minWidth: 650, maxHeight: 400 }} stickyHeader size="small">
      <TableHead>
        <TableRow>
          <TableCell>Дата</TableCell>
          <TableCell align="right">Цена</TableCell>
          <TableCell align="right">Промо цена</TableCell>
          <TableCell>Кол. в опаковка</TableCell>
          <TableCell align="right">Ед. цена</TableCell>
          <TableCell>Магазин</TableCell>
          <TableCell width={200}>Описание</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedPurchases?.map((purchase, index) => {
          const isMarkedForDeletion =
            props.purchasesForDeletion?.includes(purchase) ?? false;

          return (
            <TableRow
              key={index}
              sx={[
                {
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { cursor: "pointer" },
                },
                isMarkedForDeletion && {
                  textDecoration: "line-through",
                },
              ]}
              hover
              onClick={() => props.onRowClick?.(purchase)}
            >
              <TableCell>
                <DateRenderer dateAsIso8601={purchase.date} />
              </TableCell>
              <TableCell align="right">
                <CurrencyRenderer value={purchase.price} />
              </TableCell>
              <TableCell align="right">
                <CurrencyRenderer value={purchase.promoPrice} />
              </TableCell>
              <TableCell>
                <QuantityRenderer
                  quantity={purchase.quantityInThePackage}
                  unit={props.unit}
                />
              </TableCell>
              <TableCell align="right">
                <CurrencyRenderer
                  value={
                    (purchase.promoPrice ?? purchase.price) /
                    purchase.quantityInThePackage
                  }
                />{" "}
                за {UNIT_MAPPING_SINGULAR[props.unit]}
              </TableCell>
              <TableCell>{purchase.store}</TableCell>
              <TableCell>{purchase.description}</TableCell>
              <TableCell></TableCell>

              <TableCell>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    props.onDelete(purchase);
                  }}
                >
                  {!isMarkedForDeletion && <DeleteIcon fontSize="inherit" />}
                  {isMarkedForDeletion && (
                    <RestoreFromTrashIcon fontSize="inherit" />
                  )}
                </IconButton>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
