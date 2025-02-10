import { useState } from 'react';
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { FaGlobe } from "react-icons/fa";
import logo from '../assets/header-logo.png'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
    <header className="bg-white flex justify-between items-center md:block px-4 py-2 shadow-2xl fixed top-0 right-0 w-screen z-30">
      <div className="flex justify-between items-center px-0 md:px-6">
        <div to="/" className="flex-shrink-0 flex-row flex items-center">
          <img src={logo} className='h-[4rem] w-[12rem]' alt="organization logo" />
        </div>
        <div className="hidden md:flex space-x-10">
          <span className='text-black cursor-pointer font-bold border-transparent hover:text-blue-500 transition-colors duration-300'>
            Inicio
          </span>
          <span className='text-black cursor-pointer font-bold border-transparent hover:text-blue-500 transition-colors duration-300'>
            Services
          </span>
          <span className='text-black cursor-pointer font-bold border-transparent hover:text-blue-500 transition-colors duration-300'>
            About us
            </span>
            <span className='text-black cursor-pointer font-bold border-transparent hover:text-blue-500 transition-colors duration-300'>
            Contacts
          </span>         
        </div>
        <div className="hidden md:flex items-center space-x-4">
            <FiSearch className="text-gray-600 text-2xl cursor-pointer border-r pr-3" />
            <div className='flex flex-row gap-1 items-center'>
                <FaGlobe className="text-gray-600 text-xl cursor-pointer" />
                <p className='uppercase p-0'>us(en)</p>
                </div>
        </div>
      </div>
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          {isOpen ? <IoMdClose /> : <IoMdMenu />} 
        </button>
      </div>
    </header>
  {isOpen && (
    <div className="md:hidden fixed top-20 left-0 w-full z-10">
      <div data-aos="flip-down" className="bg-white py-6 flex flex-col items-center space-y-2 shadow-lg">  
        <span className='text-black cursor-pointer font-bold border-transparent hover:text-blue-500 transition-colors duration-300'>
            Inicio
        </span>
        <span className='text-black cursor-pointer font-bold border-transparent hover:text-blue-500 transition-colors duration-300'>
            Services
        </span>
        <span className='text-black cursor-pointer font-bold border-transparent hover:text-blue-500 transition-colors duration-300'>
            About us
        </span>
        <span className='text-black cursor-pointer font-bold border-transparent hover:text-blue-500 transition-colors duration-300'>
            Contacts
        </span> 
          <div className="flex md:hidden flex-row items-center mt-2 space-x-4">
            <FiSearch className="text-gray-600 text-2xl cursor-pointer border-r pr-3" />
            <div className='flex flex-row gap-1 items-center'>
                <FaGlobe className="text-gray-600 text-xl cursor-pointer" />
                <p className='uppercase p-0'>us(en)</p>
                </div>
        </div>         
      </div>
    </div>
  )}
</div>
  );
};

export default Navbar;
