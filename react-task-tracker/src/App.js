import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  const [showAddTask, setAddTask] = useState(false);



  const [tasks, setTasks] = useState([]);
  useEffect(async () => {
    const tasksfromserver = await fetchTasks();
    setTasks(tasksfromserver);
  }, [])
  //Delete Tasks
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' })
    setTasks(tasks.filter((task) =>
      task.id !== id
    ));
  }

  //fetch Tasks

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    return res.json();
  }

  //Toogle Tasks
  const toogleTask = async (id) => {
    const gettask = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await gettask.json();
    const tasktoogle = { ...data, reminder: !data.reminder };

    const toogletask = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(tasktoogle)
    })
    const toogleupdate = await toogletask.json();
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, reminder: toogleupdate.reminder } : task
    ))
  }
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(task)
    })

    const data = await res.json();

    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = { id: id, ...task };
    setTasks([...tasks, data]);
  }
  return (
    <Router>
      <div className='container'>
        <Header onAdd={() => setAddTask(!showAddTask)} showAdd={showAddTask} />
        <Routes>
          <Route
            path='/'
            element={<>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? <Tasks
                tasks={tasks}
                onDelete={deleteTask}
                onToggle={toogleTask} /> : 'No Taks to show'}</>} />
          <Route path="/about" element={<About/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
