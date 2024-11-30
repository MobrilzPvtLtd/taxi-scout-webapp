import React, { useEffect, useState } from "react";
import google from "../Images/pngimg.com - google_PNG19624.png";
import facebook from "../Images/623dd7b570712bdafc63c389.png";
import lenovo from "../Images/pngwing.com (4).png";
import airbnb from "../Images/pngegg (2).png";
import dropbox from "../Images/dropbox-logo-black-and-white-1.png";
import netflix from "../Images/netflix-logo-black-png.png";
import axios from "axios";
import { Skeleton } from "antd";
import { useTranslation } from "react-i18next";
const Our_Partner = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  let url = "https://admin.taxiscout24.com";
  const [partners, setPartners] = useState();
  useEffect(() => {
    const handlePartner = async () => {
      setLoading(true)
      const response = await axios.get(`${url}/api/v1/our-partner`);
      if(response){

        setPartners(response.data.data);
        setLoading(false)
      }
    };
    handlePartner();
  }, []);
  return (
    <>
    {loading ? <div className="container  mx-auto px-0 sm:px-2"><Skeleton active /></div> :
    <div className="flex flex-col items-center justify-center">
      <div className="p-5 h-1/2 grid grid-cols-1 mt-16 sm:grid-cols-1">
        <div>
          <div className="flex flex-col justify-center gap-10">
            <div className="font-semibold text-center   ">
              {" "}
              <h1>{t('our_partners')} </h1>
            </div>
          </div>

          <div>
            <div className="font-bold text-center text-xl  ">
              <span>{t('partners_text1')} </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-fit grid place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2 justify-center ">
        {partners?.map(({ id, image }) => (
          <div className="overflow-hidden rounded md:mx-2  shadow-lg " key={id}>
            <img
              className="w-full h-52 aspect-square object-fill"
              src={image}
              alt="Card Image"
            />
          </div>
        ))}
      </div>
      </div>}
    </>
  );
};

export default Our_Partner;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const OurPartner = () => {
//   const url = "https://admin.taxiscout24.com";
//   const [partners, setPartners] = useState([]);

//   useEffect(() => {
//     const fetchPartners = async () => {
//       try {
//         const response = await axios.get(`${url}/api/v1/our-partner`);
//         setPartners(response.data.data);
//       } catch (error) {
//         console.error("Error fetching partners:", error);
//       }
//     };

//     fetchPartners();
//   }, []);

//   return (
//     <section className="mt-16 p-5">
//       <div className="text-center mb-10">
//         <h1 className="font-semibold text-2xl">Our Partners</h1>
//         <p className="font-bold text-xl mt-2">Pleasure to work with</p>
//       </div>

//       <div className="grid grid-cols-1 gap-4 md:grid-cols-3 ">
//         {partners?.map(({ id, image }) => (
//           <div className="flex justify-center py-4" key={id}>
//             <img className=" w-full h-32 md:h-40 lg:h-48 rounded-3xl" src={image} alt={`Partner ${id}`} />
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default OurPartner;
