"use client";

import { BriefSchool } from "@/actions/schools";
import Marquee from "react-fast-marquee";

export default function SchoolMarquee({ schools }: { schools: BriefSchool[] }) {
  // Sample school data - replace with your actual schools

  return (
    <section className="w-full py-24 bg-white overflow-hidden">
      <div className="container px-4 md:px-6 mb-8">
        <h3 className="text-2xl font-bold text-center text-blue-900 mb-2">
          Trusted by {schools.length}+ Leading Educational Institutions
        </h3>
        <p className="text-blue-700 text-center max-w-2xl mx-auto">
          Join hundreds of schools already transforming their management systems
        </p>
      </div>

      <Marquee speed={40} pauseOnHover={true} gradient={false} className="py-4">
        {schools.map((school) => (
          <div
            key={school.id}
            className="mx-4 px-6 py-3 bg-white rounded-full shadow-md border border-blue-200 transition-all duration-300 hover:bg-blue-50 hover:shadow-lg"
          >
            <span className="text-blue-800 font-medium capitalize">
              {school.name.toLowerCase()}
            </span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
