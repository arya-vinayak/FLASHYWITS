"use client"
import { sign } from "crypto"
import Link from "next/link"
import signupAnime from "@/public/lotties/signup.json"
import Lottie from "lottie-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const Anime = () => {
  return (
    <>
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Login
      </Link>
      <div className="relative hidden h-full flex-col bg-background p-10 text-white dark:border-r lg:flex">

        <div className="relative z-20 mt-auto">
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 col-span-4 flex items-center justify-center">
            <Lottie
              animationData={signupAnime}
              style={{ height: 600, width: 600 }}
              loop={true}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Anime
