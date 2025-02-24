import { createContext, useContext, useEffect, useState } from "react";

const AnimeContext = createContext();

export const useAnimeContext = () => useContext(AnimeContext);

export const AnimeProvider = ({ children }) => {

    const [animes, setAnimes] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [favorites, setFavorites] = useState(() => {
        const storedFavs = localStorage.getItem("favorites");
        return storedFavs ? JSON.parse(storedFavs) : [];
    });


    useEffect(() => {
        if (favorites.length > 0) {
            localStorage.setItem("favorites", JSON.stringify(favorites));
        }
    }, [favorites]);

    const addToFavorites = (anime) => {
        setFavorites(prev => [...prev, anime]);
    };

    const removeFromFavorites = (animeID) => {
        setFavorites(prev => prev.filter(anime => anime.mal_id !== animeID));
    };

    const isFavorite = (animeID) => {
        return favorites.some(anime => anime.mal_id === animeID);
    };

    const value = {
        animes,
        setAnimes,
        loading,
        setLoading,
        error,
        setError,
        favorites,
        searchQuery,
        setSearchQuery,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    };

    return <AnimeContext.Provider value={value}>{children}</AnimeContext.Provider>;
};
