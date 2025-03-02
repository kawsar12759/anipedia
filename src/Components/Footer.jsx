import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/anipedia.png'; 
import { FaFacebookSquare } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";
const Footer = () => {
    return (
        <footer className="bg-[#1a1a1a] text-white py-8">
            <div className="mx-auto sm:px-6 md:px-8 lg:px-10 xs:px-3">
                <div className="flex flex-wrap justify-between">

                    <div className="w-full md:w-1/4 mb-6 md:mb-0">
                        <img src={logo} alt="Site Logo" className="h-24 w-44 mb-4" />
                        <p className="text-gray-400 w-3/4">
                            Your ultimate destination for exploring the world of anime and discovering the best anime series and movies.
                        </p>
                    </div>
                    
                    <div className="w-full md:w-1/4 mb-6 md:mb-0">
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul>
                            <li className="mb-2">
                                <Link to="/" className="text-gray-400 hover:text-white">Home</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/about" className="text-gray-400 hover:text-white">About Us</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
                            </li>
                        </ul>
                    </div>
                    {/* Social Media Links */}
                    <div className="w-full md:w-1/4 mb-6 md:mb-0">
                        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                <FaFacebookSquare className='h-6 w-6' />
                            </a>

                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                <AiFillInstagram className='h-6 w-6' />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                <FaYoutube className='h-6 w-6' />
                            </a>
                        </div>
                    </div>

                    <div className="w-full md:w-1/4">
                        <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                        <p className="text-gray-400 mb-4">
                            Subscribe to get the latest updates on new anime releases and more.
                        </p>
                        <form>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="search-input  w-full px-3 py-2 mb-4 bg-[#2E2E2E] text-[#CCCCCC] rounded border-none rounded-r-none xs:rounded-r focus:outline-none focus:ring-2 focus:ring-gray-600"
                            />
                            <button
                                type="submit"
                                className="btn border-0 w-full bg-[#FFA500] hover:bg-[#E59400] text-white  transition-colors duration-200 py-2 rounded"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} All rights reserved by AniPedia.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
