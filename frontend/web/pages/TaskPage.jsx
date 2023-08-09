import { useEffect, useState } from "react"
import logo from "/logo.png"
import { ArrowUpRight } from "@phosphor-icons/react"
import "./TaskPage.css"

const grabUser = () => {
  axios.post("http://localhost:3000/userid", {
              username: name, 
              password: password,
              email: email
  }).then((resp) => {
    if(resp.status === 201){
        
    }
  })
};

function App() {  
  return (
    <section className="hero">
      <div>
      <h1>Task List</h1>
      <ul>
        {tasks.map((task, index) => (
          <div>
          <li key={index}>{task}</li>
          </div>
        ))}
      </ul>
    </div>
    </section>
  )
}

export default App
