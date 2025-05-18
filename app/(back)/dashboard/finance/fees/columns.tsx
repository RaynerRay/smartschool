"use client";

import { ColumnDef } from "@tanstack/react-table";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";

import { SchoolFeeDTO } from "@/actions/school-fees";
export const columns: ColumnDef<SchoolFeeDTO>[] = [
  {
    accessorKey: "title",
    header: "Fee Title",
    cell: ({ row }) => {
      const fee = row.original;
      return <h2 className="font-medium capitalize">{fee.title}</h2>;
    },
  },
  {
    accessorKey: "fees",
    header: "Fee Total Amount",
    cell: ({ row }) => {
      const fee = row.original;
      return <h2 className="font-medium capitalize">{fee.fees}</h2>;
    },
  },
  {
    accessorKey: "term",
    header: "Term",
    cell: ({ row }) => {
      const fee = row.original;
      return <h2 className="font-medium capitalize">{fee.term}</h2>;
    },
  },
  {
    accessorKey: "className",
    header: "Class",
    cell: ({ row }) => {
      const fee = row.original;
      return <h2 className="font-medium capitalize">{fee.className}</h2>;
    },
  },
  {
    accessorKey: "year",
    header: "Year",
    cell: ({ row }) => {
      const fee = row.original;
      return <h2 className="font-medium capitalize">{fee.year}</h2>;
    },
  },
  // {
  //   accessorKey: "createdAt",
  //   header: "Date Created",
  //   cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      const contact = row.original;
      return (
        <ActionColumn
          row={row}
          model="contact"
          editEndpoint={`#`}
          id={contact.id}
        />
      );
    },
  },
];
