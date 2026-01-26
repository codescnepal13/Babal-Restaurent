import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/Herosection/Herosection";
// import PopularCuisineSection from "../components/PopularCuisine";
// import AboutCultureSection from "../components/AboutCultureSection";
// import CustomerReview from "../components/CustomerReview";
import AboutUsHero from "../components/AboutUsHero";
import TwoWorldsMenu from "../components/TwoWorldMenu";
import WhyDineBabal from "../components/WhyDineBabal";



const HomePage: React.FC = () => {
  return (
    <div>
     <Header />
     <HeroSection />
     <AboutUsHero />
     <TwoWorldsMenu />
     <WhyDineBabal />
     {/* <PopularCuisineSection />
     <AboutCultureSection />
     <CustomerReview /> */}
     <Footer />
     
    
    </div>
  );
};

export default HomePage;