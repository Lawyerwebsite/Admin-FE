import axios from "axios";
import React, { useState } from "react";


const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:7000/admin/resetpassword", { email });
      if (res) {
        alert("Email sent successfully!");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email.");
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Left Section (Image) */}
          <div className="hidden md:block md:w-1/2">
            <img
              src="https://images8.alphacoders.com/129/thumb-1920-1292335.jpg"
              alt="login form"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Right Section (Form) */}
          <div className="flex items-center justify-center w-full md:w-1/2 p-8">
            <div className="w-full">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Forget Password?
              </h2>
              <p className="text-gray-600 mb-6">
                Enter your email address below to receive password reset
                instructions.
              </p>

              <form onSubmit={handleSubmit}>
                {/* Email Input */}
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                  />
                </div>

                {/* Submit Button */}
                <div className="mt-4">
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Send Email
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgetPassword;
