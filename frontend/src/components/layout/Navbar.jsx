import React from "react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
      <div className="flex items-center gap-2">
        {/* Logo aquí */}
        <span className="text-lime-500 font-bold text-xl">LOGO</span>
      </div>
      <ul className="flex gap-8 text-gray-700 font-medium">
        <li><a href="#" className="hover:text-lime-500 transition">Inicio</a></li>
        <li><a href="#" className="hover:text-lime-500 transition">Servicios</a></li>
        <li><a href="#" className="hover:text-lime-500 transition">Productos</a></li>
        <li><a href="#" className="hover:text-lime-500 transition">Contacto</a></li>
      </ul>
      <div>
        <button className="text-lime-500 hover:text-lime-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 008.48 18h7.04a2 2 0 001.83-2.7L17 13M7 13V6a1 1 0 011-1h9a1 1 0 011 1v7" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
