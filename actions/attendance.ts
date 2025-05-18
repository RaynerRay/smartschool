"use server";

import { ContactProps } from "@/components/frontend/contact-us";
import { api } from "./schools";
import axios from "axios";
import {
  Class,
  ClassCreateProps,
  Contact,
  Department,
  DepartmentBrief,
  DepartmentCreateProps,
  Stream,
  StreamCreateProps,
  Subject,
  SubjectBrief,
  SubjectCreateProps,
} from "@/types/types";
import { revalidatePath } from "next/cache";
import { AttendanceData as Attendance } from "@/types/attendance";
import { AttendanceData } from "@/app/(back)/dashboard/attendance/components/StudentListingByStream";
import { StudentAttendanceData } from "@/types/studentAttendance";

export async function createAttendance(data: AttendanceData) {
  try {
    const response = await api.post("/attendance", data);
    revalidatePath("/dashboard/attendance");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Failed to create Attendance";
      throw new Error(message);
    }
    throw error;
  }
}

export async function getAttendanceList(streamId: string, date: Date) {
  try {
    const response = await api.get(`/attendance/${streamId}?date=${date}`);
    const data = response.data;
    return data as Attendance;
  } catch (error) {
    return null;
    console.log(error);
  }
}
export async function getStudentAttendanceList(studentId: string, date: Date) {
  try {
    const response = await api.get(
      `/attendance/student/${studentId}?date=${date}`
    );
    const data = response.data;
    return data as StudentAttendanceData;
  } catch (error) {
    return null;
    console.log(error);
  }
}
