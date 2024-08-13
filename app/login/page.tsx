"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Link from "next/link";
import { useLoginUser } from "@/lib/actions/login-user";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { loginUser } = useLoginUser(); // Use the hook to get the loginUser function

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginUser({ email, password }); // Use loginUser from the hook
      if (response.isVerified) {
        // Save user info to state or local storage if needed
        router.push("/");
      } else {
        router.push(`/verify?email=${response.email}`);
      }
    } catch (err) {
      setError("Invalid credentials");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md space-y-8 bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-md">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl"
        >
          <h3 className="mb-3 text-3xl sm:text-4xl font-extrabold text-dark-grey-900">
            Sign In
          </h3>
          <p className="mb-4 text-sm sm:text-base text-grey-700">
            Enter your email and password
          </p>
          <div className="flex items-center mb-3">
            <hr className="h-0 border-b border-solid border-gray-500 grow" />
            <p className="mx-4 text-sm text-grey-600">or</p>
            <hr className="h-0 border-b border-solid border-gray-500 grow" />
          </div>
          <label
            htmlFor="email"
            className="mb-2 text-sm text-start text-slate-900"
          >
            Email*
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            required
            id="email"
            type="email"
            placeholder="Enter a email"
            className="flex items-center w-full px-3 sm:px-5 py-3 sm:py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-4 sm:mb-7 placeholder:text-gray-700 bg-slate-100 text-black rounded-2xl"
          />
          <label
            htmlFor="password"
            className="mb-2 text-sm text-start text-grey-900"
          >
            Password*
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            required
            id="password"
            type="password"
            placeholder="Enter a password"
            className="flex items-center w-full px-3 sm:px-5 py-3 sm:py-4 mb-3 sm:mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-gray-700 bg-slate-100 text-black rounded-2xl"
          />
          <div className="flex justify-end mb-3 sm:mb-5">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <button className="w-full px-4 sm:px-6 py-3 sm:py-5 mb-3 sm:mb-5 text-sm font-bold leading-none text-white transition duration-300 rounded-2xl hover:bg-blue-600 focus:ring-4 focus:ring-purple-100 bg-purple-500">
            Sign In
          </button>
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <p className="text-sm text-gray-900">
            Not registered yet?{" "}
            <Link
              href="/register"
              className="font-bold text-grey-700 hover:underline"
            >
              Create an Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
