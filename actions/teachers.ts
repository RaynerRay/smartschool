"use server";

import { api } from "./schools";
import axios from "axios";
import {
  BriefTeacher,
  Parent,
  Teacher,
  TeacherCreateProps,
} from "@/types/types";
import { ParentProps } from "@/components/dashboard/forms/users/parent-form";
import { revalidatePath } from "next/cache";

export async function createTeacher(data: TeacherCreateProps) {
  try {
    const response = await api.post("/teachers", data);
    revalidatePath("/dashboard/users/teachers");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteParent(id: string) {
  // console.log("deleted", id);
  return {
    ok: true,
  };
}

export async function getAllTeachers(schoolId: string) {
  try {
    const response = await api.get(`/teachers/school/${schoolId}`);
    const teachers = response.data;
    return teachers as Teacher[];
  } catch (error) {
    console.log(error);
    return [];
  }
}
export async function getTeachersWithBriefInfo(schoolId: string) {
  try {
    const response = await api.get(`/teachers-brief/school/${schoolId}`);
    const teachers = response.data;
    return teachers as BriefTeacher[];
  } catch (error) {
    console.log(error);
  }
}
