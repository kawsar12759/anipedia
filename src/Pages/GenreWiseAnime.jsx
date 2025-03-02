import AnimeCard from "../Components/AnimeCard";
import { useEffect, useState } from "react";
import { getGenreWiseAnimes } from "../Services/api";
import { useParams } from "react-router-dom";
import { useAnimeContext } from "../Contexts/AnimeContexts";

const GenreWiseAnime = () => {
    const [loading, setLoading] = useState(true);
    const [anime, setAnime] = useState([]);
    const [page, setPage] = useState(1); 
    const [hasMore, setHasMore] = useState(true); 
    const [fetching, setFetching] = useState(false); 
    const [error, setError] = useState(null); 
    const { genre } = useParams(); 
    const { searchQuery, setSearchQuery } = useAnimeContext();

    useEffect(() => {
        setSearchQuery("");
    }, []);

    useEffect(() => {
        let isMounted = true; 

        const loadGenreWiseAnimeData = async () => {
            try {
                setFetching(true); 
                setError(null); 
                const genreWiseAnimes = await getGenreWiseAnimes(genre, page); 

                if (isMounted) {
                    if (genreWiseAnimes.length > 0) {
                  
                        setAnime((prevAnime) => [...prevAnime, ...genreWiseAnimes]);
                    } else {
                        setHasMore(false); 
                    }
                }
            } catch (err) {
                console.error(err);
                if (isMounted) {
                    setError("Failed to load data. Please try again later."); 
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                    setFetching(false); 
                }
            }
        };

        loadGenreWiseAnimeData();

        return () => {
            isMounted = false;
        };
    }, [genre, page]); 

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                    document.documentElement.offsetHeight - 100 && 
                !fetching &&
                hasMore
            ) {
                setPage((prevPage) => prevPage + 1); 
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [fetching, hasMore]); 


    return (
        <div className="min-h-screen bg-[#232323] text-white p-8">
            <h2 className="text-3xl text-[#FFA500] font-bold mb-12">
                {genre.charAt(0).toUpperCase() + genre.slice(1)} Anime
            </h2>

            {error && (
                <div className="text-center text-gray-400 mb-8">
                    <p>{error}</p>
                </div>
            )}

            {!error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-8">
                    {anime.map((anime) => (
                        <AnimeCard key={anime.id} anime={anime} />
                    ))}
                </div>
            )}

            {(loading || fetching) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-8 mt-8">
                    {[...Array(8)].map((_, index) => (
                        <div key={index} className="animate-pulse">
                            <div className="bg-gray-700 rounded-lg h-64"></div>
                            <div className="mt-2 bg-gray-700 h-4 w-3/4 rounded"></div>
                            <div className="mt-2 bg-gray-700 h-4 w-1/2 rounded"></div>
                        </div>
                    ))}
                </div>
            )}

          
        </div>
    );
};

export default GenreWiseAnime;