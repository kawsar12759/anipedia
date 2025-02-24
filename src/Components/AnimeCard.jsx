import { useState } from 'react';
import { useAnimeContext } from '../Contexts/AnimeContexts';

const AnimeCard = ({ anime }) => {
    const { isFavorite, addToFavorites, removeFromFavorites } = useAnimeContext();
    const [isAnimating, setIsAnimating] = useState(false);

    const favorite = isFavorite(anime.mal_id);
    const onFavoriteClick = (e) => {
        e.preventDefault();
        if (favorite) {
            removeFromFavorites(anime.mal_id);
        } else {
            addToFavorites(anime);
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 1000); 
        }
    };

    return (
        <div className="relative bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto w-full group">


            <div className="relative group">
                <img
                    src={anime.images.jpg.large_image_url}
                    alt={anime.title}
                    className="w-full h-[520px] object-cover"
                />

                <div className="absolute top-4 right-4 bg-[#3a3a3a] p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                        onClick={onFavoriteClick}
                        className={`text-3xl transition-transform transform hover:scale-110 
                            ${favorite ? "text-red-500" : "text-gray-400"} 
                            ${isAnimating ? "animate-ping" : ""}`}
                    >
                        ❤︎
                    </button>
                </div>
            </div>

            <div className="p-4 text-white">
                <h3 className="text-xl font-bold truncate mb-2">{anime.title}</h3>

                <div className="flex flex-wrap gap-2 mb-3">
                    {anime.genres.map((genre) => (
                        <span key={genre.mal_id} className="bg-[#232323] text-sm text-gray-300 px-2 py-1 rounded-full">
                            {genre.name}
                        </span>
                    ))}
                </div>


                <div className="flex justify-between items-center mb-3">
                    <p className="text-sm font-medium">
                        ⭐ {anime.score || "N/A"}
                    </p>
                    <p className="text-sm text-gray-300">
                        {anime.aired ? anime.aired.prop.from.year : "N/A"}
                    </p>
                </div>

                <div className="text-sm text-gray-300 space-y-1">
                    <p><span className="font-semibold">Episodes:</span> {anime.episodes || "N/A"}</p>
                    <p><span className="font-semibold">Status:</span> {anime.status || "N/A"}</p>
                </div>
            </div>
        </div>
    );
};

export default AnimeCard;
