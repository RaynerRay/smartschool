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
export type SingleEmailReminderProps = {
  parentName: string;
  email: string;
  message: string;
  subject: string;
};
export type SinglePhoneReminderProps = {
  parentName: string;
  phone: string;
  message: string;
};
export type BatchEmailReminderProps = {
  parents: {
    name: string;
    email: string;
    phone: string;
  }[];
  message: string;
  subject: string;
};
type GroupData = {
  id: string;
  name: string;
  email: string;
  // phone: string;
};
export type MessageGroups = {
  parents: number;
  students: number;
  teachers: number;
};
export async function sendSingleEmailReminder(data: SingleEmailReminderProps) {
  try {
    const response = await api.post("/reminders/specific-email", data);
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
export async function sendSinglePhoneReminder(data: SinglePhoneReminderProps) {
  try {
    const response = await api.post("/reminders/specific-phone", data);
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
export async function sendBulkEmail(data: BatchEmailReminderProps) {
  try {
    const response = await api.post("/reminders/batch-emails", data);
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

export async function getMessageGroups(schoolId: string) {
  try {
    const response = await api.get(`/groups/${schoolId}`);
    // console.log(response);
    const groups = response.data;
    return groups as MessageGroups;
  } catch (error) {
    return {
      parents: 0,
      students: 0,
      teachers: 0,
    };
  }
}
export type Reminder = {
  name: string | null;
  id: string;
  createdAt: Date ;
  updatedAt: Date;
  schoolId: string;
  email: string | null;
  message: string;
  subject: string;
  recipient: "Parents" | "Students" | "Teachers" | "All";
  from: "Administration" | "Parent" | "Student" | "Teacher";
};

export async function getRemindersByKey(schoolId: string, key: string) {
  try {
    const response = await api.get(`/reminders/${schoolId}?key=${key}`);
    const messages = response.data;

    // Convert createdAt and updatedAt to string
    return messages.map((msg: Reminder) => ({
      ...msg,
      createdAt: new Date(msg.createdAt).toISOString(),
      updatedAt: new Date(msg.updatedAt).toISOString(),
    })) as import("@/components/portal/Inbox").Reminder[];
  } catch (error) {
    return [];
  }
}
export type GroupMessagePayload = {
  key: string;
  subject: string;
  message: string;
  schoolId: string;
};
export async function sendGroupMessages(data: GroupMessagePayload) {
  try {
    const response = await api.post(`/groups`, data);
    // console.log(response);
    const groups = response.data;
    return groups as MessageGroups;
  } catch (error) {
    return {
      parents: 0,
      students: 0,
      teachers: 0,
    };
  }
}
