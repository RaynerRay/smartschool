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
import { SchoolFeeProps } from "@/components/dashboard/forms/finance/schoo-fee-form";

export async function createSchoolFees(data: SchoolFeeProps) {
  try {
    const response = await api.post("/school-fees", data);
    revalidatePath("/dashboard/finance/fees");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Type-safe error handling
      const message = error.response?.data?.message || "Failed to create Fees";
      throw new Error(message);
    }
    throw error;
  }
}
export type SchoolFeeDTO = {
  id: string;
  term: string;
  title: string;
  className: string;
  fees: number;
  year: string;
};
export type Fee = {
  title: string;
  amount: number;
  schoolFeeId: string;
  id: string;
  feeStatus: "PAID" | "NOT_PAID";
  paymentDate: string | null;
};
export type SchoolFeeData = {
  id: string;
  term: string;
  title: string;
  className: string;
  fees: Fee[];
  feeTotal: number;
  year: string;
};
export async function getFeesForCurrentYear(schoolId: string) {
  try {
    const response = await api.get(`/school-fees/${schoolId}`);
    const schoolFees = response.data.data;
    return schoolFees as SchoolFeeDTO[];
  } catch (error) {
    console.log(error);
  }
}
export async function getFeesByClass(
  schoolId: string,
  className: string,
  term: string
) {
  try {
    const response = await api.get(
      `/school-fees/class/${schoolId}?className=${className}&&term=${term}`
    );
    const schoolFees = response.data.data;
    return schoolFees as SchoolFeeData[];
  } catch (error) {
    console.log(error);
  }
}
