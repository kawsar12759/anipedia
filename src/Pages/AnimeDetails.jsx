import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAnimeDetails } from '../Services/api';
import { FaStar, FaPlay, FaCalendarAlt, FaTv, FaClock, FaChartLine, FaExclamationCircle, FaHeart } from 'react-icons/fa';
import { useAnimeContext } from '../Contexts/AnimeContexts'; // Import the context

const AnimeDetails = () => {
    const { id } = useParams();
    const [anime, setAnime] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { isFavorite, addToFavorites, removeFromFavorites } = useAnimeContext();

    useEffect(() => {
        const getAnimeDetails = async () => {
            try {
                const data = await fetchAnimeDetails(id);
                setAnime(data);
            } catch (err) {
                setError("Failed to fetch anime details.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        getAnimeDetails();
    }, [id]);

    const onFavoriteClick = () => {
        if (isFavorite(anime.mal_id)) {
            removeFromFavorites(anime.mal_id);
        } else {
            addToFavorites(anime);
        }
    };

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center text-white bg-gray-900">
                <p className="text-lg animate-pulse">Loading anime details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-screen flex items-center justify-center text-red-500 bg-gray-900">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#232323] text-white py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-1/3">
                        <img
                            src={anime.images?.jpg?.large_image_url || 'https://via.placeholder.com/300x440'} 
                            alt={anime.title || "Untitled Anime"}
                            className="rounded-lg shadow-2xl w-full h-auto"
                        />

                        <button
                            onClick={onFavoriteClick}
                            className={`mt-6 w-full flex items-center justify-center space-x-2 py-2 rounded-lg hover:cursor-pointer
                                ${isFavorite(anime.mal_id) ? "bg-red-500" : "bg-gray-700 hover:bg-[#FFA500]"}`}
                        >
                            <FaHeart className={`text-xl ${isFavorite(anime.mal_id) ? "text-white" : "text-red-500"}`} />
                            <span className="text-white font-semibold">
                                {isFavorite(anime.mal_id) ? "Remove from Favorites" : "Add to Favorites"}
                            </span>
                        </button>

                        <div className="mt-6">
                            <h2 className="text-3xl font-bold">{anime.title || "Untitled Anime"}</h2>
                            <p className="text-gray-400 text-lg mt-2">{anime.title_japanese || "No Japanese Title"}</p>
                        </div>

                        <div className="mt-6 space-y-4">
                            <div className="flex items-center space-x-4">
                                <FaTv className="text-[#FFA500] text-xl" />
                                <div>
                                    <strong className="text-white">Type:</strong> {anime.type || "N/A"}
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <FaPlay className="text-[#FFA500] text-xl" />
                                <div>
                                    <strong className="text-white">Episodes:</strong> {anime.episodes || "N/A"}
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <FaCalendarAlt className="text-[#FFA500] text-xl" />
                                <div>
                                    <strong className="text-white">Aired:</strong> {anime.aired?.string || "N/A"}
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <FaExclamationCircle className="text-[#FFA500] text-xl" />
                                <div>
                                    <strong className="text-white">Status:</strong> {anime.status || "N/A"}
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <FaStar className="text-yellow-500 text-xl" />
                                <div>
                                    <strong className="text-white">Rating:</strong> {anime.score || "N/A"}
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <FaChartLine className="text-[#FFA500] text-xl" />
                                <div>
                                    <strong className="text-white">Rank:</strong> #{anime.rank || "N/A"}
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <FaClock className="text-[#FFA500] text-xl" />
                                <div>
                                    <strong className="text-white">Duration:</strong> {anime.duration || "N/A"}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="mb-8 text-center lg:text-left">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#FFA500] to-indigo-500 bg-clip-text text-transparent">
                                Watch the Trailer
                            </h1>
                            <p className="text-gray-400 mt-2">Get a sneak peek of {anime.title || "this anime"}</p>
                        </div>

                        {anime.trailer?.embed_url ? (
                            <div className="mb-8">
                                <iframe
                                    src={anime.trailer.embed_url}
                                    className="w-full h-64 md:h-[440px] rounded-lg shadow-lg"
                                    allowFullScreen
                                    title="Trailer"
                                />
                            </div>
                        ) : (
                            <div className="mb-8">
                                <p className="text-gray-400">No trailer available for this anime.</p>
                            </div>
                        )}

                        <div className="mb-8">
                            <h3 className="text-2xl font-semibold mb-4 text-[#FFA500]">Genres</h3>
                            <div className="flex flex-wrap gap-2">
                                {anime.genres?.length > 0 ? (
                                    anime.genres.map((genre) => (
                                        <span
                                            key={genre.mal_id}
                                            className="bg-gray-800 px-4 py-2 rounded-full text-sm hover:bg-[#FFA500] transition-colors"
                                        >
                                            {genre.name}
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-gray-400">No genres available.</p>
                                )}
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-2xl font-semibold mb-4 text-[#FFA500]">Synopsis</h3>
                            {anime.synopsis ? (
                                <p className="text-gray-300 leading-relaxed">{anime.synopsis}</p>
                            ) : (
                                <p className="text-gray-400">No synopsis available for this anime.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimeDetails;