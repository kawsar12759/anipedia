import { useEffect, useState, useRef } from "react";
import { getPopularAnimes, getRecentAnimes, getUpcomingAnimes } from "../Services/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { GrPrevious, GrNext } from "react-icons/gr";
import { Link } from "react-router-dom";

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

    const [popularSwiper, setPopularSwiper] = useState(null);
    const [recentSwiper, setRecentSwiper] = useState(null);
    const [upcomingSwiper, setUpcomingSwiper] = useState(null);

    useEffect(() => {
        const loadAnimeData = async () => {
            try {
                const popularAnimes = await getPopularAnimes();
                setPopularAnime(popularAnimes.slice(0, 15));

                await new Promise((resolve) => setTimeout(resolve, 600));

                const recentAnimes = await getRecentAnimes();
                setRecentAnime(recentAnimes.slice(0, 15));

                await new Promise((resolve) => setTimeout(resolve, 600));

                const upcomingAnimes = await getUpcomingAnimes();
                setUpcomingAnime(upcomingAnimes.slice(0, 15));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadAnimeData();
    }, []);

    useEffect(() => {
        if (popularSwiper && prevPopularRef.current && nextPopularRef.current) {
            popularSwiper.params.navigation.prevEl = prevPopularRef.current;
            popularSwiper.params.navigation.nextEl = nextPopularRef.current;
            popularSwiper.navigation.init();
            popularSwiper.navigation.update();
        }
    }, [popularSwiper, prevPopularRef.current, nextPopularRef.current]);

    useEffect(() => {
        if (recentSwiper && prevRecentRef.current && nextRecentRef.current) {
            recentSwiper.params.navigation.prevEl = prevRecentRef.current;
            recentSwiper.params.navigation.nextEl = nextRecentRef.current;
            recentSwiper.navigation.init();
            recentSwiper.navigation.update();
        }
    }, [recentSwiper, prevRecentRef.current, nextRecentRef.current]);

    useEffect(() => {
        if (upcomingSwiper && prevUpcomingRef.current && nextUpcomingRef.current) {
            upcomingSwiper.params.navigation.prevEl = prevUpcomingRef.current;
            upcomingSwiper.params.navigation.nextEl = nextUpcomingRef.current;
            upcomingSwiper.navigation.init();
            upcomingSwiper.navigation.update();
        }
    }, [upcomingSwiper, prevUpcomingRef.current, nextUpcomingRef.current]);

    const renderAnimeCarousel = (
        animeList,
        categoryUrl,
        prevRef,
        nextRef,
        swiperClass,
        setSwiperInstance
    ) => {
        if (!Array.isArray(animeList) || animeList.length === 0) {
            return (
                <div className="flex w-full flex-col gap-4">
                    <div className="skeleton bg-gray-800 h-72 w-full"></div>
                </div>
            );
        }

        return (
            <div className="relative flex items-center overflow-visible">
                <Swiper
                    onSwiper={setSwiperInstance}
                    slidesPerView={1}
                    spaceBetween={10}
                    freeMode={true}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        900: { slidesPerView: 3 },
                        1100: { slidesPerView: 4 },
                        1300: { slidesPerView: 5 },
                    }}
                    modules={[Navigation, FreeMode]}
                    className={`h-[500px] overflow-visible ${swiperClass}`}
                >
                    {animeList.map((anime) => (
                        <SwiperSlide
                            key={anime.mal_id}
                            className="overflow-visible flex justify-center items-center px-2"
                        >
                            <Link to={`/anime/details/${anime.mal_id}`}>
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
                            </Link>
                        </SwiperSlide>
                    ))}
                    <SwiperSlide>
                        <a
                            href={categoryUrl}
                            className="flex flex-col items-center justify-center h-[464px] bg-gray-600 text-white rounded-lg p-3 shadow-lg transition hover:scale-105"
                        >
                            <p className="font-bold">Browse All</p>
                            <span>➡️</span>
                        </a>
                    </SwiperSlide>
                </Swiper>

                <button
                    ref={prevRef}
                    className="absolute top-1/2 -left-5 transform -translate-y-1/2 bg-gray-700 opacity-70 hover:opacity-100 text-white p-2 rounded-full z-10 hover:scale-115 hover:cursor-pointer"
                >
                    <GrPrevious className="font-bold text-4xl" />
                </button>
                <button
                    ref={nextRef}
                    className="absolute top-1/2 -right-5 transform -translate-y-1/2 bg-gray-700 opacity-70 hover:opacity-100 text-white p-2 rounded-full z-10 hover:scale-115 hover:cursor-pointer"
                >
                    <GrNext className="font-bold text-4xl" />
                </button>
            </div>
        );
    };

    return (
        <div className="bg-[#232323]">
            {loading ? (
                <div className="flex w-4/5 flex-col gap-4 mx-auto py-8 px-4">
                    <div className="skeleton bg-gray-800 h-8 w-80"></div>
                    <div className="skeleton bg-gray-800 h-72 mb-14 w-full"></div>
                    <div className="skeleton bg-gray-800 h-8 w-80"></div>
                    <div className="skeleton bg-gray-800 h-72 mb-14 w-full"></div>
                    <div className="skeleton bg-gray-800 h-8 w-80"></div>
                    <div className="skeleton bg-gray-800 h-72 mb-14 w-full"></div>
                </div>
            ) : (
                <div className="w-4/5 mx-auto px-4 py-8">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        🔥 Most Popular Anime
                    </h2>
                    {renderAnimeCarousel(
                        popularAnime,
                        "/anime/popular",
                        prevPopularRef,
                        nextPopularRef,
                        "",
                        setPopularSwiper
                    )}

                    <h2 className="text-3xl font-bold text-white mt-8 mb-4">
                        🆕 Recently Aired Anime
                    </h2>
                    {renderAnimeCarousel(
                        recentAnime,
                        "/anime/recent",
                        prevRecentRef,
                        nextRecentRef,
                        "",
                        setRecentSwiper
                    )}

                    <h2 className="text-3xl font-bold text-white mt-8 mb-4">
                        📅 Upcoming Anime
                    </h2>
                    {renderAnimeCarousel(
                        upcomingAnime,
                        "/anime/upcoming",
                        prevUpcomingRef,
                        nextUpcomingRef,
                        "swiper-container-upcoming",
                        setUpcomingSwiper
                    )}
                </div>
            )}
        </div>
    );
};

export default AnimeSection;
