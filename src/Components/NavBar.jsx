import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAnimeContext } from "../Contexts/AnimeContexts";
import { FaSearch } from "react-icons/fa";
import logo from '../assets/anipedia.png';
import { IoMdArrowDropdown } from "react-icons/io";

const NavBar = () => {
    const { error, setError, searchQuery, setSearchQuery, setAnimes,setLoading } = useAnimeContext();
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        try {
            setLoading(true);
            setAnimes([]);
            navigate(`/search/${encodeURIComponent(searchQuery)}`);
            setIsSearchVisible(false);
        } catch (err) {
            console.log(err);
            setError('Failed to Search Animes');
        }
    };

    const genres = [
        { id: 1, name: "Action" },
        { id: 2, name: "Adventure" },
        { id: 4, name: "Comedy" },
        { id: 8, name: "Drama" },
        { id: 10, name: "Fantasy" },
        { id: 14, name: "Horror" },
        { id: 22, name: "Romance" },
        { id: 24, name: "Sci-Fi" },
        { id: 30, name: "Sports" },
        { id: 36, name: "Slice of Life" },
        { id: 37, name: "Supernatural" },
        { id: 41, name: "Thriller" },
    ];

    const [isGenresOpen, setIsGenresOpen] = useState(false);

    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const dropdownRef = useRef(null);

    const toggleGenresDropdown = () => setIsGenresOpen(!isGenresOpen);

    const closeGenresDropdown = () => setIsGenresOpen(false);

    const toggleSearchBox = () => setIsSearchVisible(!isSearchVisible);


    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 415) {
                setIsSearchVisible(false); 
            }
        };

        window.addEventListener("resize", handleResize);


        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="navbar bg-[#1A1A1A] text-[#FFFFFF] py-3 shadow-lg sm:px-6 md:px-8 lg:px-10 xs:px-3 relative">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost hover:bg-[#FFA500] active:bg-[#E59400] lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#2E2E2E] rounded-box w-52">
                        <li><NavLink to="/" className={({ isActive }) => isActive ? "text-[#FFA500] text-md" : "text-md"}>Home</NavLink></li>
                        <li><NavLink to="/favorites" className={({ isActive }) => isActive ? "text-[#FFA500] text-md" : "text-md"}>Favorites</NavLink></li>
                        <li><NavLink to="/anime/popular" className={({ isActive }) => isActive ? "text-[#FFA500] text-md" : "text-md"}>Popular</NavLink></li>
                        <li><NavLink to="/anime/recent" className={({ isActive }) => isActive ? "text-[#FFA500] text-md" : "text-md"}>Recent</NavLink></li>

                        <li>
                            <div
                                onClick={toggleGenresDropdown}
                                className="text-md hover:text-[#FFA500] cursor-pointer flex justify-between items-center w-full"
                            >
                                Genres
                                <svg xmlns="http://www.w3.org/2000/svg" className="inline h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                            {isGenresOpen && (
                                <ul ref={dropdownRef} tabIndex={0} className="menu menu-sm p-2 shadow bg-[#2E2E2E] rounded-box w-52 absolute top-full mt-2 z-50 grid grid-cols-2 gap-2">
                                    {genres.map((genre) => (
                                        <li key={genre.id}>
                                            <NavLink
                                                to={`/anime/genre/${genre.name.toLowerCase()}`}
                                                className={({ isActive }) => isActive ? "text-[#FFA500] text-md" : "text-md hover:text-[#FFA500]"}
                                                onClick={closeGenresDropdown} // Close dropdown on genre click
                                            >
                                                {genre.name}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    </ul>
                </div>
                <Link to="/" className="text-3xl"><img src={logo} className="h-16 w-32" alt="AniPedia Logo" /></Link>
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
                    <li>
                        <NavLink
                            to="/anime/popular"
                            className={({ isActive }) =>
                                `hover:text-[#FFA500] ${isActive ? "text-[#FFA500] underline underline-offset-4" : ""}`
                            }
                        >
                            Popular
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/anime/recent"
                            className={({ isActive }) =>
                                `hover:text-[#FFA500] ${isActive ? "text-[#FFA500] underline underline-offset-4" : ""}`
                            }
                        >
                            Recent
                        </NavLink>
                    </li>

                    <li>
                        <div
                            onClick={toggleGenresDropdown}
                            className="text-md hover:text-[#FFA500] cursor-pointer flex justify-between items-center"
                        >
                            Genres
                            <IoMdArrowDropdown />
                        </div>
                        {isGenresOpen && (
                            <ul ref={dropdownRef} tabIndex={0} className="menu menu-sm p-2 shadow bg-[#2E2E2E] rounded-box w-60 absolute top-full mt-2 z-50 grid grid-cols-2 gap-y-1 gap-x-5">
                                {genres.map((genre) => (
                                    <li key={genre.id}>
                                        <NavLink
                                            to={`/anime/genre/${genre.name.toLowerCase()}`}
                                            className={({ isActive }) => isActive ? "text-[#FFA500] text-md" : "text-md hover:text-[#FFA500]"}
                                            onClick={closeGenresDropdown} 
                                        >
                                            {genre.name}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                </ul>
            </div>

            <div className="navbar-end">
                <button
                    onClick={toggleSearchBox}
                    className="btn xs:hidden bg-[#FFA500] hover:bg-[#E59400] text-white rounded-full px-3 py-2 transition-colors duration-200"
                >
                    <FaSearch />
                </button>

                <form onSubmit={handleSearch} className="hidden xs:flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Search for Anime..."
                        className="border-none rounded-md h-12 w-52 sm:w-56 bg-[#2E2E2E] text-[#CCCCCC] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600 rounded-r-none xs:rounded-r"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="btn bg-[#FFA500] hover:bg-[#E59400] text-white rounded-full px-6 py-2 transition-colors duration-200"
                    >
                        Search
                    </button>
                </form>
            </div>

    
            {isSearchVisible && (
                <div className="absolute top-full left-0 w-full bg-transparent px-4 z-50">
                    <form onSubmit={handleSearch} className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Search for Anime..."
                            className="border-none rounded-md h-12 w-full bg-[#2E2E2E] opacity-85 text-[#CCCCCC] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>
                </div>
            )}
        </div>
    );
};

export default NavBar;