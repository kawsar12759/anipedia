import { useState } from 'react';
import { useAnimeContext } from '../Contexts/AnimeContexts';
import { Link } from 'react-router-dom';
import { FaHeart } from "react-icons/fa6";
const AnimeCard = ({ anime }) => {
    const { isFavorite, addToFavorites, removeFromFavorites } = useAnimeContext();
    const [isAnimating, setIsAnimating] = useState(false);

    const favorite = isFavorite(anime.mal_id);
    const onFavoriteClick = (e) => {
        e.preventDefault();
        e.stopPropagation(); 
        if (favorite) {
            removeFromFavorites(anime.mal_id);
        } else {
            addToFavorites(anime);
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 1000);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Finished Airing':
                return 'bg-green-600'; 
            case 'Currently Airing':
                return 'bg-blue-600'; 
            case 'Not yet aired':
                return 'bg-yellow-600'; 
            default:
                return 'bg-gray-600'; 
        }
    };

    return (
        <Link to={`/anime/details/${anime.mal_id}`} className="block h-full">
            <div className="relative bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto w-full group cursor-pointer h-full flex flex-col">

                <div className="relative w-full h-[440px] flex-shrink-0"> 
                    <img
                        src={anime.images?.jpg?.large_image_url || 'https://via.placeholder.com/300x440'} 
                        alt={anime.title}
                        className="w-full h-full object-cover"
                    />
              
                    <button
                        onClick={onFavoriteClick}
                        className={`absolute top-4 right-4 text-3xl transition-transform transform 
                            ${favorite ? "text-red-500" : "text-gray-400"} 
                            ${isAnimating ? "animate-ping" : ""}
                             hover:scale-110`}
                    >
                        <FaHeart />
                    </button>

                    {anime.aired?.prop?.from?.year && (
                        <div className="absolute bottom-4 left-4 bg-purple-600 text-white text-sm px-3 py-1 rounded-full">
                            {anime.aired.prop.from.year}
                        </div>
                    )}

                    {anime.status && (
                        <div className={`absolute bottom-4 right-4 ${getStatusColor(anime.status)} text-white text-sm px-3 py-1 rounded-full`}>
                            {anime.status}
                        </div>
                    )}
                </div>

                <div className="p-4 text-white flex flex-col flex-grow">
                    <h3 className="text-xl font-bold truncate mb-2 hover:text-[#FFA500] transition-colors">
                        {anime.title || "Untitled Anime"}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                        {anime.genres?.slice(0, 3).map((genre) => ( 
                            <span
                                key={genre.mal_id}
                                className="bg-[#232323] text-sm text-gray-300 px-2 py-1 rounded-full"
                            >
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    <div className="flex justify-between items-center mt-auto">
                        <p className="text-sm text-gray-300">
                            <span className="font-semibold">Episodes:</span> {anime.episodes || "N/A"}
                        </p>
                        <p className="text-sm font-medium">
                            ⭐ {anime.score || "N/A"}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default AnimeCard;