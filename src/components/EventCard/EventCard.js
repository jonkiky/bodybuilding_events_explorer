const EventCard = (input) => {
  const data = input.data;
  return (
    <div className="max-w-md mx-auto bg-white flex overflow-hidden">
      {/* Image Section */}
      <img
        src={data.flyers}
        className="w-40 h-auto object-cover"
        alt="Event Flyer"
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
