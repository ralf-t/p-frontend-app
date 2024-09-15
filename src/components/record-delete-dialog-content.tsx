import {
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { MouseEventHandler } from "react"

type RecordDeleteDialogContentProps = {
    handleOnClick: MouseEventHandler<HTMLButtonElement>,
}
// record : RecordUpdateDialogProps
export default function RecordDeleteDialogContent({ handleOnClick }: RecordDeleteDialogContentProps) {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Are you sure that you want to delete this record?</DialogTitle>
            </DialogHeader>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="default" onClick={handleOnClick}>
                        Confirm delete
                    </Button>
                </DialogClose>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">
                        Close
                    </Button>
                </DialogClose>

            </DialogFooter>
        </DialogContent>
    )
}