"use client";



import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormFooter from "../FormFooter";
import FormHeader from "../FormHeader";
import TextInput from "@/components/FormInputs/TextInput";
import TextArea from "@/components/FormInputs/TextAreaInput";
import ImageInput from "@/components/FormInputs/ImageInput";
import toast from "react-hot-toast";
import PasswordInput from "@/components/FormInputs/PasswordInput";
import FormSelectInput from "@/components/FormInputs/FormSelectInput";
import { countries } from "@/countries";
import { TeacherCreateProps } from "@/types/types";
import { createTeacher } from "@/actions/teachers";
import FormMultipleSelectInput from "@/components/FormInputs/FormMultipleSelectInput";
import { generateRollNumber } from "@/lib/generateRoll";
import useSchoolStore from "@/store/school";
import { useUserSession } from "@/store/auth";

type TeacherFormProps = {
  editingId?: string | undefined;
  initialData?: any | undefined | null; // eslint-disable-line @typescript-eslint/no-explicit-any
  classes: DataOption[];
  departments: DataOption[];
  subjects: DataOption[];
};

export type DataOption = {
  label: string;
  value: string;
};
export default function TeacherForm({
  editingId,
  initialData,
  classes,
  departments,
  subjects,
}: TeacherFormProps) {
  // Parents
  const { user } = useUserSession();
  const userRole = user?.role ?? "ADMIN";
  // const relationships = [
  //   {
  //     label: "Mother",
  //     value: "Mother",
  //   },
  //   {
  //     label: "Father",
  //     value: "Father",
  //   },
  //   {
  //     label: "Guardian",
  //     value: "Guardian",
  //   },
  //   {
  //     label: "Other",
  //     value: "Other",
  //   },
  // ];
  // const [selectedRelationship, setSelectedRelationship] = useState<any>( // eslint-disable-line @typescript-eslint/no-explicit-any
  //   relationships[1]
  // );

  // Titles
  const titles = [
    {
      label: "Mr",
      value: "Mr",
    },
    {
      label: "Mrs",
      value: "Mrs",
    },
  ];
  const [selectedTitle, setSelectedTitle] = useState<any>(titles[0]); // eslint-disable-line @typescript-eslint/no-explicit-any

  // Class
  const contactMethods = [
    {
      label: "Phone",
      value: "Phone",
    },
    {
      label: "Email",
      value: "Email",
    },
    {
      label: "Whatsap",
      value: "Whatsap",
    },
  ];

  const qualifications = [
    {
      label: "Bachelors",
      value: "Bachelors",
    },
    {
      label: "Diploma",
      value: "Diploma",
    },
    {
      label: "Certificate",
      value: "Certificate",
    },
  ];
  const [selectedMethod, setSelectedMethod] = useState<any>(contactMethods[0]); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [selectedDepartment, setSelectedDepartment] = useState<any>( // eslint-disable-line @typescript-eslint/no-explicit-any
    departments[0]
  );
  const [selectedSubjects, setSelectedSubjects] = useState<any>([subjects[0]]);// eslint-disable-line @typescript-eslint/no-explicit-any

  // console.log(selectedSubjects);
  const [mainSubject, setMainSubject] = useState<any>(subjects[0]); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [qualification, setQualification] = useState<any>(qualifications[0]); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [selectedClasses, setSelectedClasses] = useState<any>([classes[0]]); // eslint-disable-line @typescript-eslint/no-explicit-any

  // Gender
  const genders = [
    {
      label: "MALE",
      value: "MALE",
    },
    {
      label: "FEMALE",
      value: "FEMALE",
    },
  ];

  const [selectedGender, setSelectedGender] = useState<any>(genders[0]); // eslint-disable-line @typescript-eslint/no-explicit-any

  // Nationality
  const initialCountryCode = "UG";
  const initialCountry = countries.find(
    (item) => item.countryCode === initialCountryCode
  );
  const [selectedNationality, setSelectedNationality] =
    useState<any>(initialCountry); // eslint-disable-line @typescript-eslint/no-explicit-any

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TeacherCreateProps>({
    defaultValues: {
      firstName: "",
    },
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const initialImage = initialData?.imageUrl || "/images/student.png";
  const [imageUrl, setImageUrl] = useState(initialImage);
  const { school } = useSchoolStore();
  async function saveTeacher(data: TeacherCreateProps) {
    try {
      data.schoolId = school?.id ?? "";
      data.schoolName = school?.name ?? "";
      setLoading(true);
      data.employeeId = generateRollNumber();
      data.imageUrl = imageUrl;
      data.title = selectedTitle.value;
      data.gender = selectedGender.value;
      data.nationality = selectedNationality.label;
      data.contactMethod = selectedMethod.value;
      data.departmentId = selectedDepartment.value;
      data.departmentName = selectedDepartment.label;
      data.qualification = qualification.label;
      data.mainSubject = mainSubject.label;
      data.mainSubjectId = mainSubject.value;
      data.subjectsSummary = selectedSubjects.map((item: any) => item.label);  // eslint-disable-line @typescript-eslint/no-explicit-any
      data.classIds = selectedClasses.map((item: any) => item.value); // eslint-disable-line @typescript-eslint/no-explicit-any
      data.classes = selectedClasses.map((item: any) => item.label); // eslint-disable-line @typescript-eslint/no-explicit-any
      data.experience = Number(data.experience);
      // console.log(data);
      if (editingId) {
        // await updateCategoryById(editingId, data);
        // setLoading(false);
        // toast.success("Updated Successfully!");
        // reset();
        // router.push("/dashboard/categories");
        // setImageUrl("/placeholder.svg");
      } else {
        // console.log(data);
         await createTeacher(data);
        setLoading(false);
        toast.success("Successfully Created!");
        reset();
        // setImageUrl("/placeholder.svg");
        const path =
          userRole === "ADMIN"
            ? "/dashboard/users/teachers"
            : "/portal/secretary/teachers";
        router.push(path);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <form className="" onSubmit={handleSubmit(saveTeacher)}>
      <FormHeader
        href="/teachers"
        parent="users"
        title="Teacher"
        editingId={editingId}
        loading={loading}
      />
      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-12 col-span-full space-y-3">
          <div className="grid gap-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <FormSelectInput
                label="Title"
                options={titles}
                option={selectedTitle}
                setOption={setSelectedTitle}
              />
              <TextInput
                register={register}
                errors={errors}
                label="First Name"
                name="firstName"
              />
              <TextInput
                register={register}
                errors={errors}
                label="Last Name"
                name="lastName"
              />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
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
              <TextInput
                register={register}
                errors={errors}
                type="tel"
                label="Whatsap No."
                name="whatsappNo"
              />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <FormSelectInput
                label="Nationality"
                options={countries}
                option={selectedNationality}
                setOption={setSelectedNationality}
              />
              <TextInput
                register={register}
                errors={errors}
                label="National ID /Passport No"
                name="NIN"
              />

              <FormSelectInput
                label="Gender"
                options={genders}
                option={selectedGender}
                setOption={setSelectedGender}
                isSearchable={false}
              />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <TextInput
                register={register}
                errors={errors}
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
              />
              <FormSelectInput
                label="Preferred Contact Method"
                options={contactMethods}
                option={selectedMethod}
                setOption={setSelectedMethod}
              />
              <PasswordInput
                register={register}
                errors={errors}
                label="Teacher Portal Password"
                name="password"
                type="password"
              />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <TextInput
                register={register}
                errors={errors}
                label="Date of Joining"
                name="dateOfJoining"
                type="date"
              />
              <TextInput
                register={register}
                errors={errors}
                label="Designation"
                name="designation"
                placeholder="eg Head of Department"
              />
              <FormSelectInput
                label="Department"
                options={departments}
                option={selectedDepartment}
                setOption={setSelectedDepartment}
                href="/dashboard/academics/departments"
                toolTipText="Create New Department"
              />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <FormSelectInput
                label="Qualification"
                options={qualifications}
                option={qualification}
                setOption={setQualification}
              />

              <FormSelectInput
                label="Main Subject"
                options={subjects}
                option={mainSubject}
                setOption={setMainSubject}
                href="/dashboard/academics/subjects"
                toolTipText="Add New Subject"
              />
              {/* Multi select */}
              <FormMultipleSelectInput
                label="Subjects"
                options={subjects}
                option={selectedSubjects}
                setOption={setSelectedSubjects}
                href="/dashboard/academics/subjects"
                toolTipText="Add New Subject"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="space-y-3">
                {/* Multi select */}
                <FormMultipleSelectInput
                  label="Classes"
                  options={classes}
                  option={selectedClasses}
                  setOption={setSelectedClasses}
                  href="/dashboard/academics/classes"
                  toolTipText="Add New Class"
                />
                <div className="grid  gap-3">
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Years of Experience"
                    name="experience"
                    placeholder="Eg 5"
                    type="number"
                  />
                </div>
                <div className="grid gap-3">
                  <TextArea
                    register={register}
                    errors={errors}
                    label="Address"
                    name="address"
                  />
                </div>
              </div>
              <div className="grid">
                <ImageInput
                  title="Teacher Profile Image"
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  endpoint="teacherProfileImage"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <FormFooter
        href="/teachers"
        editingId={editingId}
        loading={loading}
        title="Teacher"
        parent="users"
      />
    </form>
  );
}
