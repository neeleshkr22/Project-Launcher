import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema } from "../schemas/signinSchema";
import api from "../api/axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signin() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/auth/signin", data);
      localStorage.setItem("token", res.data.token);
      setUser({ token: res.data.token });
      toast.success("Signed in successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signin failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <input {...register("email")} placeholder="Email" className="input mt-4" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <input {...register("password")} type="password" placeholder="Password" className="input mt-4" />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded mt-6">
          Sign In
        </button>
      </form>
    </div>
  );
}
