"use server";

import { ContactProps } from "@/components/frontend/contact-us";
import { api } from "./schools";
import axios from "axios";
import {
  Contact,
  MarkSheetResponse,
  MarkSheetStudent,
  Parent,
  Student,
} from "@/types/types";
import { ParentProps } from "@/components/dashboard/forms/users/parent-form";
import { StudentProps } from "@/components/dashboard/forms/students/student-form";
import { revalidatePath } from "next/cache";
import { StudentByClassProps } from "@/components/dashboard/StudentListingByClass";
import { GuardianFormData } from "@/components/dashboard/forms/students/GuadianForm";
import { MarkSheetCreateProps } from "@/components/dashboard/exams/MarkSheetForm";

export async function createStudent(data: StudentProps) {
  try {
    const response = await api.post("/students", data);
    revalidatePath("/dashboard/students");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Type-safe error handling
      const message =
        error.response?.data?.message || "Failed to create student";
      throw new Error(message);
    }
    throw error;
  }
}
export async function createGuardian(data: GuardianFormData) {
  try {
    const response = await api.post("/guardians", data);
    revalidatePath("/dashboard/students");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Type-safe error handling
      const message =
        error.response?.data?.message || "Failed to create Guardian";
      throw new Error(message);
    }
    throw error;
  }
}
export async function updatedGuardian(id: string, data: GuardianFormData) {
  try {
    const response = await api.put(`/guardians/${id}`, data);
    revalidatePath("/dashboard/students");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Type-safe error handling
      const message =
        error.response?.data?.message || "Failed to create Guardian";
      throw new Error(message);
    }
    throw error;
  }
}

export async function deleteStudent(id: string) {
  // console.log("deleted", id);
  return {
    ok: true,
  };
}

export async function getAllStudents(schoolId: string) {
  try {
    const response = await api.get(`/students/school/${schoolId}`);
    const students = response.data;
    return students as Student[];
  } catch (error) {
    console.log(error);
  }
}
export async function getAllBriefStudents(schoolId: string) {
  try {
    const response = await api.get(`/students/school/brief/${schoolId}`);
    const students = response.data;
    return students as {
      id: string;
      name: string;
      regNo: string;
    }[];
  } catch (error) {
    console.log(error);
  }
}
export async function getStudentsByClass(data: StudentByClassProps) {
  try {
    const response = await api.get(
      `/students-by-class/school/${data.schoolId}?classId=${data.classId}&&streamId=${data.streamId}`
    );
    const students = response.data;
    revalidatePath("/dashboard/students");
    return students as Student[];
  } catch (error) {
    console.log(error);
    return [];
  }
}
export async function getStudentNextSequence(schoolId: string) {
  try {
    const response = await api.get(`/students/seq/${schoolId}`);
    const nextSeq = response.data;
    return nextSeq as number;
  } catch (error) {
    console.log(error);
  }
}
export async function getStudentById(studentId: string) {
  try {
    const response = await api.get(`/students/${studentId}`);
    const student = response.data;
    return student as Student;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getStudentByUserId(studentUserId: string) {
  try {
    const response = await api.get(`/students/user/${studentUserId}`);
    const student = response.data;
    return student as Student;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getBriefStudentsByClassId(data: MarkSheetCreateProps) {
  try {
    const response = await api.post("/students/class", data);
    const resData = response.data;
    return resData as MarkSheetResponse;
  } catch (error) {
    console.log(error);
    return null;
  }
}
