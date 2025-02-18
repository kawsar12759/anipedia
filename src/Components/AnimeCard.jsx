import '../css/AnimeCard.css'

const AnimeCard = ({ anime }) => {
    const onFavoriteClick = () => {
        alert('clicked');
    }
    return (
        <div className="anime-card">
            <div className="anime-poster">
                <img src={anime.images.jpg.image_url} alt={anime.title} />
                <div className="anime-overlay">
                    <button className="favorite-btn" onClick={onFavoriteClick}>❤︎</button>
                </div>
            </div>
            <div className="anime-info">
                <h3 className="anime-title">{anime.title}</h3>
            </div>
        </div>
    );
};

export default AnimeCard;