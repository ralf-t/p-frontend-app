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
    setRecords: Dispatch<SetStateAction<Records>>
}

export function SpecialSortButton({ setRecords } : FreediverSearchProps) {
    const { toast } = useToast();
    const FormSchema = z.object({
        sort: z.string()
    })
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        if (data.sort === 'depth') {
            RecordsApi.getDeepestDivesByLocation()
            .then(response => {
                setRecords(response)
                toast({
                    variant: "success",
                    title: "Displaying deepest freediving records by location."
                })
            })
            .catch(() => {
                toast({
                    variant: "destructive",
                    title: "An error has occurred while fetching records."
                })
            });
        } else if (data.sort === 'duration') {
            RecordsApi.getLongestDivesByLocation()
            .then(response => {
                setRecords(response)
                toast({
                    variant: "success",
                    title: "Displaying deepest freediving records by location."
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
                        name="sort"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <Select onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Special sorting" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="depth">Deepest dives by location</SelectItem>
                                            <SelectItem value="duration">Longest dives by location</SelectItem>
                                        
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Sort</Button>
                </form>
            </Form>
            </CardContent>
        </Card>
    )
}