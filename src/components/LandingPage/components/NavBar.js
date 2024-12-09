import React, { useEffect, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll event to track Y position
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="bg-default shadow-md">
      <div className="container mx-auto px-2 py-3 flex items-center justify-between">
        <Link to="/" className="text-white text-3xl font-semibold tracking-wide no-underline">
          Saathi
          <h6 style={{fontSize:'10px',}} className="no-underline ">An Etherium Technologies Venture</h6>
 
        </Link>
     
        <button
          className="text-white block lg:hidden focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
        <div className={`lg:flex ${open ? "block" : "hidden"} w-full lg:w-auto`}>
          <ul className="lg:flex lg:space-x-8 space-y-6 lg:space-y-0 mt-4 lg:mt-0">
            <li>
              <Link to="https://etheriumtech.com/index.html#home" className="text-white text-lg font-medium hover:text-gray-300 transition-colors duration-200 no-underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="https://etheriumtech.com/index.html#services" className="text-white text-lg font-medium hover:text-gray-300 transition-colors duration-200 no-underline">
                Services
              </Link>
            </li>
            <li>
              <Link to="https://etheriumtech.com/index.html#team" className="text-white text-lg font-medium hover:text-gray-300 transition-colors duration-200 no-underline">
                Team
              </Link>
            </li>
            <li className="relative group">
              <Link
                to="https://etheriumtech.com/index.html#products"
                className="text-white text-lg font-medium hover:text-gray-600 transition-colors duration-200 no-underline"
              >
                Products
              </Link>
              {/* <ul className="absolute hidden group-hover:block bg-gray-800 text-white mt-2 rounded-lg shadow-lg p-3">
                <li>
                  <a href="#" className="block px-4 py-2 hover:text-gray-300">
                    All Cures
                  </a>
                </li>
              </ul> */}
            </li>
            <li>
              <Link to="https://etheriumtech.com/index.html#contact" className="text-white text-lg font-medium hover:text-gray-300 transition-colors duration-200 no-underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
