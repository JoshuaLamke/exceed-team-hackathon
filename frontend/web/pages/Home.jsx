import { useEffect, useState } from "react"
import logo from "/logo.png"
import { ArrowUpRight } from "@phosphor-icons/react"
import "./Home.css"

function App() {
  const [backendRunning, setBackendRunning] = useState(false)
  useEffect(
    () => async () => {
      const resp = await fetch("/api/healthcheck")
      setBackendRunning((await resp.json()).success === true)
    },
    []
  )
  return (
    <section className="hero">
      
    </section>
  )
}

export default App
