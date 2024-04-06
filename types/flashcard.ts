import { z } from "zod"

export const CSchema = z.object({
  question: z.string(),
  answer: z.string(),
})

export type flashCard = z.infer<typeof CSchema>
