import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Our_Teams = () => {
  let url = "https://admin.taxiscout24.com";
  const [team , setTeam] = useState()
useEffect(()=>{

  const handleTeam= async()=>{
    const response = await axios.get(`${url}/api/v1/our-team`)
    setTeam(response.data.data);
  }
  handleTeam();
},[])
  

  return (
    <div className="container-xxl py-6 pb-5" id="team">
      <div className="container mt-16 sm:mt-10 lg:mt-2">
        <div className="row g-5 mb-5 wow fadeInUp" data-wow-delay="0.1s">
          <div className="col-lg-6">
            <h1 className="display-5 mb-0 font-medium">Team Members</h1>
          </div>
         
        </div>
        <div className="row g-4">
          {team?.map((member) => (
            <div
              key={member.id}
              className={`col-lg-4 col-md-6 wow fadeInUp`}
              data-wow-delay={member.delay}
            >
              <div className="team-item position-relative">
                <img className="img-fluid rounded w-full h-[20rem]" src={member.image} alt="" />
                <div className="team-text bg-white rounded-end p-4">
                  <div className="flex flex-col gap-1 justify-center items-center">
                    <h2 className="text-4xl">{member.name}</h2>
                    <span>{member.title}</span>
                    <span>{member.email}</span>
                    <span>{member.mobile}</span>
                  </div>
                  <div className="relative">
                  <FaArrowRight className="text-primary absolute" size={40} />
                  <p className="pt-2">{member.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Our_Teams;