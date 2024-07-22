import React from "react";
import { FaWhatsapp, FaEnvelope, FaInstagram, FaTwitter } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-10 px-4 md:px-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-20">
        <div>
          <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-4 inline-block w-full">
            Who We Are
          </h2>
          <p className="mb-4 text-right">
            Laverne is the destination for perfume creativity in a style that
            combines luxury and uniqueness. From Riyadh to everywhere. We create
            perfumes that create the moment and immortalize the memory. We bet
            on being the standard taste and the certainty of choice.
          </p>
          <div className="flex flex-col items-end space-y-2 sm:flex-row sm:justify-end sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <FaWhatsapp />
              <span>WhatsApp</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaEnvelope />
              <span>Email</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-4 inline-block w-full">
            Important Links
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-2 gap-2">
            <a
              href="https://laverne.com/%D8%AE%D8%AF%D9%85%D8%A9-%D8%A7%D9%84%D8%B9%D9%85%D9%84%D8%A7%D8%A1/page-2122400225"
              className="hover:pointer"
            >
              customer service
            </a>
            <a href="https://laverne.com/" className="hover:pointer">
              Laverne's story
            </a>
            <a href="https://laverne.com/" className="hover:pointer">
              Terms and Conditions
            </a>
            <a
              href="https://laverne.com/%D8%A7%D9%84%D8%A3%D8%B3%D9%84%D8%A6%D8%A9-%D8%A7%D9%84%D8%B4%D8%A7%D8%A6%D8%B9%D8%A9/page-975587075"
              className="hover:pointer"
            >
              Frequently Asked Questions
            </a>
            <a
              href="https://laverne.com/%D8%B3%D9%8A%D8%A7%D8%B3%D8%A9-%D8%A7%D9%84%D8%A5%D8%B3%D8%AA%D8%B1%D8%AC%D8%A7%D8%B9-%D9%88-%D8%A7%D9%84%D8%A5%D8%B3%D8%AA%D8%A8%D8%AF%D8%A7%D9%84/page-2062769211"
              className="hover:pointer"
            >
              Return and exchange policy
            </a>
            <a
              href="https://laverne.com/%D9%85%D8%B9%D9%84%D9%88%D9%85%D8%A7%D8%AA-%D8%A7%D9%84%D8%B4%D8%AD%D9%86-%D9%88%D8%A7%D9%84%D8%AA%D9%88%D8%B5%D9%8A%D9%84/page-70754624"
              className="hover:pointer"
            >
              Shipping and delivery information
            </a>
            <a
              href="https://laverne.com/%D8%B3%D9%8A%D8%A7%D8%B3%D8%A9-%D8%A7%D9%84%D8%AE%D8%B5%D9%88%D8%B5%D9%8A%D8%A9/page-1444724801"
              className="hover:pointer"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-4 inline-block w-full">
            Connect with Us
          </h2>
          <div className="flex justify-end space-x-4">
            <a
              href="https://twitter.com/laverne"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-gray-400"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://www.instagram.com/laverneksa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-gray-400"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
