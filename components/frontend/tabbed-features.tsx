"use client";

import { useState } from "react";
import { BarChart2, DollarSign, GraduationCap, Users, ArrowRight, CheckCircle } from "lucide-react";
import { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ColorScheme = {
  light: string;
  medium: string;
  text: string;
  border: string;
  hover: string;
  iconBg: string;
  gradient: string;
}

type ColorClasses = {
  sky: ColorScheme;
  purple: ColorScheme;
  emerald: ColorScheme;
  amber: ColorScheme;
}

type Feature = {
  icon: LucideIcon;
  tab: string;
  title: string;
  description: string;
  href: string;
  subFeatures: string[];
  image: string;
  color: keyof ColorClasses;
}

const features: Feature[] = [
  {
    icon: Users,
    tab: "Students",
    title: "Student Management",
    description:
      "Comprehensive student information system for managing enrollments, profiles, and academic records with ease",
    href: "/features/student-management",
    subFeatures: [
      "Digital student profiles with complete academic history",
      "Automated enrollment and registration process",
      "Parent portal access with real-time updates",
      "Student performance tracking and analytics",
      "Digital document management for student records",
      "Custom fields for additional student information",
      "Bulk student data import/export capabilities",
      "Student behavior and disciplinary record tracking",
    ],
    image: "/high-school.png",
    color: "sky"
  },
  {
    icon: GraduationCap,
    tab: "Academics",
    title: "Academic Management",
    description:
      "Streamline curriculum planning, examinations, grading, and report card generation in one unified system",
    href: "/features/academic-management",
    subFeatures: [
      "Dynamic curriculum and syllabus management",
      "Automated grade calculation and GPA tracking",
      "Custom report card generation",
      "Assignment and homework management",
      "Online examination system with multiple question types",
      "Academic calendar management",
      "Course and class scheduling",
      "Learning resource distribution",
    ],
    image: "/academics.png",
    color: "purple"
  },
  {
    icon: DollarSign,
    tab: "Finance",
    title: "Financial Management",
    description:
      "Complete fee management system with online payments, invoicing, and comprehensive financial reporting",
    href: "/features/finance",
    subFeatures: [
      "Online fee payment gateway integration",
      "Automated invoice generation",
      "Payment reminder system",
      "Financial reporting and analytics",
      "Salary and payroll management",
      "Expense tracking and budgeting",
      "Scholarship management",
      "Multiple payment method support",
    ],
    image: "/finance.jpg",
    color: "emerald"
  },
  {
    icon: BarChart2,
    tab: "Analytics",
    title: "Analytics & Reports",
    description:
      "Powerful analytics tools for data-driven decisions with customizable reporting and insights",
    href: "/features/analytics",
    subFeatures: [
      "Customizable dashboard with key metrics",
      "Performance trend analysis",
      "Attendance and enrollment statistics",
      "Financial insights and projections",
      "Student progress tracking",
      "Staff performance analytics",
      "Custom report generation",
      "Data export in multiple formats",
    ],
    image: "/analytics.png",
    color: "amber"
  },
];

const colorClasses: ColorClasses = {
  sky: {
    light: "bg-sky-50",
    medium: "bg-sky-100",
    text: "text-sky-600",
    border: "border-sky-200",
    hover: "group-hover:bg-sky-100",
    iconBg: "bg-sky-100",
    gradient: "from-sky-500 to-indigo-600"
  },
  purple: {
    light: "bg-purple-50",
    medium: "bg-purple-100",
    text: "text-purple-600",
    border: "border-purple-200",
    hover: "group-hover:bg-purple-100",
    iconBg: "bg-purple-100",
    gradient: "from-purple-500 to-pink-600"
  },
  emerald: {
    light: "bg-emerald-50",
    medium: "bg-emerald-100",
    text: "text-emerald-600",
    border: "border-emerald-200",
    hover: "group-hover:bg-emerald-100",
    iconBg: "bg-emerald-100",
    gradient: "from-emerald-500 to-teal-600"
  },
  amber: {
    light: "bg-amber-50",
    medium: "bg-amber-100",
    text: "text-amber-600",
    border: "border-amber-200",
    hover: "group-hover:bg-amber-100",
    iconBg: "bg-amber-100",
    gradient: "from-amber-500 to-orange-600"
  }
};

export default function ModernTabbedFeatures() {
  const [hoveredFeatureIndex, setHoveredFeatureIndex] = useState<number | null>(null);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-sky-50 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-50 rounded-full blur-3xl opacity-30"></div>
      
      <div className="container relative mx-auto px-4 py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl text-center mb-12 md:mb-16">
          <span className="inline-flex items-center px-3 py-1.5 text-sm md:text-base font-medium rounded-full bg-sky-50 text-sky-700 mb-4">
            Comprehensive Solution
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 md:mb-6">
            All-in-One School Management Platform
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Streamline your entire school operations with our comprehensive suite of integrated modules designed specifically for modern educational institutions.
          </p>
        </div>

        <Tabs defaultValue={features[0].tab.toLowerCase()} className="space-y-8 md:space-y-12">
          <div className="relative overflow-x-auto pb-4">
            <TabsList className="flex justify-start md:justify-center p-1 bg-gray-100/80 backdrop-blur-md rounded-full max-w-full md:max-w-3xl mx-auto overflow-x-auto scrollbar-hide">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const colors = colorClasses[feature.color];
                return (
                  <TabsTrigger
                    key={feature.tab}
                    value={feature.tab.toLowerCase()}
                    className={`flex flex-shrink-0 items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-full transition-all whitespace-nowrap data-[state=active]:shadow-md data-[state=active]:${colors.light} data-[state=active]:${colors.text}`}
                    onMouseEnter={() => setHoveredFeatureIndex(index)}
                    onMouseLeave={() => setHoveredFeatureIndex(null)}
                  >
                    <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center ${index === hoveredFeatureIndex || "data-[state=active]" ? colors.medium : "bg-transparent"} transition-colors`}>
                      <Icon className={`h-4 w-4 md:h-5 md:w-5 ${colors.text}`} />
                    </div>
                    <span className="text-sm md:text-base">{feature.tab}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          {features.map((feature) => {
            const colors = colorClasses[feature.color];
            
            return (
              <TabsContent
                key={feature.tab}
                value={feature.tab.toLowerCase()}
                className="space-y-8 mt-8"
              >
                <div className="grid gap-8 md:gap-10 lg:grid-cols-2 items-center max-w-7xl mx-auto">
                  <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
                    <div className="space-y-4">
                      <h3 className={`text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-2 ${colors.text}`}>
                        {feature.title}
                      </h3>
                      <p className="text-base md:text-lg lg:text-xl text-gray-600">
                        {feature.description}
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {feature.subFeatures.map((subFeature, index) => (
                        <Card key={index} className={`border ${colors.border} transition-all duration-300 group hover:shadow-md`}>
                          <CardContent className="p-3 md:p-4">
                            <div className="flex items-center gap-3">
                              <div className={`flex h-7 w-7 md:h-8 md:w-8 shrink-0 items-center justify-center rounded-full ${colors.iconBg} ${colors.text} transition-colors`}>
                                <CheckCircle className="h-3.5 w-3.5 md:h-4 md:w-4" />
                              </div>
                              <span className="text-sm md:text-base font-medium">{subFeature}</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="pt-4">
                      <Button 
                        className={`bg-gradient-to-r ${colors.gradient} hover:shadow-lg hover:shadow-${feature.color}-100/50 transition-all duration-300 text-white border-0 text-sm md:text-base py-2.5 px-5 md:py-3 md:px-6`}
                        asChild
                      >
                        <Link href={feature.href} className="group">
                          Learn more about {feature.title}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className="relative order-1 lg:order-2">
                    <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} rounded-2xl blur-sm transform translate-x-2 translate-y-2 opacity-30`}></div>
                    <div className="relative rounded-xl overflow-hidden aspect-video lg:aspect-square shadow-xl">
                      <Image
                        src={feature.image}
                        alt={`${feature.title} illustration`}
                        className="object-cover transition-transform hover:scale-105 duration-700"
                        fill
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent">
                        <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6">
                          <div className={`inline-block px-2 md:px-3 py-1 rounded-full ${colors.light} ${colors.text} text-xs md:text-sm font-medium mb-1 md:mb-2`}>
                            Featured
                          </div>
                          <h4 className="text-lg md:text-xl lg:text-2xl font-bold text-white">{feature.title}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="mt-8 md:mt-12">
                  <h4 className="text-lg md:text-xl lg:text-2xl font-semibold mb-4">Additional Features</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    {feature.subFeatures.slice(4).map((subFeature, index) => (
                      <div key={index + 4} className="flex items-center gap-3 p-3 rounded-lg bg-white border shadow-sm">
                        <div className={`h-6 w-6 rounded-full ${colors.light} flex items-center justify-center`}>
                          <span className={`text-xs font-bold ${colors.text}`}>{index + 5}</span>
                        </div>
                        <span className="text-sm">{subFeature}</span>
                      </div>
                    ))}
                  </div>
                </div> */}
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
}