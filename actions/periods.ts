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

export async function createPeriod(data: PeriodCreateProps) {
  try {
    const response = await api.post("/periods", data);
    revalidatePath("/dashboard/academics/terms");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Type-safe error handling
      const message =
        error.response?.data?.message || "Failed to create Period";
      throw new Error(message);
    }
    throw error;
  }
}
export async function updatePeriodById(
  id: string,
  data: Partial<PeriodCreateProps>
) {
  try {
    const response = await api.patch(`/periods/${id}`, data);
    revalidatePath("/dashboard/academics/terms");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Type-safe error handling
      const message =
        error.response?.data?.message || "Failed to create Period";
      throw new Error(message);
    }
    throw error;
  }
}

export async function getAllGroupedPeriods(schoolId: string) {
  try {
    const response = await api.get(`/periods/${schoolId}`);
    const periods = response.data;
    return periods as GroupedPeriods;
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
