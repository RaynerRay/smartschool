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
} from "@/types/types";
import { revalidatePath } from "next/cache";

export async function createDepartment(data: DepartmentCreateProps) {
  try {
    const response = await api.post("/departments", data);
    revalidatePath("/dashboard/academics/departments");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Type-safe error handling
      const message =
        error.response?.data?.message || "Failed to create Department";
      throw new Error(message);
    }
    throw error;
  }
}

export async function deleteDepartment(id: string) {
  try {
    const response = await api.delete(`/departments/${id}`);
    const department = response.data;
    revalidatePath("/dashboard/academics/departments");
    return department as Department;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllDepartments(schoolId: string) {
  try {
    const response = await api.get(`/departments/school/${schoolId}`);
    const departments = response.data;
    return departments as Department[];
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
