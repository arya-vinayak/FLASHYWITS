"use client";

import React, { useEffect, useState } from "react";



import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";





export default function ContractCards() {


  type flashCard = {
    "question": string,
    "correct_answer": string,
    "_id": string
  }
  // const [contracts, setContracts] = useState<Contract[]>([])
  const [flashcards, setFlashcards] = useState<flashCard[]>([])

  // const contracts = [
  //   {
  //     question: "What are mutexs?",
  //     answer:
  //       "Mutexs are used to protect shared resources from being accessed by multiple threads at the same time.Mutexs are used to protect shared resources from being accessed by multiple threads at the same time.",
  //   },
  //   {
  //     question: "What is a semaphore?",
  //     answer:
  //       "A semaphore is a variable or abstract data type used to control access to a common resource by multiple processes in a concurrent system such as a multitasking operating system.",
  //   },
  //   {
  //     question: "What is a deadlock?",
  //     answer:
  //       "In concurrent programming, a deadlock is a state in which each member of a group of actions, is waiting for some other member to release a lock.",
  //   },
  //   {
  //     question: "What is virtual memory?",
  //     answer:
  //       "Virtual memory is a memory management technique that allows an operating system to use secondary storage as if it were the main memory. It enables programs to execute as if they were loaded entirely in the main memory, even if the physical memory is insufficient.",
  //   },
  //   {
  //     question: "What is a file system?",
  //     answer:
  //       "A file system is a method and data structure used by an operating system to organize and store files on a storage device. It provides a way to access, manage, and manipulate files and directories.",
  //   },
  //   {
  //     question: "What is process scheduling?",
  //     answer:
  //       "Process scheduling is an essential part of an operating system that determines the order in which processes are executed on a computer system. It involves allocating system resources to processes and deciding which process to run next.",
  //   },
  //   {
  //     question: "What is a context switch?",
  //     answer:
  //       "A context switch is the process of saving the current state of a process or thread and restoring the saved state of another process or thread. It allows multiple processes or threads to share a single CPU by quickly switching between them.",
  //   },
  //   {
  //     question:
  //       "What is a page fault? Why does it occur? When does it occur? How is it handled? ",
  //     answer:
  //       "A page fault occurs when a program tries to access a page of memory that is currently not in the main memory. The operating system then needs to retrieve the required page from secondary storage, such as a hard disk, and load it into the main memory.",
  //   },
  //   {
  //     question: "What is a file descriptor?",
  //     answer:
  //       "A file descriptor is a unique identifier that the operating system uses to represent an open file. It is an index into a table of open files maintained by the operating system.A file descriptor is a unique identifier that the operating system uses to represent an open file. It is an index into a table of open files maintained by the operating system.A file descriptor is a unique identifier that the operating system uses to represent an open file. It is an index into a table of open files maintained by the operating system.A file descriptor is a unique identifier that the operating system uses to represent an open file. It is an index into a table of open files maintained by the operating system.A file descriptor is a unique identifier that the operating system uses to represent an open file. It is an index into a table of open files maintained by the operating system.A file descriptor is a unique identifier that the operating system uses to represent an open file. It is an index into a table of open files maintained by the operating system.A file descriptor is a unique identifier that the operating system uses to represent an open file. It is an index into a table of open files maintained by the operating system.A file descriptor is a unique identifier that the operating system uses to represent an open file. It is an index into a table of open files maintained by the operating system.",
  //   },
  // ]


  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await fetch(
          "https://684c-1-6-74-117.ngrok-free.app/flashCards",
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
        const filteredData = data.map(({ correct_answer, question ,_id}) => ({
          correct_answer,
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
                      <p>{contract.correct_answer}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between"></CardFooter>
                  </Card>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="my-2">
                    Upload Answer
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[700px] max-h-auto w-auto h-auto">
                  <Card className={`w-full m-5 sm:w-[90%]`}>
                    <CardHeader>
                      <CardTitle>Answer</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>{contract.correct_answer}</p>
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