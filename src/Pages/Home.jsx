import { useEffect, useState } from "react";
import AnimeCard from "../Components/AnimeCard";
import '../css/Home.css'
import { searchAnimes, getPopularAnimes } from "../Services/api";
const Home = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [animes, setAnimes] = useState([]);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(true);
    useEffect(() => {
        const loadPopolarAnimes = async () => {
            try {
                const popularAnimes = await getPopularAnimes()
                setAnimes(popularAnimes)
            } catch (err) { 
                console.log(err)
                setError("Failed to Load")
            }
            finally { 
                setLoading(false)
            }
        }
        loadPopolarAnimes()
    }, [])
    const handleSearch = (e) => {
        e.preventDefault();
        alert(searchQuery);
    }
    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input type="text" placeholder="Search for animes...." className="search-input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <button type="submit" className="search-btn">Search</button>
            </form>
            <div className="animes-grid">
                {animes.map(anime => (<AnimeCard key={anime.id} anime={anime}></AnimeCard>))}
            </div>
        </div>
    );
};

export default Home;