import { Card, CardContent } from "@/components/ui/card";
import StaffForm from "@/components/dashboard/forms/users/staff-form";

export default function AdmissionTabs() {
  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <Card className="border-t-4 border-blue-600 shadow">
        <CardContent className="p-6">
          <StaffForm />
        </CardContent>
      </Card>
    </div>
  );
}
