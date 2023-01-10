import React, { useState } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

interface NavigationProps {
  setPickColor: React.Dispatch<React.SetStateAction<string>>;
  setPickBgImage: React.Dispatch<React.SetStateAction<string>>;
}

const Navigation = (props: NavigationProps) => {
  const { setPickColor, setPickBgImage } = props;
  const [openSideBar, setOpenSideBar] = useState<boolean>(false);

  return (
    <nav>
      <NavBar setOpenSideBar={setOpenSideBar} />
      <SideBar
        openSideBar={openSideBar}
        setOpenSideBar={setOpenSideBar}
        setPickColor={setPickColor}
        setPickBgImage={setPickBgImage}
      />
    </nav>
  );
};

export default Navigation;
