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
} from "lucide-react";
import { Parent } from "@/types/types";

interface ParentInfoModalProps {
  parent: Parent;
}

export function ParentInfoModal({ parent }: ParentInfoModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">View Parent Info</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Parent Information</DialogTitle>
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
                    src={parent.imageUrl}
                    alt={`${parent.firstName} ${parent.lastName}`}
                  />
                  <AvatarFallback>
                    {parent.firstName[0]}
                    {parent.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">
                    {parent.title} {parent.firstName} {parent.lastName}
                  </h2>
                  <p className="text-muted-foreground">{parent.relationship}</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem
                  icon={<Mail className="w-4 h-4" />}
                  label="Email"
                  value={parent.email}
                />
                <InfoItem
                  icon={<Phone className="w-4 h-4" />}
                  label="Phone"
                  value={parent.phone}
                />
                <InfoItem
                  icon={<Phone className="w-4 h-4" />}
                  label="WhatsApp"
                  value={parent.whatsapNo}
                />
                <InfoItem
                  icon={<User className="w-4 h-4" />}
                  label="Gender"
                  value={parent.gender}
                />
                <InfoItem
                  icon={<Calendar className="w-4 h-4" />}
                  label="Date of Birth"
                  value={format(new Date(parent.dob), "PPP")}
                />
                <InfoItem
                  icon={<Flag className="w-4 h-4" />}
                  label="Nationality"
                  value={parent.nationality}
                />
                <InfoItem
                  icon={<User className="w-4 h-4" />}
                  label="National ID/Passport"
                  value={parent.NIN}
                />
                <InfoItem
                  icon={<Mail className="w-4 h-4" />}
                  label="Preferred Contact"
                  value={parent.contactMethod}
                />
                <InfoItem
                  icon={<Briefcase className="w-4 h-4" />}
                  label="Occupation"
                  value={parent.occupation}
                />
              </div>
              <InfoItem
                icon={<MapPin className="w-4 h-4" />}
                label="Address"
                value={parent.address}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <InfoItem
                  icon={<Clock className="w-4 h-4" />}
                  label="Created At"
                  value={format(new Date(parent.createdAt), "PPP")}
                />
                <InfoItem
                  icon={<Clock className="w-4 h-4" />}
                  label="Updated At"
                  value={format(new Date(parent.updatedAt), "PPP")}
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
