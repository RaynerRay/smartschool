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
  UserLogCreateProps,
} from "@/types/types";
import { revalidatePath } from "next/cache";
import { UserLog } from "@/components/dashboard/UserLogs";

export async function createUserLog(data: UserLogCreateProps) {
  try {
    const response = await api.post("/logs", data);
    revalidatePath("/dashboard/logs");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Type-safe error handling
      const message = error.response?.data?.message || "Failed to create Log";
      throw new Error(message);
    }
    throw error;
  }
}

export async function getAllLogs(schoolId: string) {
  try {
    const response = await api.get(`/logs/school/${schoolId}`);
    const logs = response.data;
    return logs as UserLog[];
  } catch (error) {
    console.log(error);
  }
}
