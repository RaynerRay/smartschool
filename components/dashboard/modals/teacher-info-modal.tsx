import { useState } from "react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  User,
  Mail,
  Phone,
  Flag,
  MapPin,
  Briefcase,
  Calendar,
  Clock,
  Edit,
  Trash2,
  GraduationCap,
  Book,
} from "lucide-react";
import { Teacher } from "@/types/types";

interface TeacherInfoModalProps {
  teacher: Teacher;
}

export function TeacherInfoModal({ teacher }: TeacherInfoModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">View Teacher Info</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Teacher Information</DialogTitle>
        </DialogHeader>
        <div className="flex justify-end space-x-2 mb-4">
          <Button variant="outline" size="sm" className="flex items-center">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button variant="destructive" size="sm" className="flex items-center">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
        <ScrollArea className="max-h-[80vh] pr-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage
                    src={teacher.imageUrl}
                    alt={`${teacher.firstName} ${teacher.lastName}`}
                  />
                  <AvatarFallback>
                    {teacher.firstName[0]}
                    {teacher.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">
                    {teacher.title} {teacher.firstName} {teacher.lastName}
                  </h2>
                  <p className="text-muted-foreground">{teacher.designation}</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem
                  icon={<Mail className="w-4 h-4" />}
                  label="Email"
                  value={teacher.email}
                />
                <InfoItem
                  icon={<Phone className="w-4 h-4" />}
                  label="Phone"
                  value={teacher.phone}
                />
                <InfoItem
                  icon={<Phone className="w-4 h-4" />}
                  label="WhatsApp"
                  value={teacher.whatsappNo}
                />
                <InfoItem
                  icon={<User className="w-4 h-4" />}
                  label="Gender"
                  value={teacher.gender}
                />
                <InfoItem
                  icon={<Calendar className="w-4 h-4" />}
                  label="Date of Birth"
                  value={format(new Date(teacher.dateOfBirth), "PPP")}
                />
                <InfoItem
                  icon={<Flag className="w-4 h-4" />}
                  label="Nationality"
                  value={teacher.nationality}
                />
                <InfoItem
                  icon={<User className="w-4 h-4" />}
                  label="National ID"
                  value={teacher.NIN}
                />
                <InfoItem
                  icon={<Mail className="w-4 h-4" />}
                  label="Preferred Contact"
                  value={teacher.contactMethod}
                />
              </div>
              <InfoItem
                icon={<MapPin className="w-4 h-4" />}
                label="Address"
                value={teacher.address}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem
                  icon={<Briefcase className="w-4 h-4" />}
                  label="Employee ID"
                  value={teacher.employeeId}
                />
                <InfoItem
                  icon={<Calendar className="w-4 h-4" />}
                  label="Date of Joining"
                  value={format(new Date(teacher.dateOfJoining), "PPP")}
                />
                <InfoItem
                  icon={<Briefcase className="w-4 h-4" />}
                  label="Department"
                  value={teacher.departmentName}
                />
                <InfoItem
                  icon={<User className="w-4 h-4" />}
                  label="Status"
                  value={teacher.isActive ? "Active" : "Inactive"}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem
                  icon={<GraduationCap className="w-4 h-4" />}
                  label="Qualification"
                  value={teacher.qualification}
                />
                <InfoItem
                  icon={<Clock className="w-4 h-4" />}
                  label="Experience"
                  value={`${teacher.experience} years`}
                />
                <InfoItem
                  icon={<Book className="w-4 h-4" />}
                  label="Main Subject"
                  value={teacher.mainSubject}
                />
              </div>
              {/* <div>
                <h3 className="text-sm font-medium mb-2">Subjects Taught</h3>
                <div className="flex flex-wrap gap-2">
                  {teacher.subjects.map((subject, index) => (
                    <Badge key={index} variant="secondary">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div> */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <InfoItem
                  icon={<Clock className="w-4 h-4" />}
                  label="Created At"
                  value={format(new Date(teacher.createdAt), "PPP")}
                />
                <InfoItem
                  icon={<Clock className="w-4 h-4" />}
                  label="Updated At"
                  value={format(new Date(teacher.updatedAt), "PPP")}
                />
              </div>
            </CardContent>
          </Card>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
    </div>
  );
}
