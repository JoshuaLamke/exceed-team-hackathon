import { useEffect, useState } from "react"
import logo from "/logo.png"
import { ArrowUpRight } from "@phosphor-icons/react"
import "./Home.css"

function App() {
  const [apiRunning, setApiRunning] = useState(false)
  useEffect(
    () => async () => {
      const response = await fetch("/api/healthcheck")
      setApiRunning(response.status === 200)
    },
    []
  )
  return (
    <section className="hero">
      <div className={`status-bubble ${apiRunning ? "online" : "offline"}`}>
        <p>• Local API status: {apiRunning ? "online" : "offline"}</p>
      </div>
      <img src={logo} width={300} height={136} />
      <h1>Welcome to the Dev Technology 2023 Hackathon!</h1>
      <p>
        This page is a placeholder. Get started by editing{" "}
        <code>web/pages/Home.jsx</code>
      </p>
      <div className="buttons-wrapper">
        <a
          className="button"
          href="https://dev-technology-hackathon-2023.gitbook.io/product-docs/"
          target="_blank"
          rel="noreferrer"
        >
          View Documentation <ArrowUpRight size={18} />
        </a>
      </div>
    </section>
  )
}

export default App
