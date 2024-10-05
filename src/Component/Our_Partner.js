import React, { useEffect, useState } from "react";
import google from "../Images/pngimg.com - google_PNG19624.png"
import facebook from "../Images/623dd7b570712bdafc63c389.png"
import lenovo from "../Images/pngwing.com (4).png"
import airbnb from "../Images/pngegg (2).png"
import dropbox from "../Images/dropbox-logo-black-and-white-1.png"
import netflix from "../Images/netflix-logo-black-png.png"
import axios from "axios";


const Our_Partner = () => {
  let url = "https://admin.taxiscout24.com";
  const [partners , setPartners] = useState()
useEffect(()=>{

  const handlePartner= async()=>{
    const response = await axios.get(`${url}/api/v1/our-partner`)
    setPartners(response.data.data)
  }
  handlePartner();
},[])
  return (
    <div className="container h-1/2 grid grid-cols-1 mt-16 sm:grid-cols-2">
      <div className="flex flex-col justify-center gap-10">
        <div>
          <div className="font-semibold text-2xl lg:text-4xl ">Our Partners</div>
        </div>
        <div>
          <div className="font-bold text-4xl lg:text-7xl ">
            Pleasure to<br></br> work with
          </div>
        </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {partners?.map(({id , image})=>(

          <div className="" key={id}><img className="w-full object-cover aspect-square rounded-3xl" src={image} /></div>
          ))}
        </div>
      </div>
  );
};

export default Our_Partner;
