import { getServerSchool } from "@/actions/auth";
import { getSectionByType } from "@/actions/site";
import CustomizePageHeader from "@/components/school/CustomizePageHeader";
import AboutSectionForm from "@/components/school/section-forms/about-form";
import { SectionType } from "@/lib/sectionTypes";
import React from "react";

export default async function page() {
  const school = await getServerSchool();
  const section = await getSectionByType(school?.id, SectionType.ABOUT);
  return (
    <main className="min-h-screen bg-background ">
      <CustomizePageHeader
        subtitle="Customize your school website's about section"
        title="About Section Customization"
        sectionId={section?.id}
        isComplete={section?.isComplete}
      />
      {section && section.id ? (
        <AboutSectionForm section={section} />
      ) : (
        <div className="">
          <p>No Section Found</p>
        </div>
      )}
    </main>
  );
}
