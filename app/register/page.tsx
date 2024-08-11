"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { createUser } from "@/lib/actions/create-user";
import { toast } from "react-toastify";

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterFormInputs>();

  const handleRegister: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      const res = await createUser(data, router); // Pass the router here
      if (res.ok) {
        toast.success("Account created successfully");
        router.push(`/verify?email=${data.email}`);
      }
    } catch (error) {
      setError("Failed to create account. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md space-y-8 bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-md">
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl"
        >
          <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">
            Sign Up
          </h3>
          <p className="mb-4 text-grey-700">Create your account</p>

          <label
            htmlFor="name"
            className="mb-2 text-sm text-start text-slate-900"
          >
            Name*
          </label>
          <input
            {...register("name")}
            required
            type="text"
            placeholder="Enter your name"
            className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-gray-700 bg-slate-100 text-black rounded-2xl"
          />

          <label
            htmlFor="email"
            className="mb-2 text-sm text-start text-slate-900"
          >
            Email*
          </label>
          <input
            {...register("email")}
            required
            type="email"
            placeholder="Enter an email"
            className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-gray-700 bg-slate-100 text-black rounded-2xl"
          />

          <label
            htmlFor="password"
            className="mb-2 text-sm text-start text-grey-900"
          >
            Password*
          </label>
          <input
            {...register("password")}
            required
            type="password"
            placeholder="Enter a password"
            className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-gray-700 bg-slate-100 text-black rounded-2xl"
          />

          <button
            type="submit"
            className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-blue-600 focus:ring-4 focus:ring-purple-100 bg-green-500"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Account..." : "Sign up"}
          </button>

          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
          <p className="text-sm text-gray-900">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-grey-700">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
