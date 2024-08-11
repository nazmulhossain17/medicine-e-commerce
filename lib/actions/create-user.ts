import { toast } from "react-toastify";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const createUser = async (data: any, router: AppRouterInstance) => {
  try {
    const res = await fetch(
      "https://medicine-e-commerce-server.vercel.app/api/v1/create-account",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        cache: "no-cache",
      }
    );

    if (!res.ok) {
      console.error(
        `Error creating user. Status: ${
          res.status
        }. Response: ${await res.text()}`
      );
      toast.error("Error creating user");
      throw new Error(`Error creating user. Status: ${res.status}`);
    }

    const userInfo = await res.json();
    console.log(userInfo);
    toast.success("Account created successfully");

    // Redirect to OTP verification page
    router.push(`/verify?email=${userInfo.email}`);

    return userInfo;
  } catch (error) {
    throw error;
  }
};
