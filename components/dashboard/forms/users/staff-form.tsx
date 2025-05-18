"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormFooter from "../FormFooter";
import FormHeader from "../FormHeader";
import TextInput from "@/components/FormInputs/TextInput";
import ImageInput from "@/components/FormInputs/ImageInput";
import { toast } from "sonner";
import PasswordInput from "@/components/FormInputs/PasswordInput";
import FormSelectInput from "@/components/FormInputs/FormSelectInput";

import useSchoolStore from "@/store/school";
import { UserRole } from "@/types/types";

export type SelectOptionProps = {
  label: string;
  value: string;
};
type SingleStaffFormProps = {
  editingId?: string | undefined;
  initialData?: any | undefined | null; // eslint-disable-line @typescript-eslint/no-explicit-any
};
export type StaffProps = {
  name: string;
  role: UserRole;
  email: string;
  phone: string;
  image: string;
  password: string;
  schoolId: string;
  schoolName: string;
};
export default function StaffForm({
  editingId,
  initialData,
}: SingleStaffFormProps) {
  // Parents
  const roles = [
    {
      label: "SECRETARY",
      value: "SECRETARY",
    },
    {
      label: "LIBRARIAN",
      value: "LIBRARIAN",
    },
  ];
  const [selectedRole, setSelectedRole] = useState<any>(roles[1]); // eslint-disable-line @typescript-eslint/no-explicit-any

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StaffProps>({
    defaultValues: {
      name: "",
    },
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const initialImage = initialData?.imageUrl || "/images/student.png";
  const [imageUrl, setImageUrl] = useState(initialImage);
  const { school } = useSchoolStore();
  async function saveStaff(data: StaffProps) {
    try {
      setLoading(true);
      data.schoolId = school?.id ?? "";
      data.schoolName = school?.name ?? "";
      data.image = imageUrl;
      data.role = selectedRole.value as UserRole;

      console.log(data);
      if (editingId) {
        // await updateCategoryById(editingId, data);
        // setLoading(false);
        // toast.success("Updated Successfully!");
        // reset();
        // router.push("/dashboard/categories");
        // setImageUrl("/placeholder.svg");
      } else {
        // console.log(data);
        // const res = await createUser(data);
        setLoading(false);
        toast.success("Staff Successfully Created!");
        reset();
        setImageUrl("/images/student.png");
        router.push("/dashboard/users");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <form className="" onSubmit={handleSubmit(saveStaff)}>
      <FormHeader
        href="/users"
        parent=""
        title="Staff"
        editingId={editingId}
        loading={loading}
      />
      <div className="grid grid-cols-12 gap-6 py-4">
        <div className="lg:col-span-6 col-span-full ">
          <div className="grid gap-6">
            <TextInput
              register={register}
              errors={errors}
              label="Full Name"
              name="name"
            />
            <div className="grid gap-3">
              <TextInput
                register={register}
                errors={errors}
                label="Phone"
                name="phone"
                type="tel"
              />
              <TextInput
                register={register}
                errors={errors}
                label="Email"
                name="email"
                type="email"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <FormSelectInput
                label="Role"
                options={roles}
                option={selectedRole}
                setOption={setSelectedRole}
              />
              <div className="space-y-3">
                <div className="grid">
                  <PasswordInput
                    register={register}
                    errors={errors}
                    label="Staff Login Password"
                    name="password"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid lg:col-span-6 col-span-full">
          <ImageInput
            title="Staff Profile Image"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="parentProfileImage"
            className="object-contain"
          />
        </div>
      </div>
      <FormFooter
        href="/users"
        editingId={editingId}
        loading={loading}
        title="Staff"
        parent=""
      />
    </form>
  );
}
