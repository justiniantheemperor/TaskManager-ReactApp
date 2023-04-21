import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Edit = ({ categorys, selectedCategory, setCategorys, setIsEditing }) => {
  const id = selectedCategory.id;
  const [name, setName] = useState(selectedCategory.name);
  const [description, setDescription] = useState(selectedCategory.description);

  const handleUpdate = e => {
    e.preventDefault();

    if ( !name || !description) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const category = {
      id,
      name,
      description,
    };

    for (let i = 0; i < categorys.length; i++) {
      if (categorys[i].id === id) {
        categorys.splice(i, 1, category);
        break;
      }
    }

    localStorage.setItem('categorys_data', JSON.stringify(categorys));
    setCategorys(categorys);
    setIsEditing(false);

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `${category.name} has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Category</h1>
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
