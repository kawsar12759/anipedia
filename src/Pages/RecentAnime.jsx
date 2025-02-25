
import AnimeCard from "../Components/AnimeCard";

import { useEffect, useState } from "react";
import { getRecentAnimes } from "../Services/api";

const RecentAnime = () => {
    const [loading, setLoading] = useState(true);
    const [recentAnime, setRecentAnime] = useState([]);

    useEffect(() => {
        const loadAnimeData = async () => {
            try {
                const popularAnimes = await getRecentAnimes();
                setRecentAnime(popularAnimes);

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadAnimeData();
    }, []);


    return (
        <div className="min-h-screen bg-[#232323] text-white p-5">
            <h2 className="text-3xl text-[#FFA500] font-bold mb-12">
                🆕 Recently Aired Anime
            </h2>

            {loading ? (

                <div className="text-center text-xl text-gray-300">
                    Loading results...

                </div>
            ) : (
                <>
                    {recentAnime?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-8">
                            {recentAnime.map((anime) => (
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

export default RecentAnime;