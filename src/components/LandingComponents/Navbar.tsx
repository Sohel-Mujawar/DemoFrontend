import Logo from '../../../public/logo.png';
import React, {useState} from 'react';
import {BiLogoPlayStore} from 'react-icons/bi';
import {GiHamburgerMenu} from 'react-icons/gi';
import {RxCross2} from 'react-icons/rx';
import {Link} from 'react-scroll';
import {Link as Link2} from '@tanstack/react-router';

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-gray-200 start-0 top-0 z-20 w-full border-b bg-white md:fixed">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link
          to="home"
          smooth={true}
          duration={500}
          offset={-500}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={Logo} alt="Logo" width={60} />
        </Link>
        <div className="flex space-x-3 md:order-2 rtl:space-x-reverse">
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="text-gray-500 hover:bg-gray-100 focus:ring-gray-200 inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm focus:outline-none focus:ring-2 md:hidden"
            aria-controls="navbar-sticky"
            aria-expanded="false"
            onClick={() => setOpen(!open)} // Toggles the menu
          >
            <span className="sr-only">Open main menu</span>
            {!open ? <GiHamburgerMenu /> : <RxCross2 />}
          </button>
        </div>
        <div
          className={`${
            open ? 'block' : 'hidden'
          } w-full md:order-1 md:flex md:w-auto`}
          id="navbar-sticky"
        >
          <ul className="border-gray-100 bg-gray-50 mt-4 flex flex-col items-center rounded-lg border p-4 font-medium md:mt-0 md:flex-row md:space-x-4 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse">
            <li>
              <Link
                to="home"
                smooth={true}
                duration={500}
                offset={-150}
                className="hover:text-purple block cursor-pointer px-4 py-2 font-normal transition-all duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="hero"
                smooth={true}
                duration={500}
                offset={0}
                className="hover:text-purple block cursor-pointer px-4 py-2 font-normal transition-all duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <a
                href="/businessplan.pdf"
                download="businessplan.pdf"
                className="hover:text-purple block cursor-pointer px-4 py-2 font-normal transition-all duration-300"
              >
                Business Plan
              </a>
            </li>
            <li>
              <Link
                to="faq"
                smooth={true}
                duration={500}
                offset={-40}
                className="hover:text-purple block cursor-pointer px-4 py-2 font-normal transition-all duration-300"
              >
                FAQs
              </Link>
            </li>
            <li>
              <Link
                to="testimonials"
                smooth={true}
                duration={500}
                offset={-40}
                className="hover:text-purple block cursor-pointer px-4 py-2 font-normal transition-all duration-300"
              >
                Testimonials
              </Link>
            </li>
            <li>
              <Link
                to="contact"
                smooth={true}
                duration={500}
                offset={-90}
                className="hover:text-purple block cursor-pointer px-4 py-2 font-normal transition-all duration-300"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link2
                to="/signin"
                className="hover:text-purple block cursor-pointer px-4 py-2 font-normal transition-all duration-300"
              >
                Login
              </Link2>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
