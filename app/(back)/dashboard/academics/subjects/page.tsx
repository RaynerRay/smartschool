import { getServerSchool } from "@/actions/auth";
import { getBriefDepartments } from "@/actions/communications";
import { getAllSubjects } from "@/actions/subjects";
import SubjectListing from "@/components/dashboard/academics/SubjectListing";
import React from "react";

export default async function page() {
  const school = await getServerSchool();
  // console.log(school);
  const subjects = (await getAllSubjects(school?.id ?? "")) || [];
  const departments = (await getBriefDepartments(school?.id ?? "")) || [];
  return (
    <div className="p-8">
      <SubjectListing subjects={subjects} departments={departments} />
    </div>
  );
}
