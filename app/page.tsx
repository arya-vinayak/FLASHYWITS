"use client";
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import Lottie from 'lottie-react'
import login from '@/public/lotties/login.json'
import AddFiles from "@/components/pdfCard";



export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
           A Personalised Flashcard Learning System for Students<br className="hidden sm:inline" />
        
        </h1>
        
      </div>
      <div className="flex gap-4">
        <Link
          href={siteConfig.links.docs}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants()}
        >
          Documentation
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.github}
          className={buttonVariants({ variant: "outline" })}
        >
          GitHub
        </Link>
      </div>
      <div className="relative z-20 mt-auto ">
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 col-span-4 flex items-center justify-center grid-cols-2 gap-50">
            <Lottie
              animationData={login}
              style={{ height: 600, width: 600 }}
              loop={true}
            />
            <AddFiles/>
          </div>
        </div>
    </section>
  )
}
