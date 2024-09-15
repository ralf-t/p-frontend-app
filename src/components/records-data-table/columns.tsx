import { ColumnDef } from "@tanstack/react-table"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"


import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "../ui/button"
import RecordUpdateDialogContent from "../record-update-dialog-content"
import { useState } from "react"
export type Records = {
    id: string,
    name: string,
    location: string,
    depth: number,
    duration: number,
    created_at: string
    
}

import RecordDeleteDialogContent from "../record-delete-dialog-content"
import RecordsApi from '@/api/records';
import { useToast } from "@/hooks/use-toast"
import { Record } from "@/types"

type rowAction = 'update' | 'delete';

export const columns = (
  updateRecordsData : Function, 
  removeRecord: Function
): ColumnDef<Records>[] => {
    return [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
    },
    {
        accessorKey: "location",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Location
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
    },
    {
        accessorKey: "depth",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Depth (meter)
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
    },
    {
        accessorKey: "duration",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Duration (seconds)
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
    },
    {
      accessorKey: "created_at",
      header: "Record date"
  },
    {
        id: "actions",
        cell: ({ row }) => {
            const {toast} = useToast();
            const record = row.original;
            const [selectedRowAction, setSelectedRowAction] = useState<rowAction|null>();

            const handleItemClick = (action: rowAction) => {
                setSelectedRowAction(action)
            };

            const handleConfirmDelete = (id: string) => {
              RecordsApi.deleteRecordById(id)
              .then(() => {
                removeRecord(id);
                toast({
                    variant: "success",
                    title: "Deleted a record."
                })
              })
              .catch(() => {
                toast({
                    variant: "destructive",
                    title: "An error has occurred while deleting record."
                })
              });
            };

            return (
                <Dialog>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DialogTrigger asChild>
                        <DropdownMenuItem onClick={() => handleItemClick('update')}>Update record</DropdownMenuItem>
                    </DialogTrigger>
                    <DropdownMenuSeparator />
                    <DialogTrigger asChild>
                        <DropdownMenuItem onClick={() => handleItemClick('delete')}>Delete record</DropdownMenuItem>
                    </DialogTrigger>
                    </DropdownMenuContent>
                </DropdownMenu>
                { selectedRowAction === 'update' && (
                        <RecordUpdateDialogContent id={record.id} record={record} handleConfirmChanges={(id:string, data: Record) => updateRecordsData(id, data)} />
                    )
                }
                { selectedRowAction === 'delete' && (
                        <RecordDeleteDialogContent handleOnClick={() => handleConfirmDelete(record.id)} />
                    )
                }
                
                </Dialog>
            )
        },
      },
]}