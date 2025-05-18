import StudentDetailPage from "@/components/portal/parents/student/StudentDetailPage";
import React from "react";

export default async function page({
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="">
      <StudentDetailPage />
    </div>
  );
}
