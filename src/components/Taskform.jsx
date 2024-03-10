// components/TaskForm.js

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactModal from "react-modal";
// import { connect } from 'react-redux';
// import { addTask } from '../actions/taskActions';
// import '../styles/TaskForm.css';

const TaskForm = ({ addTask, modalOpen, closeModal }) => {
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState(null);

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleDueDateChange = (date) => {
    setDueDate(date);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTask.trim() !== "") {
      const task = {
        id: Date.now().toString(),
        title: newTask,
        priority,
        dueDate,
        category: "Added",
      };
      addTask(task);
      setNewTask("");
      setPriority("medium");
      setDueDate(null);
      closeModal();
    }
  };

  return (
    <ReactModal
      shouldCloseOnOverlayClick={true}
      onRequestClose={closeModal}
      isOpen={modalOpen}
    >
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="head">
          <h3>Enter New Task</h3>
          <img src="/close.svg" alt="close" onClick={closeModal} />
        </div>
        <div className="form-pattern">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTask}
            onChange={handleInputChange}
          />
          <select value={priority} onChange={handlePriorityChange}>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <DatePicker
            selected={dueDate}
            onChange={handleDueDateChange}
            placeholderText="Due Date"
          />
        </div>
        <button className="btn" type="submit">
          Add Task
        </button>
      </form>
    </ReactModal>
  );
};

export default TaskForm;
