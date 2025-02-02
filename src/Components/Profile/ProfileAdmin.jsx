import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  phone: "",
  dob: "",
  gender: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  category: "",
  qualification: "",
  experience: "",
  bio: "",
  enrollmentnumber: "", // Add this field
  registernumber: "",   // Add this field
  image: null,
};

const AdminProfileCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [file, setFile] = useState(null);
  const [getFormData, setGetFormData] = useState(initialState);

  const adminId = localStorage.getItem("adminId");
  const token = localStorage.getItem("token");

  
  

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7000/admin/lawyerprofile/?_id=${adminId}`,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        setGetFormData(response.data);
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };
    console.log();
    

    fetchProfileData();
  }, [adminId]);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setGetFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(getFormData).forEach((key) => {
      data.append(key, getFormData[key]);
    });
    try {
      await axios
        .put(
          `http://localhost:7000/admin/update/?id=${getFormData._id}`,
          data,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((res) => {
          setIsEditing(false);
          toast.success(res.data.message);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  let formattedDate = "N/A"; 
  if (getFormData.dob) {
    const date = new Date(getFormData.dob);
    if (!isNaN(date)) {
      formattedDate = date.toISOString().split("T")[0];
    } else {
      console.error("Invalid date value:", getFormData.dob);
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col min-h-full">
        {isEditing ? (
          <div className="flex-grow">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Edit Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-semibold text-black">Name</label>
                <input
                  type="text"
                  name="name"
                  value={getFormData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-3 mt-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black">Email</label>
                <input
                  type="email"
                  name="email"
                  value={getFormData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-3 mt-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black">Phone</label>
                <input
                  type="tel"
                  name="number"
                  value={getFormData.number}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-3 mt-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formattedDate}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-3 mt-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black">Gender</label>
                <select
                  name="gender"
                  value={getFormData.gender}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-3 mt-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-black">Address</label>
                <input
                  type="text"
                  name="address"
                  value={getFormData.address}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-3 mt-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black">City</label>
                <input
                  type="text"
                  name="city"
                  value={getFormData.city}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-3 mt-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black">State</label>
                <input
                  type="text"
                  name="state"
                  value={getFormData.state}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-3 mt-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black">Pin Code</label>
                <input
                  type="text"
                  name="pincode"
                  value={getFormData.pincode}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-3 mt-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black">Qualification</label>
                <input
                  type="text"
                  name="qualification"
                  value={getFormData.qualification}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-3 mt-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black">Experience</label>
                <input
                  type="text"
                  name="experience"
                  value={getFormData.experience}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-3 mt-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black">Enrollment Number</label>
                <input
                  type="text"
                  name="enrollmentnumber"
                  value={getFormData.enrollmentno}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-3 mt-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="MS/850000000000000/2000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black">Register Number</label>
                <input
                  type="text"
                  name="registernumber"
                  value={getFormData.registerno}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-3 mt-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="NB/TN/2025/0000000000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black">Photo</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-3 mt-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-semibold text-black">Bio</label>
                <textarea
                  name="bio"
                  value={getFormData.bio}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-3 mt-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-grow">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Profile Information</h3>
            <div className="flex flex-col gap-12 my-8 justify-between items-center">
              <img
                src={`http://localhost:7000/upload/${getFormData.fileName}`}
                alt="profile image"
                className="rounded-full border-4 border-blue-500 h-44 w-44 object-cover"
              />
              <div className="flex flex-col gap-6">
                <div>
                  <label className="text-lg font-semibold text-black">Name</label>
                  <p className="text-lg text-gray-800">{getFormData.name}</p>
                </div>

                <div>
                  <label className="text-lg font-semibold text-black">Category</label>
                  <p className="text-lg text-gray-800">{getFormData.category}</p>
                </div>

                <div>
                  <label className="text-lg font-semibold text-black">Bio</label>
                  <p className="text-lg text-gray-800">{getFormData.bio}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="text-lg font-semibold text-black">Email</label>
                <p className="text-lg text-gray-800">{getFormData.email}</p>
              </div>

              <div>
                <label className="text-lg font-semibold text-black">Phone</label>
                <p className="text-lg text-gray-800">{getFormData.number}</p>
              </div>

              <div>
                <label className="text-lg font-semibold text-black">Date of Birth</label>
                <p className="text-lg text-gray-800">{formattedDate}</p>
              </div>

              <div>
                <label className="text-lg font-semibold text-black">Gender</label>
                <p className="text-lg text-gray-800">{getFormData.gender}</p>
              </div>

              <div>
                <label className="text-lg font-semibold text-black">Address</label>
                <p className="text-lg text-gray-800">{getFormData.address}</p>
              </div>

              <div>
                <label className="text-lg font-semibold text-black">City</label>
                <p className="text-lg text-gray-800">{getFormData.city}</p>
              </div>

              <div>
                <label className="text-lg font-semibold text-black">State</label>
                <p className="text-lg text-gray-800">{getFormData.state}</p>
              </div>

              <div>
                <label className="text-lg font-semibold text-black">Pin Code</label>
                <p className="text-lg text-gray-800">{getFormData.pincode}</p>
              </div>

              <div>
                <label className="text-lg font-semibold text-black">Qualification</label>
                <p className="text-lg text-gray-800">{getFormData.qualification}</p>
              </div>

              <div>
                <label className="text-lg font-semibold text-black">Experience</label>
                <p className="text-lg text-gray-800">{getFormData.experience}</p>
              </div>

              <div>
                <label className="text-lg font-semibold text-black">Enrollment Number</label>
                <p className="text-lg text-gray-800">{getFormData.enrollmentnumber}</p>
              </div>

              <div>
                <label className="text-lg font-semibold text-black">Register Number</label>
                <p className="text-lg text-gray-800">{getFormData.registernumber}</p>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={isEditing ? handleSaveProfile : handleEditProfile}
          className="mt-6 py-3 px-8 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          {isEditing ? "Save Profile" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
};

export default AdminProfileCard;