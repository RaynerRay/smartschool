import React from "react";

import { getServerSchool } from "@/actions/auth";
import { getAllClasses } from "@/actions/classes";
import StudentListingByClass from "@/components/dashboard/StudentListingByClass";
export default async function page() {
  const school = await getServerSchool();
  const classes = (await getAllClasses(school?.id ?? "")) || [];

  return <StudentListingByClass classes={classes} />;
}
