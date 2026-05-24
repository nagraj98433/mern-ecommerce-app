import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setCredentials } from "../redux/slices/userSlice";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function LoginPage() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}api/users/login`,
        { email, password },
      );

      dispatch(setCredentials(data));
      toast.success("Login Successful ✅");
      navigate("/");
    } catch (error) {
      toast.error("Invalid Credentials ❌");
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* LEFT SIDE */}

      <div className="hidden flex-col justify-center bg-black px-20 text-white lg:flex">
        <h1 className="mb-8 text-6xl leading-tight font-bold">Welcome Back</h1>

        <p className="max-w-lg text-xl text-gray-300">
          Login to continue shopping premium products with modern ecommerce
          experience.
        </p>
      </div>

      {/* RIGHT SIDE */}

      <div className="flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 px-6">
        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="w-full max-w-md rounded-3xl border border-white/30 bg-white/70 p-10 shadow-2xl backdrop-blur-lg"
        >
          <h2 className="mb-3 text-center text-4xl font-bold">Login</h2>

          <p className="mb-10 text-center text-gray-500">Access your account</p>

          <form onSubmit={submitHandler} className="space-y-6">
            {/* EMAIL */}

            <div>
              <label className="mb-2 block font-medium">Email</label>

              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 p-4 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* PASSWORD */}

            <div>
              <label className="mb-2 block font-medium">Password</label>

              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 p-4 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* BUTTON */}

            <button
              type="submit"
              className="w-full cursor-pointer rounded-2xl bg-black py-4 text-lg font-semibold text-white transition hover:bg-gray-800"
            >
              Login
            </button>
          </form>

          {/* FOOTER */}

          <p className="mt-8 text-center text-gray-600">
            Don’t have an account?
            <Link to="/register" className="ml-2 font-bold text-black">
              Register
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default LoginPage;
