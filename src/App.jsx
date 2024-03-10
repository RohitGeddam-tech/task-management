import React, { useEffect, useState } from "react";
import "./App.css";

import TaskForm from "./components/Taskform";
import Tasklist from "./components/Tasklist";

const defaultData = [
  {
    title: "Added",
    tasks: [],
  },
  {
    title: "Started",
    tasks: [],
  },
  {
    title: "Completed",
    tasks: [],
  },
];

function App() {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("tasks")) {
      setTasks(JSON.parse(localStorage.getItem("tasks")));
    } else {
      setTasks(defaultData);
    }
  }, [setTasks]);

  const addTask = (data) => {
    const addedTasks = tasks.filter((doc) => doc.title === "Added");
    const remainingTasks = tasks.filter((doc) => doc.title !== "Added");
    const allTasks = [
      { title: "Added", tasks: [...addedTasks[0].tasks, data] },
      ...remainingTasks,
    ];
    setTasks([...allTasks]);
    localStorage.setItem("tasks", JSON.stringify([...allTasks]));
  };

  return (
    <div className="App">
      <header>
        <h2>Task Management App</h2>
        <button className="btn" onClick={() => setModalOpen(true)}>Add New Task</button>
      </header>
      <main className="App-header">
        <Tasklist data={tasks} />
      </main>
      <TaskForm
        addTask={addTask}
        modalOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
      />
    </div>
  );
}

export default App;
