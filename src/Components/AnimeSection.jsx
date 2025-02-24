import { useEffect, useState, useRef } from "react";
import { getPopularAnimes, getRecentAnimes, getUpcomingAnimes } from "../Services/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
const AnimeSection = () => {
    const [popularAnime, setPopularAnime] = useState([]);
    const [recentAnime, setRecentAnime] = useState([]);
    const [upcomingAnime, setUpcomingAnime] = useState([]);
    const [loading, setLoading] = useState(true);

    const prevPopularRef = useRef(null);
    const nextPopularRef = useRef(null);

    const prevRecentRef = useRef(null);
    const nextRecentRef = useRef(null);

    const prevUpcomingRef = useRef(null);
    const nextUpcomingRef = useRef(null);

    useEffect(() => {
        const loadAnimeData = async () => {
            try {
                const popularAnimes = await getPopularAnimes();
                setPopularAnime(popularAnimes.slice(0, 15));

                const recentAnimes = await getRecentAnimes();
                setRecentAnime(recentAnimes.slice(0, 15));

                await new Promise((resolve) => setTimeout(resolve, 1000));

                const upcomingAnimes = await getUpcomingAnimes();
                setUpcomingAnime(upcomingAnimes.slice(0, 15));

            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        loadAnimeData();
    }, []);

    const renderAnimeCarousel = (animeList, categoryUrl, prevRef, nextRef) => {
        if (!Array.isArray(animeList) || animeList.length === 0) {
            return <p className="text-white">No anime available.</p>;
        }
    
        return (
            <div className="relative flex items-center overflow-visible"> 
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    freeMode={true}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    onBeforeInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                        swiper.navigation.init();
                        swiper.navigation.update();
                    }}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        900: { slidesPerView: 3 },
                        1100: { slidesPerView: 4 },
                        1300: { slidesPerView: 5 },
                    }}
                    modules={[Navigation, FreeMode]}
                    className="h-[500px] overflow-visible"  
                >
                    {animeList.map((anime) => (
                        <SwiperSlide
                            key={anime.mal_id}
                            className=" overflow-visible flex justify-center items-center px-2"
                        >
                            <div className="bg-gray-800 rounded-lg p-3 shadow-lg transition-transform transform hover:scale-105 hover:translate-y-5 flex flex-col justify-center items-center z-20">
                                <img
                                    src={anime.images?.jpg?.large_image_url}
                                    alt={anime.title}
                                    className="w-full h-96 object-cover rounded-md"
                                />
                                <h3 className="text-white h-12 flex justify-center items-center mt-2 text-sm font-semibold text-center">
                                    {anime.title}
                                </h3>
                            </div>
                        </SwiperSlide>
                    ))}
                    <SwiperSlide>
                        <a
                            href={categoryUrl}
                            className="flex flex-col items-center justify-center bg-gray-800 text-white rounded-lg p-3 shadow-lg transition hover:scale-105"
                        >
                            <p className="font-bold">Browse All</p>
                            <span>➡️</span>
                        </a>
                    </SwiperSlide>
                </Swiper>
    
                {/* Navigation buttons */}
                <button
                    ref={prevRef}
                    className="absolute top-1/2 -left-5 transform -translate-y-1/2 bg-gray-700 opacity-70 hover:opacity-100 text-white p-2 rounded-full z-10 hover:scale-115"
                >
                    <GrPrevious className="font-bold text-4xl" />
                </button>
                <button
                    ref={nextRef}
                    className="absolute top-1/2 -right-5 transform -translate-y-1/2 bg-gray-700 opacity-70 hover:opacity-100 text-white p-2 rounded-full z-10 hover:scale-115"
                >
                    <GrNext className="font-bold text-4xl" />
                </button>
            </div>
        );
    };
    





    return (
        <div className="bg-[#232323]">
            {loading ? (
                <div className="flex justify-center py-4">
                    <div className="animate-spin bg-[#232323] h-8 w-8 border-4 border-white border-t-transparent rounded-full"></div>
                </div>
            ) : (
                <div className="w-4/5 mx-auto px-4 py-8">
                    
                    <h2 className="text-3xl font-bold text-white mb-4">
                        🔥 Most Popular Anime
                    </h2>
                    {renderAnimeCarousel(popularAnime, "/browse/popular", prevPopularRef, nextPopularRef)}

                    
                    <h2 className="text-3xl font-bold text-white mt-8 mb-4">🆕 Recently Aired Anime</h2>
                    {renderAnimeCarousel(recentAnime, "/browse/recent", prevRecentRef, nextRecentRef)}

                   
                    <h2 className="text-3xl font-bold text-white mt-8 mb-4">📅 Upcoming Anime</h2>
                    {renderAnimeCarousel(upcomingAnime, "/browse/upcoming", prevUpcomingRef, nextUpcomingRef)}
                </div>
            )}
        </div>
    );
};

export default AnimeSection;
