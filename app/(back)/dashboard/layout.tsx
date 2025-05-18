import { getServerUser } from "@/actions/auth";
import { getSchoolNotifications } from "@/actions/site";
import AppSidebar from "@/components/dashboard/sidebar/app-sidebar";
import SidebarHeader from "@/components/dashboard/sidebar/sidebar-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getServerUser();

  if (!user) {
    redirect("/login");
  }
  if (user.role !== "ADMIN") {
    redirect("/login");
  }
  const notifications =
    (await getSchoolNotifications(user.schoolId ?? "")) || [];
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {/* Sidebar header */}
          <SidebarHeader notifications={notifications} />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
