import { Link } from "react-router-dom";
import bannerImg from '../assets/bannerimg.jpg'
const HeroSection = () => {
    return (
        <section className="relative h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center text-white overflow-hidden">

            <div className="absolute inset-0 bg-cover bg-center brightness-50 " style={{ backgroundImage: `url(${bannerImg})` }}></div>

    
            <div className="relative z-10 text-center px-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
                    Welcome to <span className="text-[#FFA500]">AniPedia</span>
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in-up">
                    Your ultimate destination for exploring the world of anime. Discover popular series, add favorites, and stay updated with the latest releases.
                </p>
                <Link
                    to="/explore"
                    className="bg-[#FFA500] hover:bg-[#E59400] text-white font-semibold py-3 px-8 rounded-full text-lg transition-colors duration-300 animate-bounce-in"
                >
                    Explore Anime
                </Link>
            </div>
        </section>
    );
};

export default HeroSection;