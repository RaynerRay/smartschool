"use client";
import useSchoolStore from "@/store/school";
import { Class, Student, UserRole } from "@/types/types";
import React, { useState } from "react";
import TableHeader from "./Tables/TableHeader";
import DataTable from "../DataTableComponents/DataTable";
import { columns } from "@/app/(back)/dashboard/students/columns";

import { columns as studentColumns } from "@/app/(portals)/portal/teacher/students/columns";
import { columns as secStudentColumns } from "@/app/(portals)/portal/secretary/students/columns";
import { Card, CardContent } from "../ui/card";
import FormSelectInput from "../FormInputs/FormSelectInput";
import { Button } from "../ui/button";
import { getStudentsByClass } from "@/actions/students";
import { Loader2 } from "lucide-react";

export type StudentByClassProps = {
  classId: string;
  streamId: string;
  schoolId: string;
};
export default function StudentListingByClass({
  classes,
  role = "ADMIN",
}: {
  classes: Class[];
  role?: UserRole;
}) {
  const { school } = useSchoolStore();
  const [students, setStudents] = useState<Student[]>([]);
  // Class
  const classOptions = classes.map((item) => {
    return {
      label: item.title,
      value: item.id,
    };
  });
  const [selectedClass, setSelectedClass] = useState<any>(classOptions[0]); // eslint-disable-line @typescript-eslint/no-explicit-any
  const classId = selectedClass.value ?? "";
  const streams = classes.find((item) => item.id === classId)?.streams || [];
  // sections/Streams
  const streamsOptions = streams.map((item) => {
    return {
      label: item.title,
      value: item.id,
    };
  });

  streamsOptions.unshift({
    label: "All Streams",
    value: "all",
  });

  const [selectedStream, setSelectedStream] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [loading, setLoading] = useState(false);
  const displayColumns =
    role === "TEACHER"
      ? studentColumns
      : role === "SECRETARY"
        ? secStudentColumns
        : columns;
  async function getStudentList() {
    setStudents([]);
    setLoading(true);
    try {
      // Fetch logic
      const classId = selectedClass.value as string;
      const streamId = selectedStream.value as string;
      const data: StudentByClassProps = {
        classId,
        streamId,
        schoolId: school?.id ?? "",
      };
      const students = await getStudentsByClass(data);
      setStudents(students);
      setLoading(false);
      console.log(students);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  return (
    <div className="p-8 space-y-6">
      <Card className="border-t-4 border-blue-600 shadow">
        <CardContent className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-3">
            <FormSelectInput
              label="Class"
              options={classOptions}
              option={selectedClass}
              setOption={setSelectedClass}
            />
            <FormSelectInput
              label="Stream/Section"
              options={streamsOptions}
              option={selectedStream}
              setOption={setSelectedStream}
            />
          </div>
          {loading ? (
            <Button disabled>
              <Loader2 className="animate-spin" />
              Fetching Please wait...
            </Button>
          ) : (
            <Button onClick={getStudentList}>Get Student List</Button>
          )}
        </CardContent>
      </Card>
      {students && students.length > 0 && (
        <>
          <TableHeader
            title={`Student List (${selectedClass.label}) - ${selectedStream.label}`}
            linkTitle="Add student"
            href={
              role === "SECRETARY"
                ? "/portal/secretary/students/new"
                : "/dashboard/students/new"
            }
            data={students}
            model="student"
          />
          <div className="py-8">
            <DataTable data={students} columns={displayColumns} />
          </div>
        </>
      )}
    </div>
  );
}
