"use client"

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Resident = {
  id: string;
  name: string;
  idNumber: string;
  dateOfBirth: string;
  gender: string;
  relationship: string;
  residencyRecordNumber: string;
  permanentAddress: string;
  fatherName: string;
  fatherIdNumber: string;
  fatherPhone: string;
  motherName: string;
  motherIdNumber: string;
  motherPhone: string;
};

export const columns: ColumnDef<Resident>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    }
  },
  {
    accessorKey: "idNumber",
    header: "Số Căn Cước",
  },
  {
    accessorKey: "dateOfBirth",
    header: "Ngày Sinh",
    cell: ({ row }) => {
      const date = new Date(row.getValue('dateOfBirth'))
      const formatted = date.toLocaleDateString()
      return <div className='font-medium'>{formatted}</div>
    }
  },
  {
    accessorKey: "gender",
    header: "Giới Tính",
  },
  {
    accessorKey: "relationship",
    header: "Mối Quan Hệ",
  }, {
    accessorKey: "residencyRecordNumber",
    header: "Số Hộ tịch",
  },
  {
    accessorKey: "permanentAddress",
    header: "Nơi Thường Trú",
  },
  {
    accessorKey: "fatherName",
    header: "Tên Bố",
  },
  {
    accessorKey: "fatherIdNumber",
    header: "Số Căn Cước Bố",
  },
  {
    accessorKey: "fatherPhone",
    header: "Số Điện Thoại Bố",
  },
  {
    accessorKey: "motherName",
    header: "Tên Mẹ",
  },
  {
    accessorKey: "motherIdNumber",
    header: "Số Căn Cước Mẹ",
  },
  {
    accessorKey: "motherPhone",
    header: "Số Điện Thoại Mẹ",
  },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => {
  //     const user = row.original

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant='ghost' className='h-8 w-8 p-0'>
  //             <span className='sr-only'>Open menu</span>
  //             <MoreHorizontal className='h-4 w-4' />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align='end'>
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(user.id)}
  //           >
  //             Copy user ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View customer</DropdownMenuItem>
  //           <DropdownMenuItem>View payment details</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     )
  //   }
  // },
]
  ;
