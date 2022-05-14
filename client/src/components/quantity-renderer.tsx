import React from "react";
import { Unit } from "../../../server/common/products.dto";

interface Props {
  quantity: number;
  unit: Unit;
}

export const UNIT_MAPPING: Record<Unit, string> = {
  ITEM: "бр.",
  KG: "кг.",
  G: "г.",
  L: "л.",
  ML: "мл.",
  PAIR: "чифта",
};

export const UNIT_MAPPING_SINGULAR: typeof UNIT_MAPPING = {
  ...UNIT_MAPPING,
  PAIR: "чифт",
};

export const QuantityRenderer = React.memo((props: Props) => {
  return (
    <>
      {props.quantity}{" "}
      {props.quantity === 1
        ? UNIT_MAPPING_SINGULAR[props.unit]
        : UNIT_MAPPING[props.unit]}
    </>
  );
});
