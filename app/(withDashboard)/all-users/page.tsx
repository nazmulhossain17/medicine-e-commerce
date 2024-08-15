// app/(withDashboard)/all-users/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Modals from "@/components/Modal/Modals";
import { useAppSelector } from "@/app/GlobalRedux/hooks";
import Image from "next/image";

const AllUsers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isMakeAdminModalOpen, setIsMakeAdminModalOpen] = useState(false);
  const [action, setAction] = useState<"delete" | "make-admin" | null>(null);
  const currentUser = useAppSelector((state: any) => state.user.currentUser);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://medicine-e-commerce-server.vercel.app/api/v1/users/"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = (userId: string) => {
    setSelectedUser(userId);
    setAction("delete");
    setIsDeleteModalOpen(true);
  };

  const handleMakeAdmin = (userId: string) => {
    setSelectedUser(userId);
    setAction("make-admin");
    setIsMakeAdminModalOpen(true);
  };

  const confirmAction = async () => {
    if (selectedUser) {
      try {
        if (action === "delete") {
          await axios.delete(
            `https://medicine-e-commerce-server.vercel.app/api/v1/users/${selectedUser}`
          );
          setUsers(users.filter((user) => user._id !== selectedUser));
        } else if (action === "make-admin") {
          await axios.post(
            `https://medicine-e-commerce-server.vercel.app/api/v1/make-admin/${currentUser._id}`,
            { userId: selectedUser }
          );
          setUsers(
            users.map((user) =>
              user._id === selectedUser ? { ...user, role: "admin" } : user
            )
          );
        }
        setIsDeleteModalOpen(false);
        setIsMakeAdminModalOpen(false);
        setSelectedUser(null);
        setAction(null);
      } catch (error) {
        console.error("Error performing action:", error);
      }
    }
  };

  const cancelAction = () => {
    setIsDeleteModalOpen(false);
    setIsMakeAdminModalOpen(false);
    setSelectedUser(null);
    setAction(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="py-2 px-4 border-b">
                <Image
                  width={50}
                  height={50}
                  src={user.photo}
                  alt={user.name}
                  className="w-12 h-12 rounded-full"
                />
              </td>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete User
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => handleMakeAdmin(user._id)}
                >
                  Make Admin
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      <Modals
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <h2 className="text-xl font-bold">Confirm Delete</h2>
        <p>Are you sure you want to delete this user?</p>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            onClick={confirmAction}
          >
            Yes
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={cancelAction}
          >
            No
          </button>
        </div>
      </Modals>

      {/* Make Admin Confirmation Modal */}
      <Modals
        isOpen={isMakeAdminModalOpen}
        onClose={() => setIsMakeAdminModalOpen(false)}
      >
        <h2 className="text-xl font-bold">Confirm Promotion</h2>
        <p>Are you sure you want to make this user an admin?</p>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={confirmAction}
          >
            Yes
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={cancelAction}
          >
            No
          </button>
        </div>
      </Modals>
    </div>
  );
};

export default AllUsers;
