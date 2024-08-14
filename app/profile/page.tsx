"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAppSelector } from "../GlobalRedux/hooks";
import Loader from "@/components/Loader/Loader";

export default function Profile() {
  const router = useRouter();
  const currentUser = useAppSelector((state: any) => state.user.currentUser);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (currentUser?._id) {
      // Check if currentUser and currentUser._id exist
      const fetchUserData = async () => {
        try {
          const response = await fetch(
            `https://medicine-e-commerce-server.vercel.app/api/v1/profile/${currentUser._id}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          const data = await response.json();
          setUserData(data);
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("An unknown error occurred");
          }
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    } else {
      // Handle the case where currentUser or currentUser._id is not available
      setLoading(false); // Stop loading since there's no user ID to fetch
      setError("User not found");
    }
  }, [currentUser?._id]); // Dependency on currentUser._id

  console.log(userData);
  const handleEditProfile = () => {
    router.push(`/settings`);
  };

  if (loading)
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-500 to-red-500">
      <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 relative max-w-md w-full">
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
          <Image
            src={userData?.user.photo}
            alt={userData?.user.name}
            width={120}
            height={120}
            className="rounded-full border-4 border-white shadow-md"
          />
        </div>
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            {userData?.user.name}
          </h2>
          <p className="mt-2 text-gray-600">Email: {userData?.user.email}</p>
          <button
            onClick={handleEditProfile}
            className="mt-6 px-6 py-2 text-white bg-pink-500 hover:bg-pink-600 rounded-full"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
