import { WelcomeBanner } from "@/components/dashboard/welcome-message";
import { getServerSchool, getServerUser } from "@/actions/auth";
import { redirect } from "next/navigation";
import DashboardDetails from "@/components/dashboard/dashboard-details";
import { getAllAnalytics } from "@/actions/analytics";

export default async function Dashboard() {
  const school = await getServerSchool();
  const user = await getServerUser();
  const analytics = await getAllAnalytics(school?.id ?? "");
  if (!user) {
    redirect("/login");
  }
  console.log(analytics);
  return (
    <div className="flex-1 space-y-4 p-8">
      <WelcomeBanner
        userName={user?.name}
        userRole={user.role}
        userSchool={user?.schoolName ?? ""}
      />
      <DashboardDetails analytics={analytics} />
    </div>
  );
}
