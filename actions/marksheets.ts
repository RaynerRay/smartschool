"use server";

import { api } from "./schools";
import axios from "axios";
import {
  CreateMarkSheetProps,
  Department,
  DepartmentBrief,
  Exam,
  GroupedPeriods,
  MarkSheetStudent,
  Period,
  PeriodCreateProps,
  UpdateMarkSheetProps,
} from "@/types/types";
import { revalidatePath } from "next/cache";
import { StudentWithMarks } from "@/components/dashboard/exams/StudentMarkSheet";

export async function updateMarkSheetWithMarks(data: UpdateMarkSheetProps) {
  try {
    const response = await api.put(`/mark-sheet/${data.markSheetId}`, data);
    revalidatePath("/dashboard/academics/exams");
    const students = response.data;
    return students as MarkSheetStudent[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Type-safe error handling
      const message = error.response?.data?.message || "Failed to create exams";
      throw new Error(message);
    }
    throw error;
  }
}

export type SubjectMarkSheetDTO = {
  examId: string;
  classId: string;
  subjectId: string;
  termId: string;
};
export async function getSubjectMarkSheet(data: SubjectMarkSheetDTO) {
  try {
    const response = await api.get(
      `/mark-sheet/subject/${data.subjectId}?examId=${data.examId}&&classId=${data.classId}&&termId=${data.termId}`
    );
    const studentMarks = response.data.data;
    return studentMarks as StudentWithMarks[];
  } catch (error) {
    return [];
    console.log(error);
  }
}
