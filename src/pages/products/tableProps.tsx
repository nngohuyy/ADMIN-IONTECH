import { ChipProps } from "@heroui/chip";

import { sample_products } from "@/constants/sample";

type ProductType = (typeof sample_products)[0];

const columns = [
  { name: "SKU", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "PRICE", uid: "netPrice", sortable: true },
  { name: "STOCK", uid: "stock", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "name",
  "netPrice",
  "stock",
  "status",
  "actions",
];

export type { ProductType };
export { columns, statusOptions, statusColorMap, INITIAL_VISIBLE_COLUMNS };
