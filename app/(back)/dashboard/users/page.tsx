import React from "react";
import { columns } from "./columns";
import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "@/components/dashboard/Tables/TableHeader";
import { getServerSchool } from "@/actions/auth";
import { getStaffMembers } from "@/actions/users";

export default async function page() {
  const school = await getServerSchool();
  const staffMembers = (await getStaffMembers(school?.id ?? "")) || [];
  return (
    <div className="p-8">
      <TableHeader
        title="Staff Members"
        linkTitle="Add New Staff"
        href="/dashboard/users/new"
        data={staffMembers}
        model="staff"
      />
      <div className="py-8">
        <DataTable data={staffMembers} columns={columns} />
      </div>
    </div>
  );
}
