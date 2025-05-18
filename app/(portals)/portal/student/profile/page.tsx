import { getServerSchool, getServerUser } from "@/actions/auth";
import { getAllPeriods } from "@/actions/periods";
import {  getStudentByUserId } from "@/actions/students";
import StudentDetailPage from "@/components/dashboard/StudentDetailPage";
import { notFound } from "next/navigation";
import React from "react";

export default async function page() {
  const user = await getServerUser();
  if (!user) {
    return notFound();
  }
  const student = await getStudentByUserId(user.id);
  if (!student) {
    return notFound();
  }
  const school = await getServerSchool();
  const terms = (await getAllPeriods(school?.id ?? "")) || [];
  const currentYear = new Date().getFullYear();
  return (
    <div>
      <StudentDetailPage
        terms={terms.filter((item) => item.year === currentYear)}
        student={student}
      />
    </div>
  );
}
