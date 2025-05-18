"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { Fee } from "@/actions/school-fees";
import useSchoolStore from "@/store/school";
import { generatePRN } from "@/lib/generatePRN";
import { createPayment } from "@/actions/payments";
type Detail = {
  periodId: string;
  studentProfileId: string;
  studentUserId: string;
  studentName: string;
  parentProfileId: string;
  parentUserId: string;
  parentName: string;
  schoolFeeTitle: string;
  term: string;
  className: string;
  year: number;
};
type PaymentModalProps = {
  fees: Fee[];
  selectedTerm: { label: string };
  details: Detail;
};

export function PaymentModal({
  fees,
  selectedTerm,
  details,
}: PaymentModalProps) {
  const [selectedFees, setSelectedFees] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const { school } = useSchoolStore();
  const [success, setSuccess] = useState(false);
  const [generatedPRN, setGeneratedPRN] = useState("");
  useEffect(() => {
    const newTotal = fees
      .filter((fee) => selectedFees.includes(fee.id))
      .reduce((acc, fee) => acc + fee.amount, 0);
    setTotal(newTotal);
  }, [selectedFees, fees]);

  const handleCheckboxChange = (id: string) => {
    setSelectedFees((prev) =>
      prev.includes(id) ? prev.filter((id) => id !== id) : [...prev, id]
    );
  };

  const handlePay = async () => {
    setLoading(true);
    const selectedFeeDetails = fees.filter((fee) =>
      selectedFees.includes(fee.id)
    );
    const data = {
      schoolName: school?.name ?? "",
      schoolId: school?.id ?? "",
      schoolFeeId: selectedFeeDetails[0].schoolFeeId,
      paidFeeAmount: total,
      paidFees: selectedFeeDetails.map(
        (item) => `${item.title}*${item.amount}*${item.id}`
      ),
      PRN: generatePRN({
        schoolId: school?.id ?? "",
        studentId: details.studentProfileId,
        feeId: selectedFeeDetails[0].schoolFeeId,
        year: details.year,
        term: details.term.split(" ")[1].split("-")[0],
      }),
      ...details,
    };
    try {
      const res = await createPayment(data);
      console.log(res);
      setSuccess(true);
      setGeneratedPRN(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Pay Fees
        </Button>
      </DialogTrigger>
      {success ? (
        <DialogContent className="sm:max-w-[425px] md:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Payment Successful</DialogTitle>
            <DialogDescription>
              Take the PRN to your BanK to complete the payment
            </DialogDescription>
          </DialogHeader>
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                PRN : {generatedPRN}
              </CardTitle>
            </CardHeader>

            <CardFooter className="flex justify-end space-x-2">
              <Button>Print</Button>
            </CardFooter>
          </Card>
        </DialogContent>
      ) : (
        <DialogContent className="sm:max-w-[425px] md:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Payment Form</DialogTitle>
            <DialogDescription>
              Select the fees you want to pay for {selectedTerm.label}
            </DialogDescription>
          </DialogHeader>
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Pending Fees for {selectedTerm.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-sm font-medium text-gray-500"
                      >
                        Select
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-sm font-medium text-gray-500"
                      >
                        Fee Title
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-sm font-medium text-gray-500"
                      >
                        Amount
                      </th>
                    </tr>
                  </thead>
                  {fees && fees.length > 0 && (
                    <tbody className="bg-white divide-y divide-gray-200">
                      {fees.map((fee) => (
                        <tr key={fee.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Checkbox
                              id={fee.schoolFeeId}
                              checked={selectedFees.includes(fee.id)}
                              onCheckedChange={() =>
                                handleCheckboxChange(fee.id)
                              }
                            />
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            <label
                              htmlFor={fee.id}
                              className="ml-2 text-sm font-medium text-gray-900"
                            >
                              {fee.title}
                            </label>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 text-right">
                            ${fee.amount.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>
              <div className="mt-4 flex justify-end">
                <div className="bg-gray-50 px-6 py-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">
                    Total Amount
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    ${total.toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              {loading ? (
                <Button disabled>
                  <Loader2 className="animate-spin" />
                  Processing Please wait
                </Button>
              ) : (
                <>
                  <DialogTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogTrigger>
                  <Button onClick={handlePay}>Pay Now</Button>
                </>
              )}
            </CardFooter>
          </Card>
        </DialogContent>
      )}
    </Dialog>
  );
}
