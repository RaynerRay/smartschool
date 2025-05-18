
import { Categories } from "@/components/frontend/HomePage/Categories";
import { FAQ } from "@/components/frontend/HomePage/FAQ";
import { TestimonialsSection } from "@/components/frontend/HomePage/Testimonials";
import HeroSection from "@/components/frontend/hero-section";
import TabbedFeatures from "@/components/frontend/tabbed-features";
import React from "react";

export default async function Home() {
  // const stats = (await getPublicStats()) || {
  //   students: 0,
  //   teachers: 0,
  //   schools: 0,
  //   parents: 0,
  // };
  // const schools = (await getSchoolNames()) || [];
  // console.log(schools, stats);
  return (
    <main className="">
      <HeroSection />
      <Categories />

      {/* {schools && schools.length > 0 && <SchoolMarquee schools={schools} />} */}

      {/* <LogoCloud /> */}

      {/* {stats && stats.schools && stats.schools > 0 && (
        <StatisticsSection data={stats} />
      )} */}
      
      {/* <DashboardPreview /> */}
      {/* <GridFeatures /> */}
      <TabbedFeatures />
      <FAQ />
      <TestimonialsSection />
      {/* <Pricing /> */}
    </main>
  );
}
