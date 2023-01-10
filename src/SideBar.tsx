import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { colors } from "./bgColorsAndImages/bgColors";
import { backgroundImages } from "./bgColorsAndImages/bgImages";

interface SideBarProps {
  openSideBar: boolean;
  setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  setPickColor: React.Dispatch<React.SetStateAction<string>>;
  setPickBgImage: React.Dispatch<React.SetStateAction<string>>;
}

const SideBar = (props: SideBarProps) => {
  const { openSideBar, setOpenSideBar, setPickColor, setPickBgImage } = props;
  const [activeColors, setActiveColors] = useState(false);
  const [activeBgImages, setActiveBgImages] = useState(false);

  const handlePickColor = (e: React.MouseEvent<HTMLDivElement>): void => {
    const target = e.target as HTMLInputElement;
    const color: string | undefined = target.dataset.color;
    const image: string | undefined = target.dataset.image;

    if (color) {
      setPickBgImage("");
      setPickColor(color);
    }
    if (image) setPickBgImage(image);
  };

  return (
    <div className={openSideBar ? "side-bar side-bar--active" : "side-bar"}>
      <h1>Change Background</h1>
      <FaTimes onClick={(): void => setOpenSideBar(false)} />

      <div className="bg-container">
        <div
          className="bg bg--1"
          onClick={() => {
            setActiveBgImages(!activeBgImages);
            setActiveColors(false);
          }}
        ></div>
        <div
          className="bg bg--2"
          onClick={(): void => {
            setActiveColors(!activeColors);
            setActiveBgImages(false);
          }}
        ></div>
      </div>
      {activeColors ? (
        <div
          className={
            activeColors
              ? "bg-container bg-handlerShow bg-handlerShow--active"
              : "bg-container bg-handlerShow"
          }
          onClick={handlePickColor}
        >
          {colors.map((color, index) => {
            return (
              <div
                className="bg"
                key={index}
                style={{
                  backgroundColor: color,
                }}
                data-color={color}
                onClick={() => setOpenSideBar(false)}
              ></div>
            );
          })}
        </div>
      ) : (
        <div
          className={
            activeBgImages
              ? "bg-container bg-handlerShow bg-handlerShow--active"
              : "bg-container bg-handlerShow"
          }
          onClick={handlePickColor}
        >
          {backgroundImages.map((image, index) => {
            return (
              <div
                className="bg"
                key={index}
                style={{
                  backgroundImage: `url(${image})`,
                }}
                data-image={image}
                onClick={() => setOpenSideBar(false)}
              ></div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SideBar;
