import React from "react";
import LawyerCard from "./CategoryCard";


const LawyerList = () => {
  const lawyers = [
    {
      id: 1,
      name: "John Doe",
      experience: 10,
      category: "Criminal",
      location: "New York",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    },
    {
      id: 2,
      name: "Jane Smith",
      experience: 8,
      category: "Corporate",
      location: "San Francisco",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    },
    {
      id: 3,
      name: "Mike Johnson",
      experience: 15,
      category: "Family",
      location: "Los Angeles",
      image: "https://images.unsplash.com/photo-1563122870-6f134e09b96e",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Our Lawyers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lawyers.map((lawyer) => (
          < LawyerCard key={lawyer.id} lawyer={lawyer} />
        ))}
      </div>
    </div>
  );
};

export default LawyerList;
