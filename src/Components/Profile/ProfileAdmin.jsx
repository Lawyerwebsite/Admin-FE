import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = [
  {
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
    image: null,
  },
];

// const navigate = useNavigate();

const AdminProfileCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [file, setFile] = useState(null);
  const [getFormData, setGetFormData] = useState(initialState);

  const adminId = localStorage.getItem("adminId");
  const token = localStorage.getItem("token");
  console.log(adminId);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7000/admin/lawyerprofile/?_id=${adminId}`,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        console.log(response);

        setGetFormData(response.data);
        console.log("get res data====>", response.data.lawyers);
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };

    fetchProfileData();
  }, [adminId]);

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
          // navigate(`/profile/${adminId}`);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    console.log(name, value);
   


    setGetFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
      ...(type === "file" && { fileOriginalName: files[0]?.name || "" }),

     
    }));
  };

  const handlePasswordChangeInput = (e) => {
    const { name, value } = e.target;
    try {
    } catch (error) {}
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return;
    }
  
    setPasswordData({ newPassword: "", confirmPassword: "" });
    setIsChangingPassword(false);
  };
  // const handleProfileImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) setProfileImage(URL.createObjectURL(file));
  // };
  const handleProfileImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setProfileImage(URL.createObjectURL(selectedFile)); 
      setFile(selectedFile); 
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      await axios
        .put(
          `http://localhost:7000/admin/upload-image/${formData._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          console.log(res.data.message);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
      alert("Profile image uploaded successfully.");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    }
  };
  console.log(getFormData);

  let formattedDate = "N/A"; // Default value if date is invalid or undefined
  if (getFormData.dob) {
    const date = new Date(getFormData.dob);
    if (!isNaN(date)) {
      formattedDate = date.toISOString().split("T")[0];
    } else {
      console.error("Invalid date value:", getFormData.dob);
    }
  }


  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto p-6 bg-gray-100 min-h-screen">
        {isEditing ? (
          // Edit Page
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={getFormData.name}
                  onChange={handleInputChange}
                  className="w-full border rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={getFormData.email}
                  onChange={handleInputChange}
                  className="w-full border rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  name="number"
                  value={getFormData.number}
                  onChange={handleInputChange}
                  className="w-full border rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formattedDate}
                  onChange={handleInputChange}
                  className="w-full border rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  name="gender"
                  value={getFormData.gender}
                  onChange={handleInputChange}
                  className="w-full border rounded-md p-2"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={getFormData.address}
                  onChange={handleInputChange}
                  className="w-full border rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={getFormData.city}
                  onChange={handleInputChange}
                  className="w-full border rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={getFormData.state}
                  onChange={handleInputChange}
                  className="w-full border rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pin Code
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={getFormData.pincode}
                  onChange={handleInputChange}
                  className="w-full border rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Qualification
                </label>
                <input
                  type="text"
                  name="qualification"
                  value={getFormData.qualification}
                  onChange={handleInputChange}
                  className="w-full border rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Experience
                </label>
                <input
                  type="text"
                  name="experience"
                  value={getFormData.experience}
                  onChange={handleInputChange}
                  className="w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Photo
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="w-full border rounded-md p-2"
                />
              </div>

              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={getFormData.bio}
                  onChange={handleInputChange}
                  className="w-full border rounded-md p-2"
                />
              </div>
            </div>
            <button
              onClick={handleSaveProfile}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Save Profile
            </button>
          </div>
        ) : (
          // Profile View Page
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
            <div className="flex gap-10 my-8 justify-around">
              <img
                src={`http://localhost:7000/upload/${getFormData.fileName}`}
                alt="profile image"
                className="rounded-full border-4 border-slate-500 h-[150px] w-[150px]"
              />
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <p className="text-gray-800">{getFormData.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <p className="text-gray-800">{getFormData.category}</p>
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Bio
                  </label>
                  <p className="text-gray-800">{getFormData.bio}</p>
                </div>
              </div>

              <div>
                <button
                  onClick={handleEditProfile}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Edit Profile
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <p className="text-gray-800">{getFormData.email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <p className="text-gray-800">{getFormData.number}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <p className="text-gray-800">{formattedDate}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <p className="text-gray-800">{getFormData.gender}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <p className="text-gray-800">{getFormData.address}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <p className="text-gray-800">{getFormData.city}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <p className="text-gray-800">{getFormData.state}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pin Code
                </label>
                <p className="text-gray-800">{getFormData.pincode}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Qualification
                </label>
                <p className="text-gray-800">{getFormData.qualification}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Experience
                </label>
                <p className="text-gray-800">{getFormData.experience}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfileCard;
