"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/user";



import { Button, buttonVariants } from "@/components/ui/button";
import Anime from "@/components/Anime";



import { SignupForm } from "../../components/SignUpForm";


export default function AuthenticationPage() {

  const router = useRouter()



  const register = useAuthStore((state) => state.register)

  const signUp = (formData: FormData) => {
    console.log("Sign Up")
    console.log(formData.get("email"))
    console.log(formData)

    register(formData.get("name") as string, formData.get("username") as string, formData.get("email") as string, formData.get("role") as string, formData.get("password") as string)


    router.push("/dashboard")



  
    
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
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter the required details to create your account
              </p>
            </div>
            <SignupForm signUp={signUp} />
          </div>
        </div>
        {/* second grid */}
        <div className="absolute top-4 right-4 md:right-8 md:top-8">
          <Link href="/login">
            <Button>Log In</Button>
          </Link>
        </div>
      </div>
    </>
  )
}