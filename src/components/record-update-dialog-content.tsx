import {
    DialogContent,
    DialogClose,
    DialogHeader,
    DialogFooter,
    DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { z } from "zod";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import RecordsApi from '@/api/records';
import { RecordWrite } from "@/types";

type RecordUpdateDialogProps = {
    id: string,
    record: RecordWrite,
    handleConfirmChanges: Function
}
// record : RecordUpdateDialogProps
export default function RecordUpdateDialogContent({ id, record, handleConfirmChanges }: RecordUpdateDialogProps) {
    const { toast } = useToast();
    
    const FormSchema = z.object({
        name: z.string().min(1).max(255),
        location: z.string().min(1).max(255),
        depth: z.coerce.number({
            invalid_type_error: "Enter a valid number"
        }).min(0),
        duration: z.coerce.number({
            invalid_type_error: "Enter a valid number"
        }).min(0).nonnegative(),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: record.name,
            location: record.location,
            depth: record.depth,
            duration: record.duration,
        }
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        RecordsApi.update(id, data)
        .then(response => {
            handleConfirmChanges(id, response)
            toast({
                variant: "success",
                title: "Updated a record."
            })
        })
        .catch(() => {
            toast({
                variant: "destructive",
                title: "An error has occurred while updating record."
            })
        });
    }

    return (
        <DialogContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Update record</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-6">
                        <FormField 
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Freediver name</FormLabel>
                                    <FormControl>
                                        <Input placeholder={record.name} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                        <Input placeholder={record.location} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="depth"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Depth (meters)</FormLabel>
                                    <FormControl>
                                        <Input placeholder={String(record.depth)} type="number" min={0} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="duration"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Duration (seconds)</FormLabel>
                                    <FormControl>
                                        <Input placeholder={String(record.duration)} type="number" min={0} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" variant="default">
                            Confirm changes
                        </Button>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Discard changes
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    )
}