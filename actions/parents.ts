"use server";

import { ContactProps } from "@/components/frontend/contact-us";
import { api } from "./schools";
import axios from "axios";
import { Contact, Parent } from "@/types/types";
import { ParentProps } from "@/components/dashboard/forms/users/parent-form";
import { revalidatePath } from "next/cache";
import { BriefStudent } from "@/components/portal/parents/StudentList";

export async function createParent(data: ParentProps) {
  try {
    const response = await api.post("/parents", data);
    revalidatePath("/dashboard/users/parents");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Type-safe error handling
      const message =
        error.response?.data?.message || "Failed to create parent";
      throw new Error(message);
    }
    throw error;
  }
}

export async function deleteParent(id: string) {
  // console.log("deleted", id);
  return {
    ok: true,
  };
}

export async function getAllParents(schoolId: string) {
  try {
    const response = await api.get(`/parents/school/${schoolId}`);
    const parents = response.data;
    return parents as Parent[];
  } catch (error) {
    console.log(error);
  }
}

export async function getStudentsByParentId(parentId: string) {
  try {
    const response = await api.get(`/students/parent/${parentId}`);
    const students = response.data;
    return students as BriefStudent[];
  } catch (error) {
    console.log(error);
  }
}
