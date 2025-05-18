import TableHeader from "@/components/dashboard/Tables/TableHeader";
import DataTable from "@/components/DataTableComponents/DataTable";
import React from "react";
import { columns } from "./columns";
import { getServerSchool } from "@/actions/auth";
import { getAllPayments } from "@/actions/payments";

export default async function page() {
  const school = await getServerSchool();
  const payments = (await getAllPayments(school?.id ?? "")) || [];
  return (
    <div className="p-8">
      <TableHeader
        title={`School Fees Payments ${new Date().getFullYear()}`}
        linkTitle="Add New Payment"
        href="/dashboard/finance/fees/new"
        data={payments}
        model="payments"
      />
      <div className="py-8">
        <DataTable data={payments} columns={columns} />
      </div>
    </div>
  );
}
