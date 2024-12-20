import axios from "axios";
import React, { useEffect, useState } from "react";

const Greeting = () => {
  const [greeting, setGreeting] = useState("");
  const getGreeting = () => {
    const hour = new Date().getHours();

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
          console.log(response);
  
          setGreeting(response.data);
          console.log("get res data====>", response.data.lawyers);
        } catch (error) {
          console.error("Error fetching profile data", error);
        }
      };
  
      fetchProfileData();
    }, [adminId]);

    if (hour >= 5 && hour < 12) {
      return `🌟 Good Morning,${greeting.name}!`;
    } else if (hour >= 12 && hour < 17) {
      return `🌞 Good Afternoon, ${greeting.name}!`;
    } else if (hour >= 17 && hour < 20) {
      return `🌆 Good Evening, ${greeting.name} !`;
    } else {
      return `🌙 Good Night, ${greeting.name} !`;
    }
  };

  return (
    <div className="w-full  flex items-center">
      <span className="text-2xl font-bold  text-gray-800">{getGreeting()}</span>
    </div>
  );
};

export default Greeting;
