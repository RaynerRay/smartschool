"use server";

import { api } from "./schools";
import axios from "axios";
import {
  Department,
  DepartmentBrief,
  EventData,
  Exam,
  GalleryCategory,
  GalleryImageCreateDTO,
  GalleryImageDTO,
  GroupedPeriods,
  News,
  Period,
  PeriodCreateProps,
  RecentActivity,
  Section,
} from "@/types/types";
import { revalidatePath } from "next/cache";
import { NewsItem } from "@/components/school/section-forms/news-section-form";
import { Event } from "@/components/school/section-forms/events-section-form";
import { ContactData } from "@/components/school/SchoolContactForm";
import { SchoolContactMessage } from "@/app/(back)/dashboard/communication/website-messages/messages-table";
export interface Activity {
  activity: string;
  description: string;
  time: string;
  schoolId: string;
}
export interface GalleryCategoryCreateDTO {
  schoolId: string;
  name: string;
}
export async function createSchoolWebsite(
  schoolId: string,
  siteEnabled: boolean
) {
  const sections = [
    {
      schoolId: schoolId,
      type: "LOGO_NAVIGATION",
      title: "School Header",
      subtitle: null,
      isActive: true,
      order: 1,
      isComplete: false,
      settings: {
        logoText: "ABC Matric High School",
        logoImage: "/school/logo.jpg",
        navLinks: [
          {
            id: "nav-1",
            text: "About Us",
            url: "#about",
            order: 1,
          },
          {
            id: "nav-2",
            text: "Admissions",
            url: "#admissions",
            order: 2,
          },
          {
            id: "nav-3",
            text: "Gallery",
            url: "#gallery",
            order: 3,
          },
          {
            id: "nav-4",
            text: "News and Updates",
            url: "#news",
            order: 4,
          },
          {
            id: "nav-5",
            text: "Events",
            url: "#events",
            order: 5,
          },

          {
            id: "nav-6",
            text: "Contact Us",
            url: "#contact",
            order: 6,
          },
        ],
      },
    },
    {
      schoolId,
      type: "HERO",
      title: "Welcome to ABC School",
      subtitle: "Excellence in Education",
      isActive: true,
      isComplete: false,
      order: 2,
      settings: {
        backgroundColor: "#10B981",
        title: "ABC School debuts for arts, discovery, and connections.",
        description:
          "The ABC School is rooted in the belief that every student should be challenged, engaged, and supported in a learning environment that places no limits on what they can achieve.",
        image: "/school/hero.jpg",
        ctaText: "Learn more",
        ctaLink: "#about",
      },
    },
    {
      schoolId,
      type: "ABOUT",
      title: "About Our School",
      subtitle: null,
      isActive: true,
      isComplete: true,
      order: 3,
      settings: {
        title: "About Our School",
        paragraph1:
          "ABC Institution offers courses of study that are on the frontiers of knowledge and it connects the spiritual and practical dimensions of intellectual life.",
        paragraph2:
          "School for Advanced Studies is committed to a comprehensive academic and cultural program which prompts its community to become ethical, global consciousness.",
        image: "/school/school.avif",
        stats: [
          {
            id: "stat-1",
            value: "2100+",
            label: "Students",
          },
          {
            id: "stat-2",
            value: "95%",
            label: "Sports",
          },
          {
            id: "stat-3",
            value: "235+",
            label: "Staffs",
          },
          {
            id: "stat-4",
            value: "100%",
            label: "Discipline",
          },
        ],
      },
    },
    {
      schoolId,
      type: "HEADMASTER_QUOTE",
      title: "From Our Headmaster",
      subtitle: null,
      isComplete: false,
      isActive: true,
      order: 4,
      settings: {
        quoteTitle: "Build your legacy without changing your style.",
        quoteText:
          "Create digital products and impact the lives of many, without compromising who you are, your principles or values.",
        headmasterName: "Dr. John Smith",
        headmasterTitle: "Headmaster, ABC Matric High School",
        backgroundColor: "#FFCC00",
        mainImage: "/school/head.avif",
        smallImage: "/school/head.avif",
      },
    },
    {
      schoolId,
      type: "ADMISSION",
      title: "Admissions",
      subtitle: "Join our school community",
      isActive: true,
      isComplete: false,
      order: 5,
      settings: {
        title: "Apply for Admission",
        subtitle: "Fall 2024 applications are now open",
        description:
          "We don't just give students an education and experiences that set them up for success in a career. We help them succeed in their career and in life. We help them lead a life of purpose.",
        backgroundColor: "#10B981",
        buttonText: "Apply Now",
        buttonLink: "#admission",
        studentImage: "/school/hero2.jpg",
        linkType: "internal",
      },
      createdAt: new Date("2023-11-15T10:50:00Z"),
      updatedAt: new Date("2023-11-15T10:50:00Z"),
    },
    {
      schoolId,
      type: "NEWS",
      title: "School News & Updates",
      subtitle: "Stay informed about our latest activities",
      isActive: true,
      order: 6,
      settings: {
        sectionTitle: "School News & Updates",
        viewAllText: "View all news",
        viewAllLink: "#",
        displayCount: 3,
        layout: "grid",
        showDate: true,
        showAuthor: true,
        showExcerpt: true,
        excerptLength: 150,
        buttonText: "Read more",
      },
    },
    {
      schoolId,
      type: "EVENTS",
      title: "Upcoming Events",
      subtitle: "Join us for these exciting events",
      isActive: true,
      order: 7,
      settings: {
        sectionTitle: "Upcoming Events",
        viewAllText: "View all events",
        viewAllLink: "/events",
        displayCount: 3,
        layout: "card",
        showDate: true,
        showTime: true,
        showLocation: true,
        dateFormat: "calendar", // "calendar" for the day/month display in a box
        buttonText: "Read more",
      },
    },
    {
      schoolId,
      type: "GALLERY",
      title: "School Memories",
      subtitle:
        "Explore our school's activities and events throughout the year",
      isActive: true,
      order: 8,
      settings: {
        sectionTitle: "School Memories",
        description:
          "Explore our school's activities and events throughout the year",
        displayCount: 6,
        layout: "grid",
        enableFiltering: true,
        defaultCategory: "All",
        showImageTitles: true,
        enableLightbox: true,
      },
    },
    {
      schoolId,
      type: "CONTACT",
      title: "Get In Touch",
      subtitle: "We'd love to hear from you",
      isActive: true,
      order: 9,
      settings: {
        title: "Get In Touch",
        description:
          "We offer extensive educational programs to outbound and inbound students and we are very proud of our successful student achievement track record.",
        locationInfo: {
          title: "Our Location",
          address: "P.O.Box 430337, Bristol, WA 98765-4321",
          note: "Visit us for a consultation",
        },
        emailInfo: {
          title: "Email Us",
          email: "info@abcschool.edu",
          note: "We'll respond as soon as possible",
        },
        phoneInfo: {
          title: "Call Us",
          phone: "+1 (123) 456-7890",
          note: "Mon-Fri from 8am to 5pm",
        },
        hoursInfo: {
          title: "Working Hours",
          hours: "8:00 AM - 5:00 PM, Monday-Friday",
          note: "Closed on weekends and holidays",
        },
        formSettings: {
          nameLabel: "Full Name",
          namePlaceholder: "John Doe",
          phoneLabel: "Phone Number",
          phonePlaceholder: "+1 (123) 456-7890",
          emailLabel: "Email Address",
          emailPlaceholder: "john@example.com",
          subjectLabel: "Subject",
          subjectPlaceholder: "How can we help?",
          messageLabel: "Message",
          messagePlaceholder: "Your message here...",
          buttonText: "Send Message",
          buttonColor: "#10B981",
        },
      },
    },
    {
      schoolId,
      type: "FOOTER",
      title: "Footer",
      subtitle: null,
      isActive: true,
      order: 10,
      settings: {
        logo: "/school/logo.jpg",
        address: {
          line1: "Box 34590",
          line2: "2nd Floor, Plaza 2",
          line3: "Bristol, WA 98765-4321",
          line4: "Brooklyn",
        },
        phone: "+123-4567890",
        email: "abc@school.com",
        aboutLinks: [
          { id: 1, label: "Overview", url: "/about" },
          { id: 2, label: "Admissions", url: "/admissions" },
          { id: 3, label: "Academics", url: "/academics" },
          { id: 4, label: "Infrastructure", url: "/infrastructure" },
          { id: 5, label: "Gallery", url: "/gallery" },
          { id: 6, label: "News", url: "/news" },
        ],
        adminLinks: [
          { id: 1, label: "Admin Login", url: "/login" },
          { id: 2, label: "Teachers Login", url: "/login" },
          { id: 3, label: "Student Login", url: "/login" },
          { id: 4, label: "Parent Login", url: "/login" },
        ],
        socialMedia: [
          {
            id: 1,
            platform: "Facebook",
            url: "https://facebook.com",
            enabled: true,
          },
          {
            id: 2,
            platform: "Twitter",
            url: "https://twitter.com",
            enabled: true,
          },
          {
            id: 3,
            platform: "YouTube",
            url: "https://youtube.com",
            enabled: true,
          },
          {
            id: 4,
            platform: "Instagram",
            url: "https://instagram.com",
            enabled: true,
          },
        ],
        copyright:
          "Copyright © 2024 ABC Matric High School. All Rights Reserved.",
        termsUrl: "/terms",
        privacyUrl: "/privacy",
      },
    },
  ];
  try {
    // Enable the site on the school
    // Create all the sections for that school with dummy data
    const data = {
      schoolId,
      siteEnabled,
      sections,
    };
    const response = await api.post("/site", data);
    revalidatePath(`/sch/${schoolId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Type-safe error handling
      const message = error.response?.data?.message || "Failed to create exams";
      throw new Error(message);
    }
    throw error;
  }
}
export async function createActivity(data: Activity) {
  try {
    const response = await api.post("/site-activity", data);
    revalidatePath(`/sch/${data.schoolId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Type-safe error handling
      const message = error.response?.data?.message || "Failed to create exams";
      throw new Error(message);
    }
    throw error;
  }
}
export async function createGalleryCategory(data: GalleryCategoryCreateDTO) {
  try {
    const response = await api.post("/site-gallery-categories", data);
    revalidatePath(`/sch/${data.schoolId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Type-safe error handling
      const message =
        error.response?.data?.message || "Failed to create category";
      throw new Error(message);
    }
    throw error;
  }
}
export async function addNewsItem(data: NewsItem) {
  try {
    const response = await api.post("/site-news", data);
    revalidatePath(`/sch/${data.schoolId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Type-safe error handling
      const message = error.response?.data?.message || "Failed to create news";
      throw new Error(message);
    }
    throw error;
  }
}
export async function addEventItem(data: Event) {
  try {
    const response = await api.post("/site-events", data);
    revalidatePath(`/sch/${data.schoolId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Type-safe error handling
      const message =
        error.response?.data?.message || "Failed to create events";
      throw new Error(message);
    }
    throw error;
  }
}
export async function updateSection(id: string, data: any, schoolId?: string) {
  try {
    const response = await api.patch(
      `/site-section/${id}?schoolId=${schoolId}`,
      data
    );
    const section = response.data.data;
    // console.log(school);
    return section as Section;
  } catch (error) {
    console.log(error);
  }
}

export async function getSiteRecentActivities(schoolId: string) {
  try {
    const response = await api.get(`/site/${schoolId}`);
    const activities = response.data.data;
    return activities as RecentActivity[];
  } catch (error) {
    console.log(error);
  }
}
export async function getSiteGalleryCategories(schoolId: string) {
  try {
    const response = await api.get(`/site-gallery-categories/${schoolId}`);
    const cats = response.data.data;
    return cats as GalleryCategory[];
  } catch (error) {
    console.log(error);
  }
}
export async function getSiteRecentNews(schoolId: string) {
  try {
    const response = await api.get(`/site-news/${schoolId}`);
    const news = response.data.data;
    return news as News[];
  } catch (error) {
    console.log(error);
  }
}
export async function getSiteRecentEvents(schoolId: string) {
  try {
    const response = await api.get(`/site-events/${schoolId}`);
    const events = response.data.data;
    return events as EventData[];
  } catch (error) {
    console.log(error);
  }
}
export async function getSectionByType(
  schoolId: string | null | undefined,
  type: string
) {
  if (schoolId) {
    try {
      const response = await api.get(`/site-section/${schoolId}?type=${type}`);
      const section = response.data.data;
      // console.log(school);
      return section as Section;
    } catch (error) {
      console.log(error);
    }
  } else {
    return null;
  }
}

export async function getAllSchoolSections(schoolId: string) {
  try {
    const response = await api.get(`/site-sections/${schoolId}`);
    const sections = response.data.data;
    return sections as Section[];
  } catch (error) {
    console.log(error);
  }
}
export async function createGalleryImage(data: GalleryImageCreateDTO) {
  try {
    const response = await api.post("/site-gallery-images", data);
    revalidatePath(`/sch/${data.schoolId}`);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Type-safe error handling
      const message = error.response?.data?.message || "Failed to create image";
      throw new Error(message);
    }
    throw error;
  }
}
export async function getSiteGalleryImages(schoolId: string) {
  try {
    const response = await api.get(`/site-gallery-images/${schoolId}`);
    const images = response.data.data;
    return images as GalleryImageDTO[];
  } catch (error) {
    console.log(error);
  }
}
export async function deleteSiteGalleryImage(id: string) {
  try {
    const response = await api.delete(`/site-gallery-images/${id}`);
    const image = response.data.data;
    return image as GalleryImageDTO;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteSiteGalleryCategory(id: string) {
  try {
    const response = await api.delete(`/site-gallery-categories/${id}`);
    const cat = response.data.data;
    return cat as GalleryCategory;
  } catch (error) {
    console.log(error);
  }
}

export async function createSchoolInquiry(data: ContactData) {
  try {
    const response = await api.post("/site-messages", data);
    revalidatePath(`/sch/${data.schoolId}`);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Type-safe error handling
      const message =
        error.response?.data?.message || "Failed to create message";
      throw new Error(message);
    }
    throw error;
  }
}
export async function getSchoolNotifications(schoolId: string) {
  try {
    const response = await api.get(`/site-notifications/${schoolId}`);
    const notes = response.data.data;
    return notes as RecentActivity[];
  } catch (error) {
    console.log(error);
  }
}
export async function getSchoolWebsiteMessages(schoolId: string) {
  try {
    const response = await api.get(`/site-messages/${schoolId}`);
    const messages = response.data.data;
    return messages as SchoolContactMessage[];
  } catch (error) {
    console.log(error);
  }
}
