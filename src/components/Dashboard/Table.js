import React from 'react';

const Table = ({ tasks, handleEdit, handleDelete }) => {
  tasks.forEach((task, i) => {
    task.id = i + 1;
  });

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Done?</th>
            <th>Task Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Hours</th>
            <th>Due Date</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task, i) => (
              <tr key={task.id}>
                <td>{i + 1}</td>
                <td>{task.completed}</td>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>{task.category}</td>
                <td>{task.hours}</td>
                <td>{task.dueDate} </td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(task.id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Tasks</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
