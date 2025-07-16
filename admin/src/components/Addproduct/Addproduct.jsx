import React, { useState } from 'react';
import './Addproduct.css';

const Addproduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'men',
    description: '',
    price: '',
    rating: 1,
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // 1. Upload image to server
    const imageFormData = new FormData();
    imageFormData.append('product', formData.image);

    const uploadRes = await fetch('http://localhost:4000/upload', {
      method: 'POST',
      body: imageFormData,
    });

    const uploadData = await uploadRes.json();
    console.log('Upload response:', uploadData);

    if (!uploadData.success) {
      alert('Image upload failed');
      return;
    }

    // 2. Send product data to backend
    const productData = {
      name: formData.name,
      category: formData.category,
      image: uploadData.image_url, // Use image URL returned from upload API
      description: formData.description,
      price: Number(formData.price),
      rating: Number(formData.rating),
    };

    const productRes = await fetch('http://localhost:4000/addproduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    const productResult = await productRes.json();
    console.log('Add product response:', productResult);

    if (productResult.success) {
      alert('✅ Product added successfully!');
      setFormData({
        name: '',
        category: 'men',
        description: '',
        price: '',
        rating: 1,
        image: null,
      });
    } else {
      alert('Failed to add product');
    }
  } catch (err) {
    console.error('Error:', err);
    alert('Something went wrong while adding the product.');
  }
};

  return (
    <div className="add-product-container">
      <h1 className="add-product-title">Add Product</h1>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Product Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter product name"
          required
        />

        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
        </select>

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Write a description"
          rows="4"
          required
        />

        <label htmlFor="price">Price ($)</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Enter price"
          min="0"
          step="0.01"
          required
        />

        <label htmlFor="rating">Rating (1-5)</label>
        <input
          type="number"
          id="rating"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          min="1"
          max="5"
          required
        />

        <label htmlFor="image">Upload Image</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
        />

        <button type="submit" className="submit-btn">Add Product</button>
      </form>
    </div>
  );
};

export default Addproduct;
