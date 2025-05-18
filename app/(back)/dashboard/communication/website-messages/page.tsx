import React from "react";
import SchoolContactMessagesTable from "./messages-table";
import { getSchoolWebsiteMessages } from "@/actions/site";
import { getServerSchool } from "@/actions/auth";

export default async function ContactMessagesPage() {
  const school = await getServerSchool();
  const messages = (await getSchoolWebsiteMessages(school?.id ?? "")) || [];
  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <SchoolContactMessagesTable data={messages} />
    </div>
  );
}
