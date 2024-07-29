import React from "react";
import gimage1 from "../Images/Firefly a mexican woman booking a taxi in mexico 1920x1080 98531 (2).jpg"
import gimage2 from "../Images/3adb4519-1285-4d49-89ac-fae6820278d2.avif"
const Gallery = () => {
  return (
    <div>
      <div className="gallarymain">
        <div className="gallary001 container">
          <div className="gheading">
            <h2>Exploring The World</h2>
          </div>
          <div>
            <p className="gtext001">
              Far far away, behind the word mountains, far from the countries
              Vokalia and Consonantia, there live the blind texts. Separated
              they live in Bookmarksgrove right at the coast of the Semantics, a
              large language ocean.
            </p>
          </div>
          <div>
            <p className="gtext002">
              Far far away, behind the word mountains, far from the countries
              Vokalia and Consonantia, there live the blind texts.
            </p>
          </div>
        </div>
        <div className="gallary002"></div>
      </div>

      <div className="gall-main container">
        <div className="gall-1 container">
          <div className="g-image1">
            <img src={gimage2}></img>
          </div>
          <div className="g-image2">
          <img src={gimage1}></img>
          </div>
          <div className="g-image3">
          <img src={gimage2}></img>
          </div>
        </div>
        <div className="gall-1 container">
        <div className="g-image4">
            <img src={gimage2}></img>
          </div>
          <div className="g-image5">
          <img src={gimage1}></img>
          </div>
          <div className="g-image6">
          <img src={gimage2}></img>
          </div>
        </div>
        <div className="gall-1 container">
        <div className="g-image7">
            <img src={gimage2}></img>
          </div>
          <div className="g-image8">
          <img src={gimage1}></img>
          </div>
          <div className="g-image9">
          <img src={gimage2}></img>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Gallery;
