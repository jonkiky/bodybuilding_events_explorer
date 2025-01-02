import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

const Header = () => {
  return (
    <header
      className="h-16 flex items-center justify-between border-b border-slate-200 w-full bg-white text-slate-600 px-4 fixed top-0"
      style={{
        zIndex: 1200,
      }}
    >
      {/* Logo and Buttons */}
      <div className="flex items-center">
        {/* Logo/Title */}
        <h1 className="text-lg text-black font-sans flex-shrink-0">
          Bodybuilding Events Explorer
        </h1>

        {/* Buttons */}
        <div className="hidden sm:flex space-x-2 pl-8">
          <button className="text-sm bg-white text-slate-600 px-4 py-1 rounded-full border border-black whitespace-nowrap">
            OCB
          </button>
          <button className="text-sm bg-white text-slate-600 px-4 py-1 rounded-full border border-black whitespace-nowrap">
            WNBF
          </button>
          {/*<button className="text-sm bg-white text-slate-600 px-4 py-1 rounded-full border border-black whitespace-nowrap">
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
      </div>

      {/* GitHub Button */}
      <div className="hidden sm:block">
        <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
          <button
            className="bg-white flex items-center whitespace-nowrap"
            aria-label="Go to GitHub"
          >
            <FaGithub className="text-black text-2xl" />
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
