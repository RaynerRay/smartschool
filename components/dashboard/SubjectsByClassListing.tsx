"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users,  Pencil, Trash2, } from "lucide-react";
import { Subject } from "@/types/types";
import { deleteSubject } from "@/actions/subjects";
import toast from "react-hot-toast";

export type SubjectType = "THEORY" | "PRACTICAL" | "BOTH";
export type SubjectCategory = "CORE" | "ELECTIVE";

// interface Teacher {
//   id: string;
//   name: string;
// }

interface SubjectsByClassListingProps {
  subjects: Subject[];
  onSubjectClick?: (subject: Subject) => void;
}

const SubjectsByClassListing: React.FC<SubjectsByClassListingProps> = ({
  subjects,
  onSubjectClick,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const getSubjectTypeColor = (type: SubjectType): string => {
    const colors = {
      THEORY: "bg-blue-100 text-blue-800",
      PRACTICAL: "bg-green-100 text-green-800",
      BOTH: "bg-purple-100 text-purple-800",
    };
    return colors[type];
  };

  const getCategoryColor = (category: SubjectCategory): string => {
    const colors = {
      CORE: "bg-red-100 text-red-800",
      ELECTIVE: "bg-yellow-100 text-yellow-800",
    };
    return colors[category];
  };

  const handleSubjectClick = (subject: Subject) => {
    setSelectedSubject(subject);
    setIsSheetOpen(true);
    onSubjectClick?.(subject);
  };

  async function handleDelete(id: string) {
    try {
      await deleteSubject(id);
      toast.success("Subject deleted");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-4 p-4">
        {subjects.map((subject) => (
          <Card
            key={subject.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleSubjectClick(subject)}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-semibold">
                  {subject.name}
                </CardTitle>
                <Badge variant="outline">{subject.code}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Badge className={getSubjectTypeColor(subject.type)}>
                    {subject.type}
                  </Badge>
                  <Badge className={getCategoryColor(subject.category)}>
                    {subject.category}
                  </Badge>
                </div>
                {/* {subject.teacherName && (
                  <div className="text-sm text-gray-600">
                    <span className="font-medium mr-1">Teacher</span>:{" "}
                    <span className="font-bold">{subject.teacherName}</span>
                  </div>
                )} */}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          {selectedSubject && (
            <>
              <SheetHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <SheetTitle className="text-xl font-bold">
                      {selectedSubject.name}
                    </SheetTitle>
                    <p className="text-sm text-gray-500 mt-1">
                      {selectedSubject.shortName &&
                        `${selectedSubject.shortName} • `}
                      {selectedSubject.code}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-blue-600 hover:text-blue-800">
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(selectedSubject.id)}
                      className="p-2 text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </SheetHeader>

              <div className="mt-6 space-y-4">
                {/* Teacher Assignment Card - Prominent Display */}
                <Card className="border-2 border-primary/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Subject Teacher
                    </CardTitle>
                  </CardHeader>
                  {/* <CardContent>
                    {selectedSubject.teacherName ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <User2 className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {selectedSubject.teacherName}
                            </p>
                            <p className="text-sm text-gray-500">
                              Class Teacher
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Change
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <p className="text-gray-500">No teacher assigned</p>
                        <Button variant="outline" size="sm">
                          Assign Teacher
                        </Button>
                      </div>
                    )}
                  </CardContent> */}
                </Card>

                {/* Main Details Card */}
                <Card>
                  <CardContent className="grid grid-cols-2 gap-4 pt-6">
                    <div>
                      <p className="text-sm font-medium">Department</p>
                      <p className="text-sm text-gray-600">
                        {selectedSubject.departmentName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Category</p>
                      <Badge
                        className={getCategoryColor(selectedSubject.category)}
                      >
                        {selectedSubject.category}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Type</p>
                      <Badge
                        className={getSubjectTypeColor(selectedSubject.type)}
                      >
                        {selectedSubject.type}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Marks</p>
                      <p className="text-sm text-gray-600">
                        {selectedSubject.passingMarks &&
                        selectedSubject.totalMarks
                          ? `${selectedSubject.passingMarks}/${selectedSubject.totalMarks}`
                          : "Not specified"}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Settings Card */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium">
                      Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${selectedSubject.isActive ? "bg-green-500" : "bg-red-500"}`}
                        />
                        <span>
                          {selectedSubject.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${selectedSubject.isOptional ? "bg-yellow-500" : "bg-blue-500"}`}
                        />
                        <span>
                          {selectedSubject.isOptional
                            ? "Optional"
                            : "Compulsory"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${selectedSubject.hasTheory ? "bg-blue-500" : "bg-gray-500"}`}
                        />
                        <span>
                          Theory{" "}
                          {selectedSubject.hasTheory
                            ? "Included"
                            : "Not Included"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${selectedSubject.hasPractical ? "bg-purple-500" : "bg-gray-500"}`}
                        />
                        <span>
                          Practical{" "}
                          {selectedSubject.hasPractical
                            ? "Included"
                            : "Not Included"}
                        </span>
                      </div>
                      {selectedSubject.hasPractical && (
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${selectedSubject.labRequired ? "bg-red-500" : "bg-gray-500"}`}
                          />
                          <span>
                            Lab{" "}
                            {selectedSubject.labRequired
                              ? "Required"
                              : "Not Required"}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

// interface SettingIndicatorProps {
//   active: boolean;
//   label: string;
//   activeText: string;
//   inactiveText: string;
//   activeColor: string;
//   inactiveColor: string;
// }

// const SettingIndicator: React.FC<SettingIndicatorProps> = ({
//   active,
//   activeText,
//   inactiveText,
//   activeColor,
//   inactiveColor,
// }) => (
//   <div className="flex items-center gap-2">
//     <div
//       className={`w-2 h-2 rounded-full ${active ? activeColor : inactiveColor}`}
//     />
//     <span>{active ? activeText : inactiveText}</span>
//   </div>
// );

export default SubjectsByClassListing;
