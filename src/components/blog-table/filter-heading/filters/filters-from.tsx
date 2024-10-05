"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import React from 'react'

import {
  Form,
} from "@/components/ui/form"


import CategoryDropdown from "./category-dropdown"


const formSchema = z.object({
    status: z.string().optional(),
    category: z.string().optional(),
    tagz: z.array(z.string()).optional(),
  })

const FiltersFrom = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            status: "",
            category: "",
            tagz: [],
        },
      })

      function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }

  return (
    <div
    className="py-5"
    >
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CategoryDropdown/>
      </form>
    </Form>
    </div>
  )
}

export default FiltersFrom
