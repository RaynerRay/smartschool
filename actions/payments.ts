"use server";

import { api } from "./schools";
import axios from "axios";
import {
  CreateSchoolFeePaymentInput,
  Department,
  DepartmentBrief,
  GroupedPeriods,
  Payment,
  Period,
  PeriodCreateProps,
} from "@/types/types";
import { revalidatePath } from "next/cache";
export type PaymentResponse = {
  data: string;
};
export async function createPayment(data: CreateSchoolFeePaymentInput) {
  try {
    const response = await api.post("/payments", data);
    revalidatePath("/dashboard/finance/payments");
    return response.data as PaymentResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Type-safe error handling
      const message =
        error.response?.data?.message || "Failed to create Payment";
      throw new Error(message);
    }
    throw error;
  }
}

export async function getAllPayments(schoolId: string) {
  try {
    const response = await api.get(`/payments/${schoolId}`);
    const periods = response.data.data;
    return periods as Payment[];
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
