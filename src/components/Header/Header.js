import Link from 'next/link';
import { FaAlignJustify } from "react-icons/fa";
import { useState, useEffect, useRef } from 'react';

const Header = ({ markerData }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const data = markerData || [];

  // Get distinct federation values and their counts
  const federationCounts = {};
  if (Array.isArray(data)) {
    data.forEach(item => {
      if (item.federation) {
        federationCounts[item.federation] = (federationCounts[item.federation] || 0) + 1;
      }
    });
  }

  console.log('Federation counts:', federationCounts);

  return (
    <>
    <header
      className="h-16 flex items-center justify-between border-b border-slate-200 w-full bg-white text-slate-600 px-4 fixed"
      style={{
        zIndex: 1200,
      }}
    >
   
      {/* Logo and Buttons */}
      <div className="flex items-center">
        {/* Logo/Title */}
          <a target="_self" href="/" rel="noopener noreferrer">
            <h1 className="text-lg text-black font-sans flex-shrink-0">
              Bodybuilding Events Explorer (Beta Version)
            </h1>
          </a>
    
        
        {/* Buttons */}
        {Object.keys(federationCounts).length > 0 && (
          <div className="hidden sm:flex space-x-2 pl-8">
            {Object.entries(federationCounts).map(([federation, count]) => (
              <button 
                key={federation}
                className="text-sm bg-white text-slate-600 px-4 py-1 rounded-full border border-black whitespace-nowrap"
              >
                {federation}
                <span
                  className="w-4 h-4 rounded-full bg-gray-600"
                  title={`${count} events`}
                  style={{
                    padding: "2px 7px",
                    color: "white",
                    marginLeft: "8px"
                  }}
                >
                  {count}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Dropdown Menu */}
      <div className="relative hidden sm:block" ref={dropdownRef}>
        <button
          className="bg-white flex items-center whitespace-nowrap"
          aria-label="Menu"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <FaAlignJustify />
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
            <Link href="/about" legacyBehavior>
              <a target="_blank" rel="noopener noreferrer">
                <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">About Us</span>
              </a>
            </Link>
            <Link href="https://github.com/jonkiky/bodybuilding_events_explorer" legacyBehavior>
              <a target="_blank" rel="noopener noreferrer">
                <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">GitHub Pages</span>
              </a>
            </Link>
          </div>
        )}
      </div>
    </header>
    </>
  );
};

export default Header;
