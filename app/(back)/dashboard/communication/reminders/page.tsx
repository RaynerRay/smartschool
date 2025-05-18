import { getServerSchool } from "@/actions/auth";
import { getMessageGroups } from "@/actions/communications";
// import { getAllParents } from "@/actions/parents";
import SendMailForm from "@/components/emails/SendMailForm";

export default async function AdminMessagePage() {
  const school = await getServerSchool();
  // const parents = (await getAllParents(school?.id ?? "")) || [];
  const groups = await getMessageGroups(school?.id ?? "");

  return (
    <div className="container mx-auto p-10">
      <SendMailForm groupsData={groups} />
      {/* <h1 className="text-3xl font-bold mb-6">Admin Messaging Center</h1>
      <MessageComposer parents={parents} /> */}
    </div>
  );
}
