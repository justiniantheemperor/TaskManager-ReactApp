import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Edit = ({ employees, selectedEmployee, setEmployees, setIsEditing }) => {
  const id = selectedEmployee.id;
  const [completed, setCompleted] = useState(selectedEmployee.completed)
  const [name, setName] = useState(selectedEmployee.name);
  const [description, setDescription] = useState(selectedEmployee.description);
  const [hours, setHours] = useState(selectedEmployee.hours);
  const [dueDate, setDueDate] = useState(selectedEmployee.dueDate);


  const handleUpdate = e => {
    e.preventDefault();

    if (!completed || !name || !description || !hours ||!dueDate) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const employee = {
      id,
      completed,
      name,
      description,
      hours,
      dueDate,
    };

    for (let i = 0; i < employees.length; i++) {
      if (employees[i].id === id) {
        employees.splice(i, 1, employee);
        break;
      }
    }

    localStorage.setItem('employees_data', JSON.stringify(employees));
    setEmployees(employees);
    setIsEditing(false);

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `${employee.name} task data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Employee</h1>
        <label htmlFor="completed">Task completed?</label>
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
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
