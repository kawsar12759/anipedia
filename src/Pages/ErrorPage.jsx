import React from "react";
import { Link } from "react-router-dom";
import lostPng from '../../src/assets/lost.png'

const ErrorPage = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-[#232323] text-white">
            <h1 className="text-7xl font-bold text-red-500">404</h1>
            <p className="text-xl mt-4">Oops! The page you're looking for doesn't exist.</p>
            <img
                src={lostPng}
                alt="lost"
                className="w-64 h-64 mt-6 rounded-lg"
            />
            <div><Link
                to="/"
                className="mt-6  btn border-none w-full bg-[#FFA500] hover:bg-[#E59400] text-white  transition-colors duration-200 py-2 rounded"
            >
                Back to Home
            </Link></div>
        </div>
    );
};

export default ErrorPage;
