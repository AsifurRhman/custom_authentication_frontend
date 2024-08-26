import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaPowerOff } from "react-icons/fa6";

const Logout = () => {
  const router = useRouter();

  const logout = () => {
    Cookies.remove("session");
    Cookies.remove("role");
    localStorage.removeItem("userInfo");
    toast.success("Logout successful");
    router.push("/login");
  };

  return (
    <button
      onClick={logout}
      type="button"
      className="flex items-center gap-2 text-base capitalize hover:cursor-pointer hover:bg-gray-200 p-2 rounded-md"
    >
      <FaPowerOff />
      Log Out
    </button>
  );
};

export default Logout;
