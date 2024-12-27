import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    newPassword: "",
    conformPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, newPassword, conformPassword } = input;

    if (!email || !newPassword || !conformPassword) {
      toast.warning("Please fill all the fields");
      return;
    }

    if (newPassword !== conformPassword) {
      toast.warning("Passwords do not match");
      return;
    }

    try {
      await axios
        .post("http://localhost:7000/admin/resetpassword", {
          email,
          newPassword,
          conformPassword,
        })
        .then((res) => {
          toast.success(res.data.message);
          navigate("/");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center "
      style={{
        backgroundImage:
          'url("https://cdn.wallpapersafari.com/26/86/GUaKh4.jpg")',
      }}
    >
      <div className="flex items-center justify-center w-full h-full">
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-[90%]">
          <h2 className="text-4xl font-semibold text-center text-gray-800 mb-4">
            Change Password
          </h2>
          <p className="text-center text-gray-600 mb-6 text-lg leading-relaxed">
            Enter your email and new password below to update your credentials.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Email Field */}
            <div>
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
                value={input.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 transition"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* New Password Field */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={input.newPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 transition"
                placeholder="Enter your new password"
                required
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="conformPassword"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="conformPassword"
                name="conformPassword"
                value={input.conformPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 transition"
                placeholder="Confirm your new password"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-center text-red-600 text-sm">{error}</div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white  rounded-md hover:opacity-90 focus:ring-4 focus:ring-blue-300 transition-all"
            >
              Change Password
            </button>

            {/* Additional Link */}
            <div className="text-center mt-4">
              <Link
                to="/"
              >
                <p>Remember your password {""} <span className="text-blue-500 hover:text-blue-700 font-medium  transition">Click here</span></p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
