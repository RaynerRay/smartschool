
import React from "react";
import { Badge } from "../ui/badge";

export default function StatusColumn({
  row,
  accessorKey,
}: {
  row: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  accessorKey: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}) {
  const status = row.getValue(`${accessorKey}`);

  return <Badge variant="outline">{status ? "Active" : "Disabled"}</Badge>;
}
