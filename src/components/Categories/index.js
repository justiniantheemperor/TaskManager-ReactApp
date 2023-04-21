import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

import { categorysData } from '../../data/category';

const CategoryDashboard = ({ setIsAuthenticated }) => {
  const [categorys, setCategorys] = useState(categorysData);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('categorys_data'));
    if (data !== null && Object.keys(data).length !== 0) setCategorys(data);
  }, []);

  const handleEdit = id => {
    const [category] = categorys.filter(category => category.id === id);

    setSelectedCategory(category);
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
        const [category] = categorys.filter(category => category.id === id);

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${category.name} ${category.description}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const categorysCopy = categorys.filter(category => category.id !== id);
        localStorage.setItem('categorys_data', JSON.stringify(categorysCopy));
        setCategorys(categorysCopy);
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
            categorys={categorys}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          categorys={categorys}
          setCategorys={setCategorys}
          setIsAdding={setIsAdding}
        />
      )}
      {isEditing && (
        <Edit
          categorys={categorys}
          selectedCategory={selectedCategory}
          setCategorys={setCategorys}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default CategoryDashboard;
