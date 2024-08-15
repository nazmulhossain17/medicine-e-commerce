"use client";

import { useAppSelector } from "@/app/GlobalRedux/hooks";
import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";

interface ShippingDetails {
  _id: string;
  userId: string;
  division: string;
  district: string;
  subDistrict: string;
  address: string;
  name: string;
  phone: string;
  products: string[];
}

const Shipping = () => {
  const [shippingData, setShippingData] = useState<ShippingDetails[] | null>(
    null
  );
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const currentUser = useAppSelector((state: any) => state.user.currentUser);

  const fetchShippingData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `https://medicine-e-commerce-server.vercel.app/api/v4/addresses/${currentUser._id}`
      );
      const flattenedData = Array.isArray(data) ? data : [data];
      setShippingData(flattenedData);
    } catch (error) {
      console.error("Error fetching shipping data:", error);
    }
  }, [currentUser._id]);

  useEffect(() => {
    fetchShippingData();
  }, [fetchShippingData]);

  const handleDelete = async () => {
    if (selectedAddress) {
      try {
        await axios.delete(
          `https://medicine-e-commerce-server.vercel.app/api/v4/shipping-address/${selectedAddress}`
        );
        setShippingData(
          shippingData?.filter((address) => address._id !== selectedAddress) ||
            []
        );
        setIsDeleteModalOpen(false);
        setSelectedAddress(null);
      } catch (error) {
        console.error("Error deleting shipping address:", error);
      }
    }
  };

  const openDeleteModal = (addressId: string) => {
    setSelectedAddress(addressId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedAddress(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shipping Details</h1>

      {shippingData &&
      Array.isArray(shippingData) &&
      shippingData.length > 0 ? (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="border px-4 py-2">No.</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Address</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Location</th>
              <th className="border px-4 py-2">Products</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {shippingData.map((data, index) => (
              <tr key={data._id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">
                  {data.name || "No name provided"}
                </td>
                <td className="border px-4 py-2">
                  {data.address || "No address provided"}
                </td>
                <td className="border px-4 py-2">
                  {data.phone || "No phone provided"}
                </td>
                <td className="border px-4 py-2">
                  {`${data.subDistrict || "Unknown"}, ${
                    data.district || "Unknown"
                  }, ${data.division || "Unknown"}`}
                </td>
                <td className="border px-4 py-2">
                  {data.products && data.products.length > 0
                    ? data.products.join(", ")
                    : "No products"}
                </td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => openDeleteModal(data._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No shipping data available</p>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this shipping address?</p>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleDelete}
              >
                Yes
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={closeDeleteModal}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shipping;
