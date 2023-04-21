import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

import { tasksData } from '../../data';

const Dashboard = ({ setIsAuthenticated }) => {
  const [tasks, setTasks] = useState(tasksData);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('tasks_data'));
    if (data !== null && Object.keys(data).length !== 0) setTasks(data);
  }, []);

  const handleEdit = id => {
    const [task] = tasks.filter(task => task.id === id);

    setSelectedTask(task);
    setIsEditing(true);
  };

  const handleDelete = id => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(result => {
      if (result.value) {
        const [task] = tasks.filter(task => task.id === id);

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${task.name} ${task.description}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const tasksCopy = tasks.filter(task => task.id !== id);
        localStorage.setItem('tasks_data', JSON.stringify(tasksCopy));
        setTasks(tasksCopy);
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Table
            tasks={tasks}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          tasks={tasks}
          setTasks={setTasks}
          setIsAdding={setIsAdding}
        />
      )}
      {isEditing && (
        <Edit
          tasks={tasks}
          selectedTask={selectedTask}
          setTasks={setTasks}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default Dashboard;
