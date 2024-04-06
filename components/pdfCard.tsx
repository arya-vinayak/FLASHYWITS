import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Frown, UploadCloud, XCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";



import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";



import { Button } from "./ui/button";
import { Input } from "./ui/input";


const formSchema = z.object({
  files: z.array(
    z.object({
      name: z.string(),
      type: z.string().refine((value) => /\.(doc|docx|pdf)$/i.test(value), {
        message: "File must be a document or PDF",
      }),
    })
  ),
})

const AddFiles = () => {
  const [fileNames, setFileNames] = useState<string[]>([])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      files: [],
    },
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const names = Array.from(event.target.files).map((file) => file.name)
      setFileNames(names)
    }
  }

  const handleRemoveFile = (index: number) => {
    const updatedFileNames = fileNames.filter((_, i) => i !== index)
    setFileNames(updatedFileNames)
  }

  const onSubmit = async (formData: FormData) => {
    try {
      const response = await fetch(
        "https://capital-adder-mistakenly.ngrok-free.app/upload/",
        {
          method: "POST",
          body: formData,
        }
      )

      if (!response.ok) {
        // If response status is not OK, throw an error
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      console.log("Upload successful")
      console.table(formData.get("file"))
      // TODO: Handle successful upload response, if needed
    } catch (error:any) {
      // Log any errors that occur during the fetch request
      console.error("Error during upload:", error.message)
      // TODO: Handle error gracefully, e.g., display an error message to the user
    }
  }


  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>File Upload</CardTitle>
          <CardDescription>Upload study material here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="px-4 mb-8 bg-neutral-800/10 mx-2 py-2">
            {fileNames.length > 0 ? (
              fileNames.map((name, index) => (
                <li key={index} className="list-none flex items-center gap-2">
                  <FileText size={20} />
                  <p className="text-sm">{name}</p>
                  <button
                    type="button"
                    className="text-red-500 ml-auto"
                    onClick={() => handleRemoveFile(index)}
                  >
                    <XCircle size={20} />
                  </button>
                </li>
              ))
            ) : (
              <div className="text-center text-neutral-300 flex items-center justify-center gap-x-2">
                <Frown size={20} />
                <p className=" text-sm">No FIle Uploaded</p>
              </div>
            )}
          </div>
          <div className="mx-2 bg-neutral-900/10 px-4 py-6 rounded-md">
            <Form {...form}>
              <form
                action={onSubmit}
                className="flex flex-col items-center gap-y-6"
              >
                <div className="flex items-center gap-x-2">
                  <UploadCloud />
                  <p className="text-xs text-neutral-100">Upload Files</p>
                </div>
                <FormField
                  name="file"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-col items-center justify-center space-y-4 col-span-2">
                        <FormControl>
                          <Input
                            className="bg-neutral-900/20 border border-transparent disabled:opacity-50 disabled:cursor-not-allowed file:bg-transparent file:text-neutral-200 file:border-none file:outline-none file:text-xs placeholder:text-neutral-400 focus:outline-none hover:cursor-pointer text-xs font-light"
                            type="file"
                            accept="application/msword,text/plain,application/pdf"
                            multiple
                            {...field}
                            value={field.value ?? ""}
                            onChange={(event) => {
                              handleFileChange(event)
                              field.onChange(event)
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <Button size="sm" className="px-8 py-1 bg-[#1d78f2] text-white">
                  Add
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default AddFiles