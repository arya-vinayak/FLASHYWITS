"use client"

import Link from "next/link"
import useAuthStore from "@/store/user"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const { user, token } = useAuthStore()
  const router = useRouter()

  const handleLogout = () => {
    useAuthStore.getState().logout()
    router.push("/")
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {user !== null ? <p>User: {user}</p> : <p>User not logged in</p>}
      {token !== null ? <p>Token: {token}</p> : <p>No token available</p>}
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}
