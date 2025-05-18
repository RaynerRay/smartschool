import TableHeader from "@/components/dashboard/Tables/TableHeader";
import DataTable from "@/components/DataTableComponents/DataTable";
import React from "react";
import { columns } from "./columns";
import { getFeesForCurrentYear } from "@/actions/school-fees";
import { getServerSchool } from "@/actions/auth";

export default async function page() {
  const school = await getServerSchool();
  const fees = (await getFeesForCurrentYear(school?.id ?? "")) || [];
  return (
    <div className="p-8">
      <TableHeader
        title={`School Fees for year ${new Date().getFullYear()}`}
        linkTitle="Add New School Fee"
        href="/dashboard/finance/fees/new"
        data={fees}
        model="schoolFee"
      />
      <div className="py-8">
        <DataTable data={fees} columns={columns} />
      </div>
    </div>
  );
}
