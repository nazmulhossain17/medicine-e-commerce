"use client";
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "@/app/GlobalRedux/features/api/apiSlice";
import Loader from "@/components/Loader/Loader";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal/ConfirmDeleteModal";
import { toast } from "react-toastify";

interface Product {
  _id: string;
  name: string;
  slug: string;
  photos: string[];
  description: string;
  metaKey: string;
  price: number;
  discount: number;
  stockStatus: boolean;
  status: boolean;
}

const Dashboard = () => {
  const {
    data: productsData = { products: [] as Product[] },
    isLoading: productsLoading,
    error: productsError,
  } = useGetProductsQuery(undefined);

  const {
    data: categoriesData = { categories: [] },
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGetCategoriesQuery(undefined);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  useEffect(() => {
    console.log("Products Data:", productsData.products);
    console.log("Categories Data:", categoriesData);
  }, [productsData, categoriesData]);

  const handleDelete = async () => {
    if (productToDelete) {
      const url = `https://medicine-e-commerce-server.vercel.app/api/v3/products/${productToDelete}`;
      console.log("Deleting product with URL:", url);

      try {
        await axios.delete(url);
        // Optionally refetch data or handle successful deletion
        toast.success("Product deleted successfully");
        setIsModalOpen(false);
        window.location.reload();
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    }
  };

  if (productsLoading || categoriesLoading) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }

  if (productsError || categoriesError) {
    const errorMessage =
      (productsError as any)?.message ||
      (categoriesError as any)?.message ||
      "An unknown error occurred.";
    return <div>Error fetching data: {errorMessage}</div>;
  }

  return (
    <div>
      <h1>Product Dashboard</h1>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {productsData.products.length > 0 ? (
            productsData.products.map((product: Product, index: number) => (
              <tr key={product._id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">${product.price}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => {
                      setProductToDelete(product._id);
                      setIsModalOpen(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="border px-4 py-2 text-center">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Dashboard;
