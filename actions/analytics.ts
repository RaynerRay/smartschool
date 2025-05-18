"use server";

import { api } from "./schools";

export type Analytics = {
  title: string;
  count: number;
};
export interface PublicStats {
  students: number;
  teachers: number;
  schools: number;
  parents: number;
}
export interface AdminStats {
  students: number;
  teachers: number;
  parents: number;
  totalPending: number;
  totalPaid: number;
  recentStudents: Student[];
  recentEvents: Event[];
}
interface Student {
  id: string;
  name: string;
  regNo: string;
  gender: "MALE" | "FEMALE";
  class: {
    title: string;
  };
}

interface Event {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  date: string;
  location: string;
}
export type TeacherAnalyticsData = {
  students: number;
  exams: number;
  reminders: number;
  recentStudents: Student[];
  recentEvents: Event[];
};

export async function getAllAnalytics(schoolId: string) {
  try {
    const response = await api.get(`/analytics/${schoolId}`);
    // console.log(response);
    const analytics = response.data;
    return analytics as AdminStats;
  } catch (error) {
    return {
      students: 0,
      teachers: 0,
      parents: 0,
      totalPending: 0,
      totalPaid: 0,
      recentStudents: [],
      recentEvents: [],
    };
  }
}
export async function getTeacherAnalytics(schoolId: string) {
  try {
    const response = await api.get(`/analytics/teachers/${schoolId}`);
    // console.log(response);
    const analytics = response.data;
    return analytics as TeacherAnalyticsData;
  } catch (error) {
    return {
      students: 0,
      reminders: 0,
      exams: 0,
      recentStudents: [],
      recentEvents: [],
    };
  }
}
export async function getPublicStats() {
  try {
    const response = await api.get(`/analytics/public`);
    const analytics = response.data;
    return analytics as PublicStats;
  } catch (error) {
    return {
      students: 0,
      teachers: 0,
      schools: 0,
      parents: 0,
    };
    console.log(error);
  }
}
