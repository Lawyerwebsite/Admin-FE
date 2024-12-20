import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);

    try {
      const res = await axios.post("http://localhost:7000/admin/login", formData);
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("adminId",res.data.findEmail._id)
      toast.success(res.data.message);
      navigate("/home");
      setFormData(initialState);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div
      className="flex items-center justify-center w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage: 'url("https://cdn.wallpapersafari.com/26/86/GUaKh4.jpg")',
      }}
    >
      <div className="flex items-center justify-center w-full h-screen bg-black bg-opacity-70">
        <div className="bg-white shadow-lg rounded-xl w-[550px] min-h-[400px] p-6 border border-gray-300 bg-opacity-80">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Admin Login</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email Field */}
            <div className="relative">
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white text-lg rounded-md hover:bg-blue-700 transition focus:ring focus:ring-blue-300"
            >
              Login
            </button>
          </form>

          {/* Forget Password Link */}
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Forgot your password?{" "}
              <button
                onClick={() => navigate("/change")}
                className="text-blue-500 hover:underline"
              >
                Reset it here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
