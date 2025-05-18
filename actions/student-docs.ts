"use server";

import { api } from "./schools";
import axios from "axios";
import {
  Department,
  DepartmentBrief,
  GroupedPeriods,
  Period,
  PeriodCreateProps,
} from "@/types/types";
import { revalidatePath } from "next/cache";
import { CreateDoc } from "@/components/dashboard/StudentDocumentFileUploadForm";
import { StudentDocument } from "@/components/StudentDocuments";

export async function createStudentDocs(data: CreateDoc[]) {
  try {
    const response = await api.post("/student-docs", data);
    revalidatePath("/dashboard/students/view");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Type-safe error handling
      const message =
        error.response?.data?.message || "Failed to create Student docs";
      throw new Error(message);
    }
    throw error;
  }
}

export async function getStudentDocs(studentId: string) {
  try {
    const response = await api.get(`/student-docs/${studentId}`);
    const docs = response.data.data;
    return docs as StudentDocument[];
  } catch (error) {
    console.log(error);
    return [];
  }
}
export async function deleteDocument(id: string) {
  try {
    const response = await api.delete(`/student-docs/${id}`);
    const docs = response.data.data;
    return docs as StudentDocument[];
  } catch (error) {
    console.log(error);
    return [];
  }
}
