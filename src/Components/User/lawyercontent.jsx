const LawyerCard = ({ lawyer }) => {
    return (
      <article className="relative overflow-hidden rounded-lg shadow transition hover:shadow-lg">
        <img
          alt={`${lawyer.name}`}
          src={lawyer.image || "https://via.placeholder.com/300"} // Fallback image if none is provided
          className="absolute inset-0 h-full w-full object-cover"
        />
  
        <div className="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 pt-32 sm:pt-48 lg:pt-64">
          <div className="p-4 sm:p-6">
            <time className="block text-xs text-white/90"> Experience: {lawyer.experience} years </time>
  
            <a href="#">
              <h3 className="mt-0.5 text-lg font-semibold text-white">{lawyer.name}</h3>
            </a>
  
            <p className="mt-2 line-clamp-3 text-sm/relaxed text-white/95">
              Category: {lawyer.category}
            </p>
            <p className="text-sm text-white/80">
              Location: {lawyer.location}
            </p>
          </div>
        </div>
      </article>
    );
  };
  
  export default LawyerCard;
  