"use client";

import React, { useEffect, useState } from "react";



import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import FlashAnswer from "@/components/FlashAnswers";





export default function ContractCards() {


  type flashCard = {
    "question": string,
    "correct_ans": string,
    "_id": string
  }
  // const [contracts, setContracts] = useState<Contract[]>([])
  const [flashcards, setFlashcards] = useState<flashCard[]>([])

  

  const signIn = async(formdata:FormData) => {

    try {
      // flashcards.find((flashcard) => {
      //   console.log(flashcard)
      //   console.log(flashcard._id)
      //   console.log(formdata.get("answer"))
      //   if(flashcard._id === formdata.get("id")){
      //     console.log("found")
      //   }
      // }
      const response = await fetch(
        "https://93e5-1-6-74-117.ngrok-free.app/flashCards",
        {
          method: "POST",
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
          body: formdata
        }
      )
      // console.log(await response.text())
      const data = await response.json()
      console.log(data)
      // setFlashcards(data)
  
    } catch (error) {
      console.error("Error fetching documents:", error)
    }


  
  }


  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await fetch(
          "https://7ac4-1-6-74-117.ngrok-free.app/flashCards",
          {
            method: "GET",
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          }
        )
        // console.log(await response.text())
        const data = await response.json()
        console.log(data)
        // setFlashcards(data)
        const filteredData = data.map(({ correct_ans, question ,_id}) => ({
          correct_ans,
          question,
          _id
        }))


        console.log(filteredData)
        setFlashcards(filteredData)
       

      } catch (error) {
        console.error("Error fetching documents:", error)
      }
    }
    fetchFlashcards()
  }, [])

  return (
    <>
      <div className="grid gap-4 max-md:grid-cols-2 lg:grid-cols-2 ">
        {flashcards.map((contract, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Question</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contract.question}</div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="my-2">
                    View Answer
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[700px] max-h-auto w-auto h-auto">
                  <Card className={`w-full m-5 sm:w-[90%]`}>
                    <CardHeader>
                      <CardTitle>Answer</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>{contract.correct_ans}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between"></CardFooter>
                  </Card>
                </DialogContent>
              </Dialog>
                <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="my-2 ml-2">
                    Upload Answer
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[700px] max-h-auto w-auto h-auto">
                  <Card className={`w-full m-5 sm:w-[90%]`}>
                    <CardHeader>
                      <CardTitle>Provide Your Answer</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FlashAnswer text={`Upload`} _id = {contract._id}  />
                    </CardContent>
                    <CardFooter className="flex justify-between"></CardFooter>
                  </Card>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}