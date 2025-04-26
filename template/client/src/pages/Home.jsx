import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/signin");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Home Page!</h1>
      <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded">
        Logout
      </button>
    </div>
  );
}
