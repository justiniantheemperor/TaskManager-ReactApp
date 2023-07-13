import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Add = ({ tasks, setTasks, setIsAdding }) => {
  const [name, setName] = useState('');
  const [completed, setCompleted] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [hours, setHours] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleAdd = e => {
    e.preventDefault();

    if (!completed || !name || !description || !dueDate) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const id = tasks.length + 1;
    const newTask = {
      id,
      completed,
      name,
      description,
      category,
      hours,
      dueDate,
    };

    tasks.push(newTask);
    localStorage.setItem('tasks_data', JSON.stringify(tasks));
    setTasks(tasks);
    setIsAdding(false);

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `${name} ${description}'s data has been Added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Task</h1>

        <label htmlFor="completed">Complete?</label>
        <input
          id="completed"
          type="text"
          name="completed"
          value={completed}
          onChange={e => setCompleted(e.target.value)}
        />

        <label htmlFor="name">Task Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          name="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <label htmlFor="category">Category</label>
        <input
          id="category"
          type="text"
          name="category"
          value={category}
          onChange={e => setCategory(e.target.value)}
        />
        <label htmlFor="hours">Hours</label>
        <input
          id="hours"
          type="number"
          step="0.5"
          name="hours"
          value={hours}
          onChange={e => setHours(e.target.value)}
        />
        <label htmlFor="dueDate">Due Date</label>
        <input
          id="dueDate"
          type="date"
          name="dueDate"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
