import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Dispatch, SetStateAction } from "react"
import { Records } from "@/types"
import RecordsApi from '@/api/records';


import { z } from "zod";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import { Form, FormField, FormItem, FormControl } from "./ui/form"
import { useToast } from "@/hooks/use-toast"

type FreediverSearchProps = {
    names: string[] | [];
    setRecords: Dispatch<SetStateAction<Records>>
}

export function FreediverSearch({names, setRecords} : FreediverSearchProps) {
    const { toast } = useToast();
    const FormSchema = z.object({
        name: z.string().nullable().optional()
    })
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: null,
        }
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        if (data.name === "all" || data.name === null || data.name === undefined) {
            RecordsApi.getRecords()
            .then(response => {
                setRecords(response)
                toast({
                    variant: "success",
                    title: "Displaying freediving records."
                })
            })
            .catch(() => {
                toast({
                    variant: "destructive",
                    title: "An error has occurred while fetching records."
                })
            });
        } else {
            RecordsApi.getRecordsByName(data.name)
            .then(response => {
                setRecords(response)
                toast({
                    variant: "success",
                    title: "Displaying freediving records."
                })
            })
            .catch(() => {
                toast({
                    variant: "destructive",
                    title: "An error has occurred while fetching records."
                })
            });
        }

    }
    return (
        <Card className="w-full">
            <CardContent className="pt-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-x-3 flex justify-between">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <Select onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Freediver name" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectGroup>
                                        <SelectItem value="all">Select all</SelectItem>
                                        {
                                            names && names.map(name => <SelectItem key={'freediverNamesSelect-' + name } value={name}>{name}</SelectItem>)
                                        }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Search</Button>
                </form>
            </Form>
            </CardContent>
        </Card>
    )
}