// "use client"

// import { FC } from "react"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { AlertCircle, Mail } from "lucide-react"
// import { useForm } from "react-hook-form"
// import { FcGoogle } from "react-icons/fc"
// import * as z from "zod"

// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// import { Button } from "@/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"

// const formSchema = z.object({
//  answer: z
//     .string()
// })

// type Props = {
//   text: string
//   signIn: (data: FormData) => void
//   googleSignIn: () => Promise<void>
//   message?: string
// }

// const LogInForm = ({ id, signIn, googleSignIn, message }: Props) => {
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       answer: ""
//     },
//   })
//   return (
//     <div className="w-full">
//       <Form {...form}>
//         {/* {message && (
//           <div className="mb-2">
//             <Alert variant="destructive">
//               <AlertCircle className="h-4 w-4" />
//               <AlertTitle>Error</AlertTitle>
//               <AlertDescription>{message}</AlertDescription>
//             </Alert>
//           </div>
//         )} */}
//         <form action={signIn} className="flex flex-col gap-5">
//           <FormField
//             control={form.control}
//             name="answer"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Your Answer</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Your Answer...." {...field} />
//                 </FormControl>
//                 {/* <FormDescription>
//                 Enter your email address
//               </FormDescription> */}
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <Button type="submit" className="text-md">
//             <Mail className="mr-2 h-4 w-4" /> {text}
//           </Button>
//         </form>
//       </Form>
//     </div>
//   )
// }

// export default LogInForm
