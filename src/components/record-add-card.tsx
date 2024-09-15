import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
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

type RecordAddCardProps = {
    addNewRecord: Function
}

export default function RecordAddCard({ addNewRecord } : RecordAddCardProps) {
    const { toast } = useToast();
    
    const FormSchema = z.object({
        name: z.string().min(1).max(255),
        location: z.string().min(1).max(255),
        depth: z.coerce.number({
            invalid_type_error: "Enter a valid number"
        }).min(0),
        duration: z.coerce.number({
            invalid_type_error: "Enter a valid number"
        }).min(0),
    })
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        RecordsApi.createRecord(data)
        .then(response => {
            addNewRecord(response);
            toast({
                variant: "success",
                title: "Created a new record."
            })
        })
        .catch(() => {
            toast({
                variant: "destructive",
                title: "An error has occurred while creating record."
            })
        });
    }

    return (
        <Card>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardHeader>
                        <CardTitle>Create new record</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormField 
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Freediver name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
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
                                        <Input {...field} />
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
                                        <Input type="number" min={0} {...field} />
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
                                        <Input type="number" min={0} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" type="submit">Submit</Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}