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

export async function createSubject(data: SubjectCreateProps) {
  try {
    const response = await api.post("/subjects", data);
    revalidatePath("/dashboard/academics/subjects");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Type-safe error handling
      const message =
        error.response?.data?.message || "Failed to create Subject";
      throw new Error(message);
    }
    throw error;
  }
}

export async function deleteSubject(id: string) {
  try {
    const response = await api.delete(`/subjects/${id}`);
    const subject = response.data;
    return subject as Subject;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllSubjects(schoolId: string) {
  try {
    const response = await api.get(`/subjects/school/${schoolId}`);
    const subjects = response.data;
    return subjects as Subject[];
  } catch (error) {
    console.log(error);
  }
}
export async function getBriefSubjects(schoolId: string) {
  try {
    const response = await api.get(`/subjects/brief/${schoolId}`);
    const subjects = response.data;
    return subjects as SubjectBrief[];
  } catch (error) {
    console.log(error);
  }
}
