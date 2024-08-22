import { Primitive } from "react-data-table-component/dist/src/DataTable/types";

export type ColumnsTable = {
  name: string;
  selector: (row: string, rowIndex?: number) => Primitive;
};
