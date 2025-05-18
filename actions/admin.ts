"use server";

import { ContactProps } from "@/components/frontend/contact-us";
import { api } from "./schools";
import axios from "axios";
import { Contact } from "@/types/types";
import { revalidatePath } from "next/cache";

export async function createContact(data: ContactProps) {
  try {
    const response = await api.post("/contacts", data);
    revalidatePath("/dashboard/admin/contacts");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Type-safe error handling
      const message =
        error.response?.data?.message || "Failed to create contact";
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

export async function getAllContacts() {
  try {
    const response = await api.get("/contacts");
    const contacts = response.data;
    return contacts as Contact[];
  } catch (error) {
    console.log(error);
  }
}
