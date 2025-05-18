"use server";

import { ContactProps } from "@/components/frontend/contact-us";
import { api } from "./schools";
import axios from "axios";
import {
  AssignClassTeacherProps,
  Class,
  ClassBrief,
  ClassCreateProps,
  Contact,
  Stream,
  StreamCreateProps,
} from "@/types/types";
import { revalidatePath } from "next/cache";

export async function createClass(data: ClassCreateProps) {
  try {
    const response = await api.post("/classes", data);
    revalidatePath("/dashboard/academics/classes");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Type-safe error handling
      const message = error.response?.data?.message || "Failed to create Class";
      throw new Error(message);
    }
    throw error;
  }
}
export async function createStream(data: StreamCreateProps) {
  try {
    const response = await api.post("/streams", data);
    revalidatePath("/dashboard/academics/classes");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Type-safe error handling
      const message =
        error.response?.data?.message || "Failed to create stream";
      throw new Error(message);
    }
    throw error;
  }
}

export async function deleteContact(id: string) {
  // console.log("deleted", id);
  return {
    ok: true,
  };
}

export async function getAllClasses(schoolId: string) {
  try {
    const response = await api.get(`/classes/school/${schoolId}`);
    const classes = response.data;
    return classes as Class[];
  } catch (error) {
    console.log(error);
  }
}
export async function getBriefClasses(schoolId: string) {
  try {
    const response = await api.get(`/classes/brief/${schoolId}`);
    const classes = response.data;
    return classes as ClassBrief[];
  } catch (error) {
    console.log(error);
  }
}
export async function getAllStreams() {
  try {
    const response = await api.get("/streams");
    const streams = response.data;
    return streams as Stream[];
  } catch (error) {
    console.log(error);
  }
}
export async function assignClassTeacher(data: AssignClassTeacherProps) {
  try {
    const response = await api.put(`/classes/teacher/${data.classId}`, data);
    revalidatePath("/dashboard/academics/classes");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Type-safe error handling
      const message =
        error.response?.data?.message || "Failed to create stream";
      throw new Error(message);
    }
    throw error;
  }
}
