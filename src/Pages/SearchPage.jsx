import { useParams } from "react-router-dom";
import AnimeCard from "../Components/AnimeCard";

import { useAnimeContext } from "../Contexts/AnimeContexts";
import { useEffect, useState } from "react";
import { searchAnimes } from "../Services/api";

const SearchPage = () => {
    const { query } = useParams();
    const { error, setError, animes,setAnimes,loading,setLoading } = useAnimeContext();
    const [isFirstLoad, setIsFirstLoad] = useState(true); // Track first load
    const [fetching, setFetching] = useState(true);


    useEffect(() => {
        const loadAnimes = async () => {
            setLoading(true);
            setFetching(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                const searchedAnimes = await searchAnimes(query);
                if (searchedAnimes.length > 0) {
                    setAnimes(searchedAnimes);
                    setFetching(false);
                    setLoading(false);
                } else {

                    setTimeout(() => {
                        loadAnimes();
                    }, 2000);
                }

            } catch (err) {
                console.log(err);
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

            {/* {error && <div className="text-red-500">{error}</div>} */}

            {loading || fetching ? (

                <div className="text-center text-xl text-gray-300">
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
