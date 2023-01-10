import { useState } from "react";
import "./sass/style.css";
import Navigation from "./Navigation";
import TrelloWrapper from "./wrapper/TrelloWrapper";

function App() {
  const [pickColor, setPickColor] = useState<string>("#2282fd");
  const [pickBgImage, setPickBgImage] = useState<string>("");

  return (
    <div
      style={{
        backgroundColor: pickColor,
        backgroundImage: `url(${pickBgImage})`,
        backgroundSize: " cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Navigation setPickColor={setPickColor} setPickBgImage={setPickBgImage} />
      <TrelloWrapper />
    </div>
  );
}

export default App;
