import { useEffect, useState } from "react"
import logo from "/logo.png"
import { ArrowUpRight } from "@phosphor-icons/react"
import "./TaskPage.css"
import { useParams } from "react-router-dom";
import axios from "axios";
import TaskModal from "../components/TaskModal";  
import { Button } from "react-bootstrap";

function App() {  
  const {userId} = useParams();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [action, setAction] = useState("add");
  console.log(tasks)
  console.log(user)
  useEffect(() => {
    if(userId) {
      axios.get(`http://localhost:3000/user/${userId}`).then((resp) => {
      if(resp.status === 200){
        setUser(resp.data);
      }
      })
      axios.get(`http://localhost:3000/user/tasks/${userId}`).then((resp) => {
      if(resp.status === 200){
        setTasks(resp.data || {});
      }
      })
    }
  }, [userId])

  if(!user || !tasks) {
    return <div>Loading...</div>;
  }
  return (
    <section className="hero">
      <div>
      <h1>{user.username}'s Task List</h1>

      <div>
        <Button onClick={() => {
          setAction("add");
          setShowAdd(true);
        }}>
          Add Task
        </Button>
        <TaskModal 
          action={"add"} 
          setShow={setShowAdd}
          show={showAdd}
          task={{}}
          title={"Add Task"}
          user={user}
        />
        {tasks.map((task, index) => (
          <div class={task.category}>
            <h3>{task.title}</h3>
            <h4>{task.due_date} - {task.category}</h4>
            <div>{task.description}</div>
            <div>Duration: {task.duration}</div>
            <div>Priority: {task.priority}</div>
            <TaskModal 
              action={"update"} 
              setShow={setShowUpdate}
              show={showUpdate}
              task={task}
              title={"Update Task"}
              user={user}
            />
          </div>
        ))}
        
      </div>
    </div>
    </section>
  )
}

export default App
