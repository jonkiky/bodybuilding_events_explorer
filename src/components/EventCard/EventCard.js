const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1577221084712-45b0445d2b00?q=80&w=3098&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const EventCard = (input) => {
  const data = input.data;
  return (
    <div className="max-w-md mx-auto bg-white flex overflow-hidden">
      {/* Image Section */}
      <img
        src={data.flyers || DEFAULT_IMAGE}
        className="w-40 h-auto object-cover"
        alt="Event Flyer"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = DEFAULT_IMAGE;
        }}
      />
      {/* Content Section */}
      <div className="p-2 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{data.name}</h3>
          <p className="text-sm">{data.address}</p>
          <p className="text-sm text-gray-800">{data.date}</p>
        </div>
        <div className="mt-2">
          <div className="mt-2 flex items-center text-gray-800">
            <a
              href={data.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-4 py-2 text-sm bg-gray-700 rounded-lg text-white text-center"
            >
              Event Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
