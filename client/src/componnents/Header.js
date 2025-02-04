// Navbar.js
import React from 'react';

function Header() {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-around list-none m-0 p-0">
        <li>
          <a href="/" className="text-white hover:text-gray-400">Home</a>
        </li>
        <li>
          <a href="/about" className="text-white hover:text-gray-400">About</a>
        </li>
        <li>
          <a href="/contact" className="text-white hover:text-gray-400">Contact</a>
        </li>
      </ul>
    </nav>
  );
}

export default Header;