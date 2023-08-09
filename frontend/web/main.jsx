import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import "@fontsource-variable/inter"
import "./index.css"
import LoginForm from "./pages/LoginForm"
import SignupForm from "./pages/SignupForm"
import TaskPage from "./pages/TaskPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/home",
    element: <TaskPage />
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
