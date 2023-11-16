import React, { useState, useRef } from "react";
import Domain from "./MainPage/Domain/Domain";
import NewsPage from "./MainPage/News/NewsPage";
import MoreDetail from "./MainPage/MoreDetail/MoreDetail";
import Footer from "./footer/Footer";
import Partners from "./MainPage/Partners/Partners";
import HeroSection from "./MainPage/HeroSection/HeroSection";
import GalleryMainPage from "./MainPage/GalleryMainPage/GalleryMainPage";
import "./mainPage.css";
import GlobalLoader from "./globalLoader/GlobalLoader";

const MainPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const pageRef = useRef();

  const toggleLoading = (state) => {
    setIsLoading(state);
  };

  return (
    <div ref={pageRef}>
      <HeroSection />
      <div className="main-page-content">
        <Domain />
        {isLoading && <GlobalLoader />}
        <GalleryMainPage toggleLoading={toggleLoading} />
        <Partners toggleLoading={toggleLoading} />
        <NewsPage toggleLoading={toggleLoading} />
        <MoreDetail />
        <Footer pageRef={pageRef} />
      </div>
    </div>
  );
};

export default MainPage;
