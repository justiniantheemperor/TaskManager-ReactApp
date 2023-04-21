import React from 'react';

const CategoryTable = ({ categorys, handleEdit, handleDelete }) => {
  categorys.forEach((category, i) => {
    category.id = i + 1;
  });

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Category</th>
            <th>Description</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {categorys.length > 0 ? (
            categorys.map((category, i) => (
              <tr key={category.id}>
                <td>{i + 1}</td>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(category.id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Category</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
