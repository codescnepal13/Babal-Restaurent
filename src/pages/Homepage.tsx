import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/Herosection/Herosection";
import AboutUsHero from "../components/AboutUsHero";
import TwoWorldsMenu from "../components/TwoWorldMenu";
import WhyDineBabal from "../components/WhyDineBabal";



const HomePage: React.FC = () => {
  return (
    <div className="overflow-hidden">
     <Header />
     <HeroSection />
     <AboutUsHero />
     <TwoWorldsMenu />
     <WhyDineBabal />
     <Footer />
     
    
    </div>
  );
};

export default HomePage;