"use server";

import axios from "axios";
import { SchoolProps } from "@/components/dashboard/forms/school/school-admin-form";
import { revalidatePath } from "next/cache";
import { School } from "@/types/types";

const BASE_API_URL = process.env.API_URL || "";
export const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
export async function createSchool(data: SchoolProps) {
  try {
    const response = await api.post("/schools", data);
    revalidatePath("/dashboard/admin/schools");
    return response.data.data as School;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Type-safe error handling
      const message =
        error.response?.data?.message || "Failed to create school";
      throw new Error(message);
    }
    throw error;
  }
}

export async function getSchoolById(
  id: string | null | undefined,
  type = "id"
) {
  if (id) {
    try {
      const response = await api.get(`/schools/${id}?type=${type}`);
      const school = response.data;
      // console.log(school);
      return school as School;
    } catch (error) {
      console.log(error);
    }
  } else {
    return null;
  }
}

export interface BriefSchool {
  id: string;
  name: string;
}
export async function getSchoolNames() {
  try {
    const response = await api.get(`/schools/titles`);
    const school = response.data;
    // console.log(school);
    return school as BriefSchool[];
  } catch (error) {
    console.log(error);
    return [];
  }
}
