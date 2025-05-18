"use server";

import { api } from "./schools";
import axios from "axios";
import {
  Department,
  DepartmentBrief,
  Exam,
  GroupedPeriods,
  Period,
  PeriodCreateProps,
} from "@/types/types";
import { revalidatePath } from "next/cache";
import { IExamFormData } from "@/components/dashboard/exams/ExamForm";

export async function createExam(data: IExamFormData) {
  try {
    const response = await api.post("/exams", data);
    revalidatePath("/dashboard/academics/exams");
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

export async function getExamsByAcademicYear(
  schoolId: string,
  academicYear: string
) {
  try {
    const response = await api.get(`/exams/${schoolId}?year=${academicYear}`);
    const exams = response.data.data;
    return exams as Exam[];
  } catch (error) {
    console.log(error);
  }
}
export async function getAllPeriods(schoolId: string) {
  try {
    const response = await api.get(`/periods/${schoolId}`);
    const periods = response.data.data;
    return periods as Period[];
  } catch (error) {
    console.log(error);
  }
}
export async function getBriefDepartments(schoolId: string) {
  try {
    const response = await api.get(`/departments/brief/${schoolId}`);
    const departments = response.data;
    return departments as DepartmentBrief[];
  } catch (error) {
    console.log(error);
  }
}
