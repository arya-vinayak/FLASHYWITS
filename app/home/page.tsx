"use client";

import { useEffect } from "react";
import { ChainlitAPI, sessionState, useChatData, useChatSession } from "@chainlit/react-client";
import axios from "axios";
import { useRecoilValue } from "recoil"

import { Playground } from "@/components/playground"





const CHAINLIT_SERVER = "https://capital-adder-mistakenly.ngrok-free.app/"
const userEnv = {}

const apiClient = new ChainlitAPI(CHAINLIT_SERVER, "app")

function App() {
  const { connect } = useChatSession()
  const session = useRecoilValue(sessionState)
  useEffect(() => {
    if (session?.socket.connected) {
      return
    }
    fetch(apiClient.buildEndpoint("/custom-auth"), {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        connect({
          client: apiClient,
          userEnv,
          accessToken: `Bearer: ${data.token}`,
        })
      })

    // let config = {
    //   method: "get",
    //   maxBodyLength: Infinity,
    //   url: "https://capital-adder-mistakenly.ngrok-free.app/custom-auth",
    //   headers: { "ngrok-skip-browser-warning": "true" },
    // }

    // axios
    //   .request(config)
    //   .then((response) => {
    //     console.log(JSON.stringify(response.data))
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
  }, [connect])

  return (
    <>
      <div>
        <Playground />
      </div>
    </>
  )
}

export default App