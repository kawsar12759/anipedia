import { useEffect } from 'react';
import { useAnimeContext } from '../Contexts/AnimeContexts';
import AnimeCard from '../Components/AnimeCard';
import { useNavigate } from 'react-router-dom';
import { ImCross } from "react-icons/im";
const Favorites = () => {
    const { favorites, setSearchQuery, removeFromFavorites } = useAnimeContext();
    const navigate = useNavigate();
    useEffect(() => {
        setSearchQuery("");
    }, []);

    return (
        <div className="min-h-screen  bg-[#232323] p-8">
            <div className='container mx-auto'>{favorites.length !== 0 ? (
                <>
                    <h2 className="text-center text-5xl text-[#FFA500] font-bold pb-16">
                        Your Favorites
                    </h2>
                    <div className="space-y-4 ">
                        {favorites.map((anime) => (
                            <div
                                key={anime.mal_id}
                                className="xs:flex  justify-between bg-gray-800 rounded-lg p-4 shadow-lg hover:bg-gray-700 transition-colors"
                            >
                                <div onClick={() => navigate(`/anime/details/${anime.mal_id}`)} className='xs:flex items-center w-full'>
                                    <div className='block xs:h-full'>
                                        <img
                                            src={anime.images?.jpg?.large_image_url}
                                            alt={anime.title}
                                            className="w-full xs:w-36 md:w-40 xs:h-full object-cover rounded-md"
                                        />
                                    </div>
                                    <div className='flex w-full flex-col items-start'>
                                        <div className="ml-1 mt-2 mb-4 xs:mt-0 xs:mb-0 xs:ml-4">
                                            <h3 className="text-xl font-bold text-white">
                                                {anime.title}
                                            </h3>
                                            <p className="text-gray-400 text-sm mt-1">
                                                {anime.title_japanese}
                                            </p>

                                            <p className="text-yellow-500">⭐ {anime.score || "N/A"}</p>
                                            <p className="text-gray-400">
                                                Episodes: {anime.episodes || "N/A"}
                                            </p>

                                        </div>
                                    </div>
                                </div>
                                <div className='ml-3 flex items-center justify-center'><button
                                    onClick={() => removeFromFavorites(anime.mal_id)}
                                    className="text-red-500 text-xl  transition-colors border-2 p-3 rounded-full hover:bg-red-500 hover:text-gray-800 hover:bg-opacity-10 active:scale-90"
                                >
                                    <ImCross />
                                </button></div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="text-[#FFA500] text-center text-3xl font-semibold mt-16">
                    <h2>No Favorite Anime Added Yet!!</h2>
                </div>
            )}</div>
        </div>
    );
};

export default Favorites;