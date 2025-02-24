import { useParams } from "react-router-dom";
import AnimeCard from "../Components/AnimeCard";
import "../css/Home.css";
import { useAnimeContext } from "../Contexts/AnimeContexts";
import { useEffect, useState } from "react";
import { searchAnimes } from "../Services/api";

const SearchPage = () => {
    const { query } = useParams();
    const { animes, setAnimes, error, setError, loading, setLoading } = useAnimeContext();
    const [isFirstLoad, setIsFirstLoad] = useState(true); // Track first load

    useEffect(() => {
        const loadAnimes = async () => {
            setLoading(true);
            try {
                const searchedAnimes = await searchAnimes(query);
                setAnimes(searchedAnimes || []);
                setError(null);
            } catch (err) {
                console.log(err);
                setError("Failed to Load");
            } finally {
                setLoading(false);
                setIsFirstLoad(false);
            }
        };

        if (query) {
            loadAnimes();
        }
    }, [query]);

    return (
        <div className="min-h-screen bg-[#232323] text-white p-5">
            <h2 className="text-3xl text-[#FFA500] font-bold mb-12">
                Search Results for "{query}"
            </h2>

            {error && <div className="text-red-500">{error}</div>}

            {loading && isFirstLoad ? (

                <div className="loading text-center text-lg text-gray-300">
                    Loading results...
                </div>
            ) : (
                <>
                    {animes?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-8">
                            {animes.map((anime) => (
                                <AnimeCard key={anime.id} anime={anime} />
                            ))}
                        </div>
                    ) : (
                        !loading && <p className="text-gray-400">No results found.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default SearchPage;
