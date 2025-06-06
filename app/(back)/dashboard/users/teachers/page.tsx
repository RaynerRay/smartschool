import React from "react";
import { columns } from "./columns";
import DataTable from "@/components/DataTableComponents/DataTable";

import TableHeader from "@/components/dashboard/Tables/TableHeader";
import { getAllTeachers } from "@/actions/teachers";
import { getServerSchool } from "@/actions/auth";

export default async function page() {
  const school = await getServerSchool();
  const teachers = (await getAllTeachers(school?.id ?? "")) || [];
  return (
    <div className="p-8">
      <TableHeader
        title="Teachers"
        linkTitle="Add Teacher"
        href="/dashboard/users/teachers/new"
        data={teachers}
        model="teacher"
      />
      <div className="py-8">
        <DataTable data={teachers} columns={columns} />
      </div>
    </div>
  );
}
