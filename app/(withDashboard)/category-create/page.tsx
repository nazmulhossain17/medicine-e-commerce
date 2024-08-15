"use client";
import React, { useState } from "react";
import axios from "axios";

const CategoryCreate: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    thumbnail: "",
    parentCategory: "",
    level: 1,
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axios.post(
        "https://medicine-e-commerce-server.vercel.app/api/v2/categories",
        formData
      );

      if (response.status === 201) {
        setSuccessMessage("Category created successfully!");
        setFormData({
          name: "",
          slug: "",
          thumbnail: "",
          parentCategory: "",
          level: 1,
        });
      }
    } catch (error) {
      setErrorMessage("Failed to create category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg p-6 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Create New Category</h1>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Category Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
            placeholder="Category Name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Slug</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
            placeholder="Slug"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Thumbnail URL</label>
          <input
            type="text"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
            placeholder="Thumbnail URL"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            Parent Category ID (optional)
          </label>
          <input
            type="text"
            name="parentCategory"
            value={formData.parentCategory}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            placeholder="Parent Category ID"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Level</label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          >
            <option value={1}>Primary</option>
            <option value={2}>Secondary</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Category"}
        </button>
      </form>
    </div>
  );
};

export default CategoryCreate;
