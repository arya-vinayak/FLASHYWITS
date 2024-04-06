"use client";

import { cookies, headers } from "next/headers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/user";



// import { createClient } from "@/utils/supabase/server"

import { Button } from "@/components/ui/button";
import Anime from "@/components/Anime";
import LogInForm from "@/components/LogInForm"




export default function Login({
  searchParams,
}: {
  searchParams: { message: string }
}) {

  const router = useRouter()
  const login = useAuthStore((state) => state.login)


   const signIn =  (formData: FormData) => {

    console.log("Sign in")

  // Perform client-side login logic
   login(formData.get("email") as string, formData.get("password") as string)

    router.push("/dashboard")
}

 const signUp = async (formData: FormData) => {
  // Perform client-side sign up logic
  console.log("Sign up on client")
}

 const googleSignIn = async () => {
  // Perform client-side Google sign-in logic
  console.log("Google Sign in on client")
}



  return (
    <>
      <div className="container relative flex-col items-center justify-center h-screen md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Anime />
        {/* first grid */}

        <div className="p-6 m-3 flex flex-col items-center justify-center">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
               Account Login
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter the required details to login to your account
              </p>
            </div>
            <LogInForm
              signIn={signIn}
              googleSignIn={googleSignIn}
              message={searchParams?.message}
              text="Login"
            />
          </div>
        </div>
        {/* second grid */}
        <div className="absolute top-4 right-4 md:right-8 md:top-8">
          <Link href="/register">
            <Button>Register</Button>
          </Link>
        </div>
      </div>
    </>
  )
}