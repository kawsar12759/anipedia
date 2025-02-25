import React, { useEffect, useState, useRef } from "react";
import { getPopularAnimes, getRecentAnimes, getUpcomingAnimes } from "../Services/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { GrPrevious, GrNext } from "react-icons/gr";

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

                await new Promise(resolve => setTimeout(resolve, 1000));

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
        if (prevUpcomingRef.current && nextUpcomingRef.current) {
            setTimeout(() => {
                const swiper = document.querySelector(".swiper-container-upcoming")?.swiper;
                if (swiper) {
                    swiper.params.navigation.prevEl = prevUpcomingRef.current;
                    swiper.params.navigation.nextEl = nextUpcomingRef.current;
                    swiper.navigation.destroy();
                    swiper.navigation.init();
                    swiper.navigation.update();
                }
            }, 500);
        }
    }, [upcomingAnime]);

    const renderAnimeCarousel = (animeList, categoryUrl, prevRef, nextRef, swiperClass) => {
        if (!Array.isArray(animeList) || animeList.length === 0) {
            return <div className="flex w-full flex-col gap-4">
                <div className="skeleton bg-gray-800 h-72 w-full"></div>

            </div>;
        }

        return (
            <div className="relative flex items-center overflow-visible">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    freeMode={true}
                    navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
                    onBeforeInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                    }}
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
                        <SwiperSlide key={anime.mal_id} className="overflow-visible flex justify-center items-center px-2">
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
                        <a href={categoryUrl} className="flex flex-col items-center justify-center h-[464px] bg-gray-600 text-white rounded-lg p-3 shadow-lg transition hover:scale-105  ">
                            <p className="font-bold">Browse All</p>
                            <span>➡️</span>
                        </a>
                    </SwiperSlide>
                </Swiper>
                {/* Navigation buttons */}
                <button
                    ref={prevRef}
                    className="absolute top-1/2 -left-5 transform -translate-y-1/2 bg-gray-700 opacity-70 hover:opacity-100 hover:cursor-pointer text-white p-2 rounded-full z-10 hover:scale-115"
                >
                    <GrPrevious className="font-bold text-4xl" />
                </button>
                <button
                    ref={nextRef}
                    className="absolute top-1/2 -right-5 transform -translate-y-1/2 bg-gray-700 opacity-70 hover:opacity-100 hover:cursor-pointer text-white p-2 rounded-full z-10 hover:scale-115"
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
                    <div className="skeleton bg-gray-800 h-8 w-28"></div>
                    <div className="skeleton bg-gray-800 h-72 mb-14 w-full"></div>
                    <div className="skeleton bg-gray-800 h-8 w-28"></div>
                    <div className="skeleton bg-gray-800 h-72 mb-14 w-full"></div>
                    <div className="skeleton bg-gray-800 h-8 w-28"></div>
                    <div className="skeleton bg-gray-800 h-72 mb-14 w-full"></div>
                </div>
            ) : (
                <div className="w-4/5 mx-auto px-4 py-8">
                    <h2 className="text-3xl font-bold text-white mb-4">🔥 Most Popular Anime</h2>
                    {renderAnimeCarousel(popularAnime, "/anime/popular", prevPopularRef, nextPopularRef, "")}

                    <h2 className="text-3xl font-bold text-white mt-8 mb-4">🆕 Recently Aired Anime</h2>
                    {renderAnimeCarousel(recentAnime, "/anime/recent", prevRecentRef, nextRecentRef, "")}

                    <h2 className="text-3xl font-bold text-white mt-8 mb-4">📅 Upcoming Anime</h2>
                    {renderAnimeCarousel(upcomingAnime, "/anime/upcoming", prevUpcomingRef, nextUpcomingRef, "swiper-container-upcoming")}
                </div>
            )}
        </div>
    );
};

export default AnimeSection;