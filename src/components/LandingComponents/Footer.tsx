import React from 'react';
import {
  FaFacebook,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa6';
import Logo from '../../../public/logo.png';

const Footer: React.FC = () => {
  return (
    <footer className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-col items-center px-5 py-8 sm:flex-row">
        <a className="title-font text-gray-900 flex items-center justify-center font-medium md:justify-start">
          <img src={Logo} alt="Logo" width={40} />
        </a>
        <p className="text-gray-500 sm:border-gray-200 mt-4 text-sm sm:ml-4 sm:mt-0 sm:border-l-2 sm:py-2 sm:pl-4">
          © 2024 TMSSucess — All Rights Reserved
        </p>
        <span className="mt-4 inline-flex justify-center sm:ml-auto sm:mt-0 sm:justify-start">
          <a className="text-gray-500">
            <FaFacebook />
          </a>
          <a className="text-gray-500 ml-3">
            <FaXTwitter />
          </a>
          <a className="text-gray-500 ml-3">
            <FaInstagram />
          </a>
          <a className="text-gray-500 ml-3">
            <FaLinkedinIn />
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
