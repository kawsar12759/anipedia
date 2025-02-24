import AnimeCard from '../Components/AnimeCard';
import { useAnimeContext } from '../Contexts/AnimeContexts';


const Favorites = () => {
    const { favorites } = useAnimeContext();
    if (favorites) {
        return (<div className='min-h-screen bg-[#232323] p-5'>

            {favorites.length != 0 ? (<><h2 className="text-center text-5xl text-[#FFA500] font-bold  pb-16">Your Favourite</h2><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-8">
                {favorites.map(anime => (<AnimeCard key={anime.id} anime={anime}></AnimeCard>))}
            </div></>) : <div className="favorite-empty">
                <h2>No Favorite Anime Added Yet!!</h2>
                <p>Start adding movies to yo</p>
            </div>}
        </div>)
    }
    return (
        <div className="favorite-empty">
            <h2>No Favorite Anime Added Yet!!</h2>
            <p>Start adding movies to yo</p>
        </div>
    );
};

export default Favorites;