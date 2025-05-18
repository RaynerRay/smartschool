import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
 
  Grid2X2,
} from "lucide-react";
import { Student } from "@/types/types";
import Image from "next/image";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getNormalDate } from "@/lib/getNormalDate";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
interface StudentInfoModalProps {
  student: Student;
}

export function StudentInfoModal({ student }: StudentInfoModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  // const handleEdit = () => {
  //   // onEdit(student)
  //   setIsOpen(false);
  // };

  // const handleDelete = () => {
  //   // onDelete(student)
  //   setIsOpen(false);
  // };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button size={"icon"} variant="outline">
                <Grid2X2 />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Quick View</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-center">Student Quick View</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 rounded-full border-4 border-orange-400" />
            <Image
              src={student.imageUrl}
              alt={student.name}
              width={128}
              height={128}
              className="rounded-2xl object-cover"
            />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold">Danielle Solomon</h2>
            <p className="text-muted-foreground capitalize">
              {student.gender.toLowerCase()} / Student
            </p>
          </div>
          <Table className="border">
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Register No</TableCell>
                <TableCell>{student.regNo}</TableCell>
                <TableCell className="font-medium">Roll</TableCell>
                <TableCell>{student.rollNo}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Admission Date</TableCell>
                <TableCell>{getNormalDate(student.createdAt)}</TableCell>
                <TableCell className="font-medium">Date Of Birth</TableCell>
                <TableCell>{getNormalDate(student.dob)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Email</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell className="font-medium">Religion</TableCell>
                <TableCell>{student.religion}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">Mobile No</TableCell>
                <TableCell>{student.phone}</TableCell>
                <TableCell className="font-medium">State</TableCell>
                <TableCell>{student.state}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Address</TableCell>
                <TableCell colSpan={3}>{student.address}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
