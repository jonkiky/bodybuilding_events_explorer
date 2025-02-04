import Link from 'next/link';
import { FaAlignJustify } from "react-icons/fa";
import { useState, useEffect, useRef } from 'react';

const Header = (data) => {
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

  console.log(data);

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
        <Link href="/" legacyBehavior>
          <a target="_self" rel="noopener noreferrer">
            <h1 className="text-lg text-black font-sans flex-shrink-0">
              Bodybuilding Events Explorer (Beta Version)
            </h1>
          </a>
        </Link>
    
        
        {/* Buttons */}
        {data.ocb && (
          <div className="hidden sm:flex space-x-2 pl-8">
            <button className="text-sm bg-white text-slate-600 px-4 py-1 rounded-full border border-black whitespace-nowrap">
              OCB  
                <span
                className="w-4 h-4 rounded-full bg-red-500"
                title={data.ocb}
                 style={{
                  padding: "2px 7px",
                  color: "white",
                  marginLeft: "8px"
                }}
                >{data.ocb}</span>
            </button>
            {/*<button className="text-sm bg-white text-slate-600 px-4 py-1 rounded-full border border-black whitespace-nowrap">
              WNBF
            </button>
            <button className="text-sm bg-white text-slate-600 px-4 py-1 rounded-full border border-black whitespace-nowrap">
              NPC
            </button>
            <button className="text-sm bg-white text-slate-600 px-4 py-1 rounded-full border border-black whitespace-nowrap">
              IFBB
            </button>
            <button className="text-sm bg-white text-slate-600 px-4 py-1 rounded-full border border-black whitespace-nowrap">
              INBA
            </button>
            <button className="text-sm bg-white text-slate-600 px-4 py-1 rounded-full border border-black whitespace-nowrap">
              ANBF
            </button>
            <button className="text-sm bg-white text-slate-600 px-4 py-1 rounded-full border border-black whitespace-nowrap">
              NANBF
            </button>*/}
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
