import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Skeleton } from 'antd';

const Our_Teams = () => {
  const [loading , setLoading] = useState(true); 
  let url = "https://admin.taxiscout24.com";
  const [team, setTeam] = useState();
  useEffect(() => {
    const handleTeam = async () => {
      setLoading(true)
      const response = await axios.get(`${url}/api/v1/our-team`);
      if(response){
      setTeam(response.data.data);
      setLoading(false)
    }
    };
    handleTeam();
  }, []);

  return (
    <>
    {loading ?  <div className="container  mx-auto px-0 sm:px-2"><Skeleton active /></div> : 
    <div className="container-xxl py-6 pb-5" id="team">
      <div className=" mt-16 sm:mt-10 lg:mt-2">
        <div className="row  my-5  wow fadeInUp" data-wow-delay="0.1s">
          <div className="col-lg-12">
            <h1 className="display-5 mb-0 mt-4 text-center font-medium">
              Team Members
            </h1>
          </div>
        </div>
        

        <div className="row g-4">
          {team?.map((member) => (
            <div
              key={member.id}
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay={member.delay}
            >
              <div className=" mx-4 team-item position-relative h-full flex flex-col">
                {/* Image Section */}
                <img
                  className="rounded-t-lg w-full h-80 aspect-square object-fill"
                  src={member.image}
                  alt={member.name}
                />

                {/* Text Content */}
                <div className="team-text bg-white rounded-b-lg p-4 flex flex-col justify-between flex-1">
                  <div className="flex flex-col gap-1 justify-center items-center">
                    <h2 className="text-2xl font-bold">{member.name}</h2>
                    <span className="text-sm text-gray-500">
                      {member.title}
                    </span>
                    <span className="text-sm text-gray-500">
                      {member.email}
                    </span>
                    <span className="text-sm text-gray-500">
                      {member.mobile}
                    </span>
                  </div>
                  {/* Description Section */}
                  <div className="relative mt-4">
                    <FaArrowRight
                      className="text-primary absolute right-0 top-0"
                      size={30}
                    />
                    <p className="pt-2 text-sm text-gray-700">
                      {member.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>}
    </>
  );
};

export default Our_Teams;
