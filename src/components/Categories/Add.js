import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Add = ({ categorys, setCategorys, setIsAdding }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = e => {
    e.preventDefault();

    if ( !name || !description ) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const id = categorys.length + 1;
    const newCategory = {
      id,
      name,
      description,
    };

    categorys.push(newCategory);
    localStorage.setItem('categorys_data', JSON.stringify(categorys));
    setCategorys(categorys);
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
        <h1>Add Category</h1>

        <label htmlFor="name">Category Name</label>
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
