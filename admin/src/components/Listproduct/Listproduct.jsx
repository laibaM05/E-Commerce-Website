import React, { useEffect, useState } from 'react';
import './Listproduct.css';
import { FaTimes } from 'react-icons/fa'; // Cross icon

const Listproduct = () => {
  const [products, setProducts] = useState([]);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:4000/allproducts');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete handler
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    try {
      const res = await fetch('http://localhost:4000/removeproduct', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id:id}),
    });


      if (res.ok) {
        setProducts(products.filter((product) => product.id !== id));
        alert('Product deleted successfully.');
      } else {
        alert('Failed to delete product.');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  return (
    <div className="list-product-container">
      <h1 className="list-product-title">Product List</h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="table-product-image"
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price}</td>
                <td>{product.rating}</td>
                <td>{product.description}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(product.id)}
                    title="Delete Product"
                  >
                    <FaTimes />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Listproduct;
