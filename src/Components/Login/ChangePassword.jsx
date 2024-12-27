import axios from "axios";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



const ChangePassword = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();
  
  const [input, setInput] = useState({
    email:"",
    newPassword: "",
    conformPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  console.log(input);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {email, newPassword, conformPassword} = input;

    // if(!email || !password || !conformPassword){
    //   toast.warning(" Please fill all the fields");
    //   return;
    // }
    // if (password !== conformPassword){
    //   toast.warning("Password do not match");
    //   return;
    // }
    try {
      await axios.post("http://localhost:7000/admin/resetpassword",{
        email,
        newPassword,
        conformPassword,
      })
      .then((res) => {
        
        toast.success(res.data.message)
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
    } catch (error) {
      console.log(error,"Something went wrong");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: 'url("https://images8.alphacoders.com/129/thumb-1920-1292335.jpg")',
      }}
    >
      <div className="bg-white shadow-lg rounded-xl max-w-md w-full p-6 mx-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Change Password
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your new password below.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* New Password Field */}
          <div>
            <label
              htmlFor="newPassword"
              className="block text-lg font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={input.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="block text-lg font-medium text-gray-700 mb-1"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={input.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter new password"
              required
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-lg font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="conformPassword"
              name="conformPassword"
              value={input.conformPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Confirm new password"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white text-lg rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300 transition"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
