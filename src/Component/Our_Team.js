import React from "react";
import teamimg from "../Images/miro.jpg";
const Our_Team = () => {
  return (
    <div className="ourteam-main container">
      <div className="ourteam002">
        <img className="h-[700px]" src={teamimg}></img>
      </div>
      <div className="ourteam001 pl-10">
        <div className="ourcontent001">
          <div className="ourheading font-bold">
            <h2>CEO</h2>
          </div>
          <div className="ourtext">
            <p>
              <b>Name:</b> Malbasic Miroslav<br/><b>Phone:</b>+41 76 348 7001<br/><b>Email:</b> malbasic@taxiscout24.com
            </p>
          </div>
          <div className="ourtext">
            <p>
            <b>As the CEO of Taxiscout24.com, my personal commitment is to ensure that our software solutions for taxi companies maintain the highest standards of efficiency, reliability, and user-friendliness. Through our innovative technology, we support taxi companies in optimizing their operations and providing their customers with a seamless and comfortable travel experience.</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Our_Team;
