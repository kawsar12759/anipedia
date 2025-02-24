


import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAnimeContext } from "../Contexts/AnimeContexts";
import { FaSearch } from "react-icons/fa";
import logo from '../assets/anipedia.png'

const NavBar = () => {
    
    const {  error, setError,searchQuery, setSearchQuery } = useAnimeContext();
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        
        e.preventDefault();
        console.log("Hello from without block");
        if (!searchQuery.trim()) return;

        try {
            navigate(`/search/${encodeURIComponent(searchQuery)}`);
        } catch (err) {
            console.log(err);
            setError('Failed to Search Animes');
        } finally {
            // setSearchQuery("");
        }
    };

    return (
        <div className="navbar bg-[#1A1A1A] text-[#FFFFFF] py-3 shadow-lg sm:px-6 md:px-8 lg:px-10 xs:px-3">
      
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost hover:bg-[#FFA500] active:bg-[#E59400] lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#2E2E2E]  rounded-box w-52">
                        <li><NavLink to="/" className={({ isActive }) => isActive ? "text-[#FFA500] text-md" : "text-md"}>Home</NavLink></li>
                        <li><NavLink to="/favorites" className={({ isActive }) => isActive ? "text-[#FFA500] text-md" : "text-md"}>Favorites</NavLink></li>
                    </ul>
                </div>
                <Link to="/" className="text-3xl"><img src={logo} className="h-16 w-32" alt="" /></Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal text-lg px-1 gap-2">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `hover:text-[#FFA500] ${isActive ? "text-[#FFA500] underline underline-offset-4" : ""}`
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/favorites"
                            className={({ isActive }) =>
                                `hover:text-[#FFA500] ${isActive ? "text-[#FFA500] underline underline-offset-4" : ""}`
                            }
                        >
                            Favorites
                        </NavLink>
                    </li>
                </ul>
            </div>


            <div className="navbar-end">
                <form onSubmit={handleSearch} className="flex items-center xs:gap-2">
                    <input
                        type="text"
                        placeholder="Search for Anime..."
                        className="search-input h-12 w-40 xs:w-56 bg-[#2E2E2E] text-[#CCCCCC] px-4 py-2 rounded-full focus:outline-none rounded-r-none xs:rounded-r focus:ring-2 focus:ring-[#FFA500]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} 
                    />
                    <button
                        type="submit"
                        className="btn hidden xs:block bg-[#FFA500] hover:bg-[#E59400] text-white rounded-full px-6 py-2 transition-colors duration-200"
                    >
                        Search
                    </button>
                    <button
                        type="submit"
                        className="btn rounded-l-none border-none h-12 xs:hidden bg-[#FFA500] hover:bg-[#E59400] text-white transition-colors duration-200"
                    >
                        <FaSearch />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NavBar;
