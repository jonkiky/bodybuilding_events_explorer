import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Header from '@components/Header';
import Map from '@components/Map';
import EventCard from '@components/EventCard';
import styles from '@styles/Home.module.scss';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { data } from './data/data.json';



// Dynamically import Leaflet to avoid SSR issues
const L = dynamic(() => import('leaflet'), { ssr: false });


export default function Home() {
  
  let rawData = data;
   const [L, setL] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [eventType, setEventType] = useState("Event Type");
  const [divisionType, setDivisionType] = useState("Divisions");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [federation, setFederation] = useState("Federation/Competition"); // New State for Competitions/Federations
  const [center, setCenter] = useState([39.725810, -95.024968]);
  const [showDetailCard, setShowDetailCard] = useState(false);


   // Filter options for Competitions/Federations
  const federationOptions = ["All", "OCB"];

 useEffect(() => {
    (async () => {
      const leaflet = await import('leaflet');
      setL(leaflet);
    })();
  }, []);


  // Sample data for markers
  const getFilteredData = (data) => {
  return data
    .filter((marker) => {
      if (!marker) return false; // Skip null or undefined markers

      const eventTypeMatch =
        eventType === "Event Type" || eventType === "All Event Type" || marker.eventType?.includes(eventType);
      const divisionTypeMatch =
        divisionType === "Divisions" || divisionType === "All Division" || marker.divisions?.includes(divisionType);
       const federationMatch =
          federation === "Federation/Competition" || federation === "All" || marker.federation?.includes(federation); // New Filter Logic

      const markerDate = new Date(marker.date);
      const startDate = dateRange.start ? new Date(dateRange.start) : null;
      const endDate = dateRange.end ? new Date(dateRange.end) : null;

      const dateRangeMatch =
        (!startDate || markerDate >= startDate) &&
        (!endDate || markerDate <= endDate);

        return eventTypeMatch && divisionTypeMatch && federationMatch && dateRangeMatch;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB; // Ascending order
    });
};

  // let markerData = data;
  let markerData = getFilteredData(rawData);


  const handleDropdownSelect = (setter, item) => {
    setter(item);
  };

  const eventTypeOptions = [
  "All Event Type", 
  "Amateur Competition",
  "Pro Competition",
  "Pro Qualifier",
  "Yorton Cup Qualifier",
  "Body Transformation Challenge",
  "workshop"];

  const divisionOptions = [
    "All Division",
    "Men's Bodybuilding",
    "Men's Physique",
    "Men's Classic Physique",
    "Women's Physique",
    "Figure",
    "Bikini",
    "Women's Wellness",
    "Iron Angels",
    "Transformation",
    "Heroes",
    "Pro Men's Physique",
    "Pro Bikini",
    "Pro Women's Physique",
    "Pro Figure",
    "Pro Men's Classic Physique",
    "Pro Women's Wellness",
    "Body Transformation Challenge",
    "Teen"
  ];

  // Reference for scrolling
  const contentRefs = useRef({});

 
  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setShowDetailCard(true);
    // Scroll to related content
    const contentElement = contentRefs.current[marker.id];
    if (contentElement) {
      const container = contentElement.parentElement;
      container.scrollTop = contentElement.offsetTop;
    }
  };

 const getCustomIcon = (federation, isSelected = false) => {
    if (!L) return null; // Ensure Leaflet is available

    const colorMapping = {
    OCB: '#07689F', // Blue
    NPC: '#FF7E67', // Green
    IFBB: '#FF4500', // Red
    Default: '#808080', // Gray
  };

    const color = colorMapping[federation] || '#808080'; 
    const selectedColor = isSelected ? '#DE3163' : color; // Use gold color if selected

    const svgMarker = `
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 30 40">
        <path fill="${selectedColor}" d="M15 0C9.5 0 5 4.5 5 10c0 7.5 10 20 10 20s10-12.5 10-20C25 4.5 20.5 0 15 0zM15 15c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"/>
      </svg>
    `;

    return L.divIcon({
      html: svgMarker,
      className: '',
      iconSize: [30, 40],
      iconAnchor: [15, 40],
      popupAnchor: [0, -40],
    });
  };

  const handleMarkerMouseOver = (marker) => {
    setSelectedMarker(marker);
  };

  const handleEventouseOver = (marker) => {
    if (marker.position) {
      setCenter(marker.position);
    }
    setSelectedMarker(marker);
  };

  const handleEventCardClick = (marker) => {
    setSelectedMarker(marker);
    setShowDetailCard(true);
  };

  if (!L) {
    return <div>Loading...</div>; // Show a loading message while Leaflet is initializing
  }

  return (
    <div className="h-screen w-screen flex flex-col">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header ocb={markerData.length}/>

      <div className="flex flex-1 pt-16">
        {/* Left Section */}
        <div className={`overflow-y-scroll no-scrollbar flex-none h-[calc(100vh-64px)] max-w-[380px] w-full bg-white border-r border-gray-300 ${showDetailCard ? 'hidden' : ''}`}>
           <div className="pt-4 pb-3 pl-4 pr-4">
          {/* Date Pickers */}
            <div className="flex items-center space-x-4 mt-0 mb-5">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700" htmlFor="start-date">
                  Start Date
                </label>
                <input
                  type="date"
                  id="start-date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  className="mt-1 p-2 h-8 border block w-full border-black shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700" htmlFor="end-date">
                  End Date
                </label>
                <input
                  type="date"
                  id="end-date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  className="mt-1 p-2 h-8 border block w-full border-black shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

          {/* Federation Dropdown */}
            <div className="flex items-center space-x-2">
              <Menu as="div" className="relative inline-block text-left flex-1">
                <div>
                  <Menu.Button className="inline-flex justify-between w-full rounded-sm border border-black shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    {federation}
                    <svg
                      className="-mr-1 ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06-.02L10 10.664l3.71-3.473a.75.75 0 111.04 1.084l-4.25 3.973a.75.75 0 01-1.04 0l-4.25-3.973a.75.75 0 01-.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute left-0 mt-2 w-full rounded-sm shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="py-1">
                      {federationOptions.map((item, index) => (
                        <Menu.Item key={index}>
                          {({ active }) => (
                            <button
                              onClick={() => handleDropdownSelect(setFederation, item)}
                              className={`${
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                              } block w-full text-left px-4 py-2 text-sm`}
                            >
                              {item}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>


            {/* Event Type Dropdown */}
            <div className="flex items-center space-x-2 pt-4">
              <Menu as="div" className="relative inline-block text-left flex-1">
                <div>
                  <Menu.Button className="inline-flex justify-between w-full rounded-sm border border-black shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    {eventType}
                    <svg
                      className="-mr-1 ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06-.02L10 10.664l3.71-3.473a.75.75 0 111.04 1.084l-4.25 3.973a.75.75 0 01-1.04 0l-4.25-3.973a.75.75 0 01-.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute left-0 mt-2 w-full rounded-sm shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="py-1">
                      {eventTypeOptions.map((item, index) => (
                        <Menu.Item key={index}>
                          {({ active }) => (
                            <button
                              onClick={() => handleDropdownSelect(setEventType, item)}
                              className={`${
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                              } block w-full text-left px-4 py-2 text-sm`}
                            >
                              {item}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>

            {/* Division Type Dropdown */}
            <div className="flex items-center space-x-2 mt-4">
              <Menu as="div" className="relative inline-block text-left flex-1">
                <div>
                  <Menu.Button className="inline-flex justify-between w-full rounded-sm border border-black shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    {divisionType}
                    <svg
                      className="-mr-1 ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06-.02L10 10.664l3.71-3.473a.75.75 0 111.04 1.084l-4.25 3.973a.75.75 0 01-1.04 0l-4.25-3.973a.75.75 0 01-.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute left-0 mt-2 w-full rounded-sm shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="py-1">
                      {divisionOptions.map((item, index) => (
                        <Menu.Item key={index}>
                          {({ active }) => (
                            <button
                              onClick={() => handleDropdownSelect(setDivisionType, item)}
                              className={`${
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                              } block w-full text-left px-4 py-2 text-sm`}
                            >
                              {item}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
           
          </div>
           {/* Separator */}
          <hr className="my-4 border-gray-300 mr-2 ml-2" />
          
          <div className="p-3">
            <div className="space-y-1">
             {markerData && markerData.length > 0 ? (
                markerData.map((marker) => (
                  <div
                    key={marker.id}
                    ref={(el) => (contentRefs.current[marker.id] = el)}
                    className={`p-1 cursor-pointer border border-gray-200 rounded-lg shadow-md ${selectedMarker?.id === marker.id ? 'bg-grey-100' : ''}`}
                    onMouseOver={() => handleEventouseOver(marker)}
                    onClick={() => handleEventCardClick(marker)}
                    style={{ transition: 'box-shadow 0.3s'}}
                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)'}
                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                  >
                    <EventCard data={marker} />
                  </div>
                ))
              ) : ""}
            </div>
          </div>
        </div>
        {/* Left Section Ends*/}

        {/* Detailed Event Card */}
        {showDetailCard && selectedMarker && (
          <div className="flex-none h-[calc(100vh-64px)] max-w-[380px] w-full bg-white border-r border-gray-300 pt-4 pl-4 pr-4 pb-16 overflow-y-scroll">
            <button onClick={() => setShowDetailCard(false)} className="mb-4 text-black">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="11" stroke="black" strokeWidth="2" fill="none" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <div className='w-ful max-h-64 overflow-hidden  rounded-sm'>
                <img src={selectedMarker.flyers} alt="event image" className='w-ful'/>
              </div>
              <div className="flex items-center pt-5">
                <h2 className="text-xl font-bold">{selectedMarker.popupText}</h2>
              </div>
              <div>
                <p className="pt-3 pb-3">{selectedMarker.link && (
                  <a href={selectedMarker.link} target="_blank" rel="noopener noreferrer" className="text-black border border-black px-2 py-1 rounded-lg">
                    Website
                  </a>
                )}</p>
                <p><strong>Date:</strong> {selectedMarker.date}</p>
                <p><strong>Address:</strong> {selectedMarker.fullAddress}</p>
                <p><strong>Event Type:</strong></p>
                <ul className="list-disc list-inside">
                  {selectedMarker.eventType.map((type, index) => (
                    <li key={index}>{type}</li>
                  ))}
                </ul>
                <p><strong>Divisions:</strong></p>
                <ul className="list-disc list-inside">
                  {selectedMarker.divisions.map((division, index) => (
                    <li key={index}>{division}</li>
                  ))}
                </ul>
                <p><strong>Federation:</strong> {selectedMarker.federation}</p>
              </div>
              {/* Add more fields as necessary */}
            </div>
          </div>
        )}

        {/* Right Section */}
        <div className="flex-1 bg-white block">
          <Map className={styles.homeMap} center={center} zoom={5}>
            {({ TileLayer, Marker, Popup }) => (
              <>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />

                 {markerData && markerData.length > 0 ? (
                  markerData.map((marker) => (
                  <Marker
                    key={marker.id}
                    position={marker.position}
                    icon={getCustomIcon(marker.federation, marker.id === selectedMarker?.id)} // Assign custom icon here
                    eventHandlers={{
                      click: () => handleMarkerClick(marker),
                      mouseover: () => handleMarkerMouseOver(marker),
                    }}
                  >
                    <Popup>
                      <b>{marker.popupText}</b>
                      <p> Date : {marker.date} </p>
                      <p> Address : {marker.fullAddress} </p>
                      
                    </Popup>
                  </Marker>
                ))):""}
              </>
            )}
          </Map>
        </div>
      </div>
    </div>
  );
}
