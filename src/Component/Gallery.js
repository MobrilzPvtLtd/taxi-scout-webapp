import React, { useState, useEffect, useRef } from 'react';
import { Galleria } from 'primereact/galleria';
import axios from "axios";
import { Skeleton } from 'antd';
const Gallery = () => {
  const [loading , setLoading] = useState(true); 
  let url = "https://admin.taxiscout24.com";
  const [images, setImages] = useState(null);
  const [galleryData , setGalleryData] = useState()
useEffect(()=>{

  const handleGallery= async()=>{
    setLoading(true)
    const response = await axios.get(`${url}/api/v1/gallery`)
    if(response){
    setGalleryData(response.data.data);
    setImages(response.data.data);
    setLoading(false)
  }
  }
  handleGallery();
},[])
const [isOpen, setIsOpen] = useState(false);
const [currentImage, setCurrentImage] = useState(null);

const openModal = (image) => {
  setCurrentImage(image);
  setIsOpen(true);
};

const closeModal = () => {
  setIsOpen(false);
  setCurrentImage(null);
};

  return (
    <>
  {loading ?  <div className="container  mx-auto px-0 sm:px-2"><Skeleton active /></div> : 
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Image Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryData?.map((image, index) => (
          <div
            key={index}
            className="cursor-pointer"
            onClick={() => openModal(image)}
          >
            <img
              src={image.image}
              alt={image.image}
              className="w-full h-48 object-cover rounded shadow-lg hover:opacity-80 transition-opacity duration-300"
            />
          </div>
        ))}
      </div>

      {isOpen && currentImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative">
            <button
              className="w-fit absolute top-0 right-0 mt-2 mr-2 text-white bg-black text-2xl font-bold"
              onClick={closeModal}
            >
              x
            </button>
            <img
              src={currentImage.image}
              alt={currentImage.image}
              className="w-full h-96 rounded"
            />
          </div>
        </div>
      )}
    </div>
    }
</>
  );
};

export default Gallery;
