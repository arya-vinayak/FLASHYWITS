
import { useRouter } from "next/navigation";
import { create } from "zustand";





type AuthStore = {
  user: string | null
  token: string | null
  login: (username: string, password: string) => void
  logout: () => void
  register: (name: string, userName: string, userEmail: string, userRole: string, userPassword: string) => void
}

const useAuthStore = create<AuthStore>((set) => {
  // const router = useRouter()
  const initialUser =
    typeof localStorage !== "undefined" ? localStorage.getItem("user") : null
  const initialToken =
    typeof localStorage !== "undefined" ? localStorage.getItem("token") : null

  return {
    user: initialUser || null, // Use the string value directly
    token: initialToken || null, // Use the string value directly
    login: async (username, password) => {
      try {
        const credentials = btoa(`${username}:${password}`) // Encode username and password in base64
        const response = await fetch("http://localhost:8080/sign-in", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${credentials}`, // Include basic auth credentials in Authorization header
          },
          credentials: "include", // Include authentication headers (cookies, etc.)
        })

        console.log(response.status) // Log the response status

        if (!response.ok) {
          throw new Error("Network response was not ok")
        }

        // Resolves the promise with an object that contains the response to the request
        const data = await response.json() // Read the response body as JSON

        if (data.error) {
          throw new Error(data.error)
        } else {
          localStorage.setItem("token", data.access_token)
          localStorage.setItem("user", data.user_name) // Store the string value directly
          console.log("Data:", data) // Log the response data
          set({ user: data.user_name, token: data.access_token }) // Store the string value directly
        }
      } catch (error) {
        console.error("Error logging in:", error.message)
      }
    },
    logout: () => {
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      set({ user: null, token: null })
      // router.push("/login")ẇ
    },
    register: async (name, userName, userEmail, userRole, userPassword) => {
      try {
        const credentials = btoa(`${userName}:${userPassword}`) // Encode username and password in base64

        const response = await fetch("http://localhost:8080/sign-up", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${credentials}`, // Include basic auth credentials in Authorization header
          },
          credentials: "include", // Include authentication headers (cookies, etc.)
          body: JSON.stringify({
            name,
            userName,
            userEmail,
            userRole,
            userPassword,
          }),
        })

        console.log(response.status) // Log the response status

        if (!response.ok) {
          throw new Error("Network response was not ok")
        }

        // Resolves the promise with an object that contains the response to the request
        const data = await response.json() // Read the response body as JSON

        if (data.error) {
          throw new Error(data.error)
        } else {
          localStorage.setItem("token", data.access_token)
          localStorage.setItem("user", data.user_name) // Store the string value directly
          console.log("Data:", data) // Log the response data
          set({ user: data.user_name, token: data.access_token }) // Store the string value directly
        }
      } catch (error) {
        console.error("Error signing up:", error.message)
      }
    }
  }
})

export default useAuthStore