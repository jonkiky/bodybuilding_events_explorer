
const EventCard = (input) => {
  const data = input.data;
  return (
    <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-md flex overflow-hidden">
      {/* Image Section */}
      <img
        src={data.flyers}
        className="w-40 h-auto object-cover"
      />
      {/* Content Section */}
      <div className="p-2 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-800"> {data.name}</h3>
          <p className="text-sm">{data.address}</p>
            <p className="text-sm text-gray-800">{data.date}</p>
        </div>
        <div className="mt-2">
          <div className="mt-2 flex items-center text-gray-800">
              <button className="block w-full  px-4 py-2 text-sm bg-gray-700 rounded-lg text-white">
                    Event Website
               </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
