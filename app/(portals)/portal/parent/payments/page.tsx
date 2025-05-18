import { getServerSchool, getServerUser } from "@/actions/auth";
import { getStudentsByParentId } from "@/actions/parents";
import { getAllPeriods } from "@/actions/periods";
import { getProfileId } from "@/actions/users";
import PaymentListing from "@/components/dashboard/forms/finance/payment-listing";
import React from "react";

export default async function page() {
  const user = await getServerUser();
  if (!user) {
    return;
  }
  // get parent profile
  const profileId = await getProfileId(user?.id, user?.role);
  const students = (await getStudentsByParentId(profileId ?? "")) || [];
  const school = await getServerSchool();
  const terms = (await getAllPeriods(school?.id ?? "")) || [];
  const currentYear = new Date().getFullYear();
  const parentData = {
    parentProfileId: profileId ?? "",
    parentUserId: user.id ?? "",
    parentName: user.name ?? "",
  };
  return (
    <div className="">
      <PaymentListing
        terms={terms.filter((item) => item.year === currentYear)}
        students={students}
        parentData={parentData}
      />
    </div>
  );
}
