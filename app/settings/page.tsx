"use client";
import React, { useState } from "react";
import { useAppSelector } from "../GlobalRedux/hooks";
import { useRouter } from "next/navigation";

const Settings = () => {
  const router = useRouter();
  const currentUser = useAppSelector((state: any) => state.user.currentUser);
  console.log(currentUser);
  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [photo, setPhoto] = useState(currentUser?.photo || "");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleUpdate = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        `https://medicine-e-commerce-server.vercel.app/api/v1/update/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, photo }),
          credentials: "include", // This ensures cookies are included in the request
        }
      );

      if (!response.ok) {
        const errorText = await response.text(); // Get raw text response
        throw new Error(errorText || "Failed to update profile");
      }

      // Try to parse JSON only if response is OK
      const data = await response.json();

      if (response.status === 200) {
        setSuccess("Profile updated successfully!");
        router.push("/profile");
      }
      console.log(data);
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Edit Profile
        </h2>
        {success && <div className="text-green-600 mb-4">{success}</div>}
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <div className="mt-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700">Photo URL</label>
          <input
            type="text"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          onClick={handleUpdate}
          disabled={loading}
          className={`mt-6 px-6 py-2 text-white ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } rounded-full w-full`}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default Settings;
