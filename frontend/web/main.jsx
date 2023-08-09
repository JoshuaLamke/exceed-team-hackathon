import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import "@fontsource-variable/inter"
import "./index.css"
import LoginForm from "./pages/LoginForm"
import SignupForm from "./pages/SignupForm"

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/signup",
    element: <SignupForm />
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
