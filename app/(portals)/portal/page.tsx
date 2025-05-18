import React from "react";
import { getServerUser } from "@/actions/auth";
import { WelcomeBanner } from "@/components/dashboard/welcome-message";
import { redirect } from "next/navigation";
import TeacherAnalytics from "@/components/portal/TeacherAnalytics";
import { getTeacherAnalytics } from "@/actions/analytics";

export default async function Portal() {
  const user = await getServerUser();
  if (!user) {
    redirect("/login");
  }
  const schoolId = user?.schoolId ?? "";
  const data = await getTeacherAnalytics(schoolId);
  return (
    <div className="px-8 py-4">
      <WelcomeBanner
        userName={user?.name}
        userRole={user.role}
        userSchool={user?.schoolName ?? ""}
      />
      <TeacherAnalytics data={data} />
    </div>
  );
}
