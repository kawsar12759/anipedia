import { useEffect} from "react";

import '../css/Home.css'
import { useAnimeContext } from "../Contexts/AnimeContexts";
import HeroSection from "../Components/HeroSection";

import AnimeSection from "../Components/AnimeSection";

const Home = () => {


    const {  searchQuery, setSearchQuery } = useAnimeContext();

    useEffect(() => {
        setSearchQuery("")
    }, [])

    return (<>
        <HeroSection></HeroSection>
        <AnimeSection></AnimeSection>
        
    </>
    );
};

export default Home;