import { useAppDispatch } from "@/app/GlobalRedux/hooks";
import {
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
} from "@/app/GlobalRedux/features/userSlice/userSlice";
import { toast } from "react-toastify";

export const useLogoutUser = () => {
  const dispatch = useAppDispatch();

  const logoutUser = async () => {
    try {
      dispatch(signOutUserStart());
      // Optionally, make a request to the server to invalidate the session
      await fetch(
        "https://medicine-e-commerce-server.vercel.app/api/v1/logout",
        {
          method: "POST",
          cache: "no-cache",
        }
      );

      // Dispatch logout actions
      dispatch(deleteUserSuccess());
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("An error occurred during logout");
      console.error(error);
      dispatch(deleteUserFailure(error));
    }
  };

  return { logoutUser };
};
