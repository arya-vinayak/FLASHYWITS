"use client";

import * as React from "react";
import { useEffect, useState } from "react";



import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";





export default function SelectDemo() {
  const [documents, setDocuments] = useState([])
  const [selectedDoc, setSelectedDoc] = useState("")
  const [link, setLink] = useState("")

  type docType = {
    name: string
    _id: string
    link: string
  }

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const response = await fetch(
          "https://684c-1-6-74-117.ngrok-free.app/pdfs",
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
        setDocuments(data)
      } catch (error) {
        console.error("Error fetching documents:", error)
      }
    }
    fetchDocs()
  }, [])

  const handleSelectChange = (value: string) => {
    console.log("Selected document:", value)
    setSelectedDoc(value)
    setLink(documents.find((doc: docType) => doc.name === value)?.link)
    console.log("Link:", link)
  }

  return (
    <>
    <Select value={selectedDoc} onValueChange={handleSelectChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a document" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Documents</SelectLabel>
          {documents.map((doc: docType) => (
            <SelectItem key={doc._id} value={doc.name}>
              {doc.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
    <div className="w-screen h-screen flex justify-left items-center ">
      {link && (
        <iframe
          loading="lazy"
          className="w-full h-full max-w-screen-md max-h-screen-md"
          src={link}
          allow="autoplay"
          style={{ aspectRatio: "16 / 9" }} // Maintain aspect ratio of 16:9
        ></iframe>
      )}
    </div>
    </>

  )
}