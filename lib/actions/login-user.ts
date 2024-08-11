import { useAppDispatch } from "@/app/GlobalRedux/hooks";
import {
  signInFailure,
  signInStart,
  signInSuccess,
  userAdded,
} from "@/app/GlobalRedux/features/userSlice/userSlice";
import { toast } from "react-toastify";

export const useLoginUser = () => {
  const dispatch = useAppDispatch();

  const loginUser = async (data: { email: string; password: string }) => {
    try {
      dispatch(signInStart());
      const res = await fetch(
        "https://medicine-e-commerce-server.vercel.app/api/v1/login",
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
          `Error logging in. Status: ${
            res.status
          }. Response: ${await res.text()}`
        );
        toast.error("Error logging in");
        throw new Error(`Error logging in. Status: ${res.status}`);
      }

      const userInfo = await res.json();
      dispatch(signInSuccess(userInfo));
      dispatch(userAdded(userInfo));
      toast.success("Logged in successfully");
      return userInfo;
    } catch (error) {
      toast.error("An error occurred during login");
      console.error(error);
      dispatch(signInFailure((error as Error).message));
      throw error;
    }
  };

  return { loginUser };
};
