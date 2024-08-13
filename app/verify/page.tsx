"use client";
import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

const OTPVerification: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
    sendOTP(); // Trigger the OTP sending as soon as the component mounts
  }, []);

  const sendOTP = async () => {
    try {
      const res = await fetch(
        "https://medicine-e-commerce-server.vercel.app/api/v1/send-verification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!res.ok) {
        console.error(`Error sending OTP. Status: ${res.status}`);
        toast.error("Error sending OTP");
        return;
      }

      toast.success("OTP sent successfully");
    } catch (error) {
      console.error("Failed to send OTP:", error);
      toast.error("Failed to send OTP");
    }
  };

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://medicine-e-commerce-server.vercel.app/api/v1/verify-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, code: otp.join("") }),
        }
      );

      if (!res.ok) {
        console.error(`Error verifying OTP. Status: ${res.status}`);
        toast.error("Error verifying OTP");
        return;
      }

      toast.success("Account verified successfully");

      // Redirect to login page
      router.push("/login");
    } catch (error) {
      console.error("Failed to verify OTP:", error);
      toast.error("Failed to verify OTP");
    }
  };

  const handleResendOTP = async () => {
    sendOTP();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Head>
        <title>OTP Verification</title>
        <meta name="description" content="OTP Verification Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-md w-full space-y-8 bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            OTP Verification
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We have sent an OTP code to your email.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="flex justify-center space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500"
              />
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-full px-6 py-3 text-sm font-bold leading-none text-white transition duration-300 rounded-lg bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300"
            >
              Verify OTP
            </button>
          </div>

          <div className="mt-4 text-center">
            <button
              type="button"
              className="text-indigo-600 hover:text-indigo-500"
              onClick={handleResendOTP}
            >
              Didn&apos;t receive an OTP? Resend OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;
