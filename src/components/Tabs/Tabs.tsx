import React, { useState, useEffect, useRef } from "react";
import "./Tabs.css";

interface TabProps {
  activeItem: number;
  onTabChange: (index: number) => void;
}

const Tabs = (props: TabProps) => {
  const { activeItem, onTabChange } = props;
  const [menuItems, setMenuItems] = useState<Array<string>>([
    "Upload Questions",
    "Similar Question",
    "Search Similar Question",
  ]);
  const navRef = useRef<Array<HTMLElement>>([]);
  const navSlider = useRef<HTMLElement | null>(null);

  useEffect(() => {
    (navSlider.current as HTMLElement).style.setProperty(
      "--left-tabs",
      `${navRef.current[activeItem]?.offsetLeft}px`
    );
    (navSlider.current as HTMLElement).style.setProperty(
      "--width-tabs",
      `${navRef.current[activeItem]?.offsetWidth}px`
    );
    window.addEventListener("resize", handleResize, true);
    return () => {
      window.removeEventListener("resize", handleResize, true);
    };
  }, [activeItem]);

  const handleResize = () => {
    (navSlider.current as HTMLElement).style.setProperty(
      "--left-tabs",
      `${navRef.current[activeItem].offsetLeft}px`
    );
    (navSlider.current as HTMLElement).style.setProperty(
      "--width-tabs",
      `${navRef.current[activeItem].offsetWidth}px`
    );
  };

  const handleTabChange = (index: number) => {
    (navSlider.current as HTMLElement).style.setProperty(
      "--left-tabs",
      `${navRef.current[index].offsetLeft}px`
    );
    (navSlider.current as HTMLElement).style.setProperty(
      "--width-tabs",
      `${navRef.current[index].offsetWidth}px`
    );
    onTabChange(index);
  };

  return (
    <div className="tabs-container">
      <div className="nav-slider-container relative flex justify-start items-center border-b border-b-[#D1D6D9]">
        {menuItems.map((item, i) => (
          <nav
            key={item}
            aria-label={`${item} tab`}
            className={`mr-6 py-3 md:text-[16px] text-[12px] ${
              i !== activeItem && "opacity-60"
            } text-[#374043]  font-semibold cursor-pointer`}
            onClick={() => handleTabChange(i)}
            ref={(el) => navRef.current.push(el as HTMLElement)}
            onKeyDown={(event: React.KeyboardEvent<HTMLElement>) => {
              if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                handleTabChange(i);
              }
            }}
          >
            {item}
          </nav>
        ))}
        <span className="nav-slider" ref={navSlider} />
      </div>
    </div>
  );
};

export default Tabs;
