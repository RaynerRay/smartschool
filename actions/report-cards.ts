"use server";

import { api } from "./schools";

import { FetchReportData } from "@/components/dashboard/academics/report-card-listing";
import { ClassData } from "@/components/dashboard/academics/class-reports";
export async function getClassReportsData(data: FetchReportData) {
  try {
    const response = await api.get(
      `/reports/${data.classId}?termId=${data.termId}&examIds=${data.examIds}`
    );
    const resData = response.data;
    // console.log(resData);
    return resData as ClassData;
  } catch (error) {
    console.log(error);
    return null;
  }
}
