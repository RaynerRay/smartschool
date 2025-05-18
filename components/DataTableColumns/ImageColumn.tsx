import Image from "next/image";
import React from "react";

export default function ImageColumn({
  row,
  accessorKey,
}: {
  row: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  accessorKey: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}) {
  const imageUrl = row.getValue(`${accessorKey}`);
  // const thum = row.getValue(`${accessorKey}`);
  // console.log(imageUrl);
  return (
    <div className="shrink-0">
      <Image
        alt={`${accessorKey}`}
        className="aspect-square rounded-md object-cover"
        height="50"
        src={imageUrl ?? ""}
        width="50"
      />
    </div>
  );
}
