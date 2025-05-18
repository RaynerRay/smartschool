"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {  Pencil, Plus } from "lucide-react";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import TextInput from "@/components/FormInputs/TextInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import {
  PeriodCreateProps,
} from "@/types/types";
import useSchoolStore from "@/store/school";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { createPeriod, updatePeriodById } from "@/actions/periods";
import { convertDateToIso } from "@/lib/convertDateToIso";
import { Period } from "../../academics/periods-page";

export type DepartmentProps = {
  name: string;
};
export default function PeriodForm({
  initialContent,
  editingId,
}: {
  initialContent?: Period;
  editingId?: string;
}) {
  const initialValues = {
    year: editingId ? initialContent?.year : new Date().getFullYear(),
    startDate: editingId
      ? new Date(initialContent?.startDate as Date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    endDate: editingId
      ? new Date(initialContent?.endDate as Date).toISOString().split("T")[0]
      : (() => {
          const date = new Date();
          date.setDate(date.getDate() + 30);
          return date.toISOString().split("T")[0];
        })(),
    term: editingId ? initialContent?.term : 1,
    isActive: editingId ? (initialContent?.isActive ?? false) : false,
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<PeriodCreateProps>({
    defaultValues: {
      year: initialValues.year,
      startDate: initialValues.startDate,
      endDate: initialValues.endDate,
      term: initialValues.term,
    },
  });

  const [loading, setLoading] = useState(false);
  const { school } = useSchoolStore();
  const defaultActiveState = editingId
    ? (initialContent?.isActive ?? false)
    : false;
  const [isActive, setIsActive] = useState<boolean>(defaultActiveState);
  const getChangedFields = (
    formData: PeriodCreateProps
  ): Partial<PeriodCreateProps> => {
    const changedFields: Partial<PeriodCreateProps> = {};

    // Check form fields that are marked as dirty by react-hook-form
    if (dirtyFields.year) changedFields.year = Number(formData.year);
    if (dirtyFields.term) changedFields.term = Number(formData.term);
    if (dirtyFields.startDate)
      changedFields.startDate = convertDateToIso(formData.startDate);
    if (dirtyFields.endDate)
      changedFields.endDate = convertDateToIso(formData.endDate);

    // Check if isActive has changed
    if (isActive !== initialValues.isActive) {
      changedFields.isActive = isActive;
    }

    return changedFields;
  };
  async function savePeriod(data: PeriodCreateProps) {
    try {
      setLoading(true);
      if (editingId) {
        // Get only the changed fields
        const changedData = getChangedFields(data);

        // If no fields changed, show a message and return
        if (Object.keys(changedData).length === 0) {
          setLoading(false);
          toast.error("No changes detected");
          return;
        }

        changedData.schoolId = school?.id ?? "";

        console.log("Updating with changed fields only:", changedData);
        console.log(changedData);
        // Call the update function with only changed fields
        await updatePeriodById(editingId, changedData);
        setLoading(false);
        toast.success("Updated Successfully!");
      } else {
        const newData = {
          ...data,
          schoolId: school?.id ?? "",
          year: Number(data.year),
          term: Number(data.term),
          startDate: convertDateToIso(data.startDate),
          endDate: convertDateToIso(data.endDate),
          isActive: isActive,
        };
        await createPeriod(newData);
        setLoading(false);
        toast.success("Successfully Created!");
        reset();
        console.log(newData);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <div>
      <div className="py-1">
        <Dialog>
          <DialogTrigger asChild>
            {editingId ? (
              <button title="Edit Period" className="text-blue-600">
                <Pencil className="w-4 h-4 " />
              </button>
            ) : (
              <Button className="">
                <Plus className="h-4 w-4" />
                <span className="">Add New Period</span>
              </Button>
            )}
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Edit Period" : "Add New Period"}
              </DialogTitle>
              {/* <DialogDescription>
                Please Write your Comment here, with respect
              </DialogDescription> */}
            </DialogHeader>

            <form className="" onSubmit={handleSubmit(savePeriod)}>
              <div className="">
                <div className="space-y-3">
                  <div className="grid lg:grid-cols-2 gap-3">
                    <TextInput
                      register={register}
                      errors={errors}
                      label="Year"
                      name="year"
                      type="number"
                    />
                    <TextInput
                      register={register}
                      errors={errors}
                      label="Term"
                      name="term"
                      type="number"
                      min={1}
                      max={3}
                    />
                  </div>
                  <div className="grid lg:grid-cols-2 gap-3">
                    <TextInput
                      register={register}
                      errors={errors}
                      label="Start Date"
                      name="startDate"
                      type="date"
                    />
                    <TextInput
                      register={register}
                      errors={errors}
                      label="End Date"
                      name="endDate"
                      type="date"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isActive"
                      checked={isActive}
                      onCheckedChange={setIsActive}
                    />
                    <Label htmlFor="isActive">Set as the current term</Label>
                  </div>
                </div>
                <div className="py-3">
                  <SubmitButton
                    title={editingId ? "Update Period" : "Add Period"}
                    loading={loading}
                    className="w-full"
                  />
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
