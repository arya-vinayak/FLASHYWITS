import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";



import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";





const formSchema = z.object({
  answer: z.string(),
})

type Props = {
  text: string
  _id: string
}

const FlashAnswer: FC<Props> = ({ text, _id }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      answer: "",
    },
  })

  const { register } = form

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const { answer } = data
    const res = {
        answer: answer,
        flashCard_id: _id,
        user_id:"66118d5253d1ebfb1464b5e4"
    }
    console.log(res)

    const response = await fetch("https://93e5-1-6-74-117.ngrok-free.app/flashCards", {
      method: "POST",
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(res),
    })

    if (response.status === 200) {
      console.log("Success")
    } else {
      console.log("Failed")
    }

  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Textarea placeholder="Type your message here." {...register("answer")} className="max-w-[700px] max-h-auto w-auto h-auto" />
      <Button type="submit" className="mt-4">Send message</Button>
    </form>
  )
}

export default FlashAnswer