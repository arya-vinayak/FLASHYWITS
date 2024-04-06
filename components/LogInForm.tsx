"use client"

import { FC } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle, Mail } from "lucide-react"
import { useForm } from "react-hook-form"
import { FcGoogle } from "react-icons/fc"
import * as z from "zod"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
})

type Props = {
  text: string
  signIn: (data: FormData) => void
  googleSignIn: () => Promise<void>
  message?: string
}

const LogInForm = ({ text, signIn, googleSignIn, message }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  return (
    <div className="w-full">
      <Form {...form}>
        {/* {message && (
          <div className="mb-2">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          </div>
        )} */}
        <form action={signIn} className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email ID</FormLabel>
                <FormControl>
                  <Input placeholder="user@gmail.com" {...field} />
                </FormControl>
                {/* <FormDescription>
                Enter your email address
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                {/* <FormDescription>
                Enter your password
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="text-md">
            <Mail className="mr-2 h-4 w-4" /> {text}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default LogInForm
