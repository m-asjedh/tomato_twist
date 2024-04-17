import React from "react";
import backgroundAudio from "../assets/bg_audio.mp3";

//handle bg audio
/* Audio element for 
playing background audio*/
const BgAudio = () => {
  return (
    <div>
      <audio autoPlay loop>
        <source src={backgroundAudio} type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default BgAudio;
