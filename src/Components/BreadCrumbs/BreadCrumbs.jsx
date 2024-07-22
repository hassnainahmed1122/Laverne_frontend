import React from 'react';
import { FaHome, FaAngleLeft } from 'react-icons/fa';

const Breadcrumb = () => {
  return (
    <div className="flex justify-end items-center py-4 px-10">
      <nav className="flex items-center space-x-2 text-black-50">
        <span className="flex items-center">
          Login
        </span>
        <FaAngleLeft className="flex items-center" />
        <a href="/" className="flex items-center text-black-50">
          Home
          <FaHome className="ml-1" />
        </a>
      </nav>
    </div>
  );
}

export default Breadcrumb;
