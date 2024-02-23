import Tabs from "../../components/Tabs/Tabs";
import logo from "../../assets/ES-logo.svg";
import wave from "../../assets/wave.png";
import { useState } from "react";
import UploadQuestions from "../../components/UploadQuestions/UploadQuestions";
import SimilarQuestions from "../../components/SimilarQuestions/SimilarQuestions";
import SearchSimilarQuestions from "../../components/SearchSimilarQuestions/SearchSimilarQuestions";

const Home = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const handleTabChange = (tabIndex: number) => {
    setActiveIndex(tabIndex);
  };

  return (
    <div className="landing-page-container min-h-screen">
      <div className="header-container pl-8 h-16 bg-white flex justify-between items-center">
        <img src={logo} alt="logo" aria-label="logo" width={160} />
        <img
          src={wave}
          alt="wave"
          aria-label="wave"
          width={200}
          className="h-fit"
        />
      </div>
      <div className="sm:px-10 xs:px-8 px-6 xs:py-6 py-4 bg-[#F2F4F6] min-h-[calc(100vh_-_64px)] md:px-24">
        <Tabs
          activeItem={activeIndex}
          onTabChange={(tabIndex) => {
            handleTabChange(tabIndex);
          }}
        />
        {activeIndex === 0 && <UploadQuestions />}
        {activeIndex === 1 && <SimilarQuestions />}
        {activeIndex === 2 && <SearchSimilarQuestions />}
      </div>
    </div>
  );
};

export default Home;
