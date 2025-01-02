import React, { useState, useRef } from 'react';
import Head from 'next/head';
import Header from '@components/Header';
import Map from '@components/Map';
import styles from '@styles/Home.module.scss';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const DEFAULT_CENTER = [39.725810, -95.024968];

export default function Home() {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [eventType, setEventType] = useState("Event Type");
  const [divisionType, setDivisionType] = useState("Divisions");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const handleDropdownSelect = (setter, item) => {
    setter(item);
  };

  const eventTypeOptions = ["Any Event Type", "Amateur Competitions", "Pro Competitions", "WorkShop"];
  const divisionOptions = [
    "Any Division",
    "Men's Bodybuilding",
    "Men's Physique",
    "Men's Classic Physique",
    "Women's Physique",
    "Figure",
    "Bikini",
    "Wellness",
    "Debut"
  ];

  // Reference for scrolling
  const contentRefs = useRef({});

  // Sample data for markers
  const markerData = [
    { id: 1, position: [37.372040, -76.779449], popupText: '7575 Richmond Road, Williamsburg, VA 23188' },
    { id: 2, position: [39.256715, -76.731086], popupText: '800 S. Rolling Road Baltimore, MD 21228' },
    { id: 3, position: [39.256715, -76.731086], popupText: '800 S. Rolling Road Baltimore, MD 21228' },
    { id: 4, position: [39.256715, -76.731086], popupText: '800 S. Rolling Road Baltimore, MD 21228' },
    { id: 5, position: [39.256715, -76.731086], popupText: '800 S. Rolling Road Baltimore, MD 21228' },
    { id: 6, position: [39.256715, -76.731086], popupText: '800 S. Rolling Road Baltimore, MD 21228' },
  ];

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    // Scroll to related content
    const contentElement = contentRefs.current[marker.id];
    if (contentElement) {
      const container = contentElement.parentElement;
      container.scrollTop = contentElement.offsetTop;
    }
  };


  const card =
  <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-md flex overflow-hidden">
      {/* Image Section */}
      <img
        src="https://ocbonline.com/flyer_pics/4b0250793549726d5c1ea3906726ebfe.webp"
        className="w-40 h-auto object-cover"
      />
      {/* Content Section */}
      <div className="p-2 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-800">OCB Winter Classic </h3>
          <p className="text-sm">Tallahassee, FL</p>
            <p className="text-sm text-gray-800">January 18, 2025</p>
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


  return (
    <div className="h-screen w-screen flex flex-col">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <div className="flex flex-1 pt-16">
        {/* Left Section */}
        <div className="overflow-y-scroll no-scrollbar flex-none h-[calc(100vh-64px)] max-w-[380px] w-full bg-white border-r border-gray-300">
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

            {/* Event Type Dropdown */}
            <div className="flex items-center space-x-2">
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
                  leaveFrom="transform opacity-100 scale-100"
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
                  leaveFrom="transform opacity-100 scale-100"
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
              {markerData.map((marker) => (
                <div
                  key={marker.id}
                  ref={(el) => (contentRefs.current[marker.id] = el)}
                  className={`p-1  ${
                    selectedMarker?.id === marker.id ? 'bg-blue-100' : ''
                  }`}
                >
                {card}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Left Section Ends*/}

        {/* Right Section */}
        <div className="flex-1 bg-white block">
          <Map className={styles.homeMap} center={DEFAULT_CENTER} zoom={5}>
            {({ TileLayer, Marker, Popup }) => (
              <>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />

                {markerData.map((marker) => (
                  <Marker
                    key={marker.id}
                    position={marker.position}
                    eventHandlers={{
                      click: () => handleMarkerClick(marker),
                    }}
                  >
                    <Popup>
                      {marker.popupText}
                      {selectedMarker?.id === marker.id && <div>You clicked this marker!</div>}
                    </Popup>
                  </Marker>
                ))}
              </>
            )}
          </Map>
        </div>
      </div>
    </div>
  );
}
