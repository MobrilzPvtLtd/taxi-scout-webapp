import React, { useEffect, useState } from "react";
import gimage1 from "../Images/Firefly a mexican woman booking a taxi in mexico 1920x1080 98531 (2).jpg"
import gimage2 from "../Images/3adb4519-1285-4d49-89ac-fae6820278d2.avif"
import axios from "axios";
const Gallery = () => {
  let url = "https://admin.taxiscout24.com";
  const [galleryData , setGalleryData] = useState()
useEffect(()=>{

  const handleGallery= async()=>{
    const response = await axios.get(`${url}/api/v1/gallery`)
    setGalleryData(response.data.data);
  }
  handleGallery();
},[])
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
      </div>

      <div className="container gap-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  ">
       {galleryData?.map((item)=>(
        <div className="" key={item.id}>
          <img className="w-full object-cover aspect-square rounded-3xl" src={item.image} alt={item.image}/>
          </div>
       ))}
      </div>

    </div>
  );
};

export default Gallery;
