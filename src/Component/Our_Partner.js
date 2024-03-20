import React from "react";
import google from "../Images/pngimg.com - google_PNG19624.png"
import facebook from "../Images/623dd7b570712bdafc63c389.png"
import lenovo from "../Images/pngwing.com (4).png"
import airbnb from "../Images/pngegg (2).png"
import dropbox from "../Images/dropbox-logo-black-and-white-1.png"
import netflix from "../Images/netflix-logo-black-png.png"


const Our_Partner = () => {
  return (
    <div className="bg-[#fff] h-[30vw] flex justify-center items-center container partner001 mt-10">
      <div className="left001">
        <div>
          <h2 className="phead001 font-bold">Our Partners</h2>
        </div>
        <div>
          <h1 className="phead002">
            Pleasure to<br></br> work with
          </h1>
        </div>
      </div>
      <div className="right001">
        <div className="logos">
          <div className="logo001"><img src={google} /></div>
          <div className="logo002"><img src={facebook} /></div>
          <div className="logo003"><img src={netflix} /></div>
          <div className="logo004"><img src={lenovo} /></div>
          <div className="logo005"><img src={airbnb} /></div>
          <div className="logo006"><img src={dropbox} /></div>
        </div>
      </div>
    </div>
  );
};

export default Our_Partner;
