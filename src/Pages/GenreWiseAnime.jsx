import AnimeCard from "../Components/AnimeCard";

import { useEffect, useState } from "react";
import { getGenreWiseAnimes, getPopularAnimes } from "../Services/api";
import { useParams } from "react-router-dom";
import { useAnimeContext } from "../Contexts/AnimeContexts";

const GenreWiseAnime = () => {
    const [loading, setLoading] = useState(true);
    const [anime, setAnime] = useState([]);
    const { genre } = useParams();
    const [fetching, setFetching] = useState(true);
    const { searchQuery, setSearchQuery } = useAnimeContext();

    useEffect(() => {
        setSearchQuery("")
    }, [])

    useEffect(() => {
        const loadGenreWiseAnimeData = async () => {
            try {
                const genreWiseAnimes = await getGenreWiseAnimes(genre);
                if (genreWiseAnimes.length > 0) {
                    setAnime(genreWiseAnimes);
                    setFetching(false);
                } else {

                    setTimeout(() => {
                        loadGenreWiseAnimeData();
                    }, 1000);
                }

            } catch (err) {
                console.error(err);
                setTimeout(() => {
                    loadGenreWiseAnimeData();
                }, 1000);
            } finally {
                setLoading(false);
            }
        };
        loadGenreWiseAnimeData();
    }, [genre]);


    return (
        <div className="min-h-screen bg-[#232323] text-white p-5">
            <h2 className="text-3xl text-[#FFA500] font-bold mb-12">
                {genre.charAt(0).toUpperCase() + genre.slice(1)} Anime
            </h2>

            {loading || fetching ? (

                <div className="text-center text-xl text-gray-300">
                    Loading results...

                </div>
            ) : (
                <>
                    {anime?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-8">
                            {anime.map((anime) => (
                                <AnimeCard key={anime.id} anime={anime} />
                            ))}
                        </div>
                    ) : (
                        !loading && !noAnimeFound && <p className="text-gray-400">No results found.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default GenreWiseAnime;