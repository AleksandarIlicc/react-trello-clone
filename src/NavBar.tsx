import React from "react";

interface NavBarProps {
  setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar = (props: NavBarProps) => {
  const { setOpenSideBar } = props;

  return (
    <div className="nav">
      <h1>Trello App</h1>
      <button
        className="btn btn--change-bg"
        onClick={(): void => setOpenSideBar(true)}
      >
        Change Background
      </button>
    </div>
  );
};

export default NavBar;
