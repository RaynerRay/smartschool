"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Check,
  Pencil,
  UserPlus,
} from "lucide-react";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import {
  AssignClassTeacherProps,
  BriefTeacher,
} from "@/types/types";
import FormSelectInput from "@/components/FormInputs/FormSelectInput";

export type ClassProps = {
  name: string;
};
export default function AssignClassTeacherForm({
  classId,
  editingId,
  teachers,
  oldClassTeacherId,
}: {
  classId: string;
  oldClassTeacherId: string | null | undefined;
  initialContent?: string;
  editingId?: string;
  teachers: BriefTeacher[];
}) {
  const teacherOptions = teachers.map((teacher) => {
    return {
      label: `${teacher.firstName} ${teacher.lastName}`,
      value: teacher.id,
    };
  });
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const {
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm<AssignClassTeacherProps>();

  const [loading, setLoading] = useState(false);
  async function addClassTeacher(data: AssignClassTeacherProps) {
    data.classId = classId;
    data.classTeacherId = selectedTeacher.value;
    data.classTeacherName = selectedTeacher.label;
    data.oldClassTeacherId = oldClassTeacherId;
    // console.log(data);
    try {
      setLoading(true);
      // const res = await assignClassTeacher(data);
      setLoading(false);
      toast.success("Teacher Successfully Assigned to this class!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      reset();
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
              <button title="Edit Folder" className="text-blue-600">
                <Pencil className="w-4 h-4 " />
              </button>
            ) : (
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Assign Class Teacher
              </Button>
            )}
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Edit Stream" : "Assign Class Teacher"}
              </DialogTitle>
              {/* <DialogDescription>
                Please Write your Comment here, with respect
              </DialogDescription> */}
            </DialogHeader>
            <form className="" onSubmit={handleSubmit(addClassTeacher)}>
              <div className="">
                <div className="space-y-3">
                  <div className="grid gap-3">
                    <FormSelectInput
                      label="Class teacher"
                      options={teacherOptions}
                      option={selectedTeacher}
                      setOption={setSelectedTeacher}
                      href="/dashboard/users/teachers/new"
                      toolTipText="Add new Teacher"
                    />
                  </div>
                </div>
                <div className="py-3">
                  <SubmitButton
                    title={editingId ? "Update" : "Assign teacher"}
                    buttonIcon={Check}
                    loading={loading}
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
