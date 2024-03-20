import React, { useContext, useEffect, useState } from "react";
import CarListItem from "./CarListItem";
import { CarListData } from "../CarListData";
import Payment from "./Payment";
import { useTimer } from "react-timer-hook";
import LATLNG from "../Context/LATLNG";
import LATLNG_State from "../Context/LATLNG_State";
import {
  Await,
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  json,
  useNavigate,
} from "react-router-dom";
import { Axios } from "axios";
import DriverSearchBox from "./DriverSearchBox";
import MyTimer from "./MyTimer";
import InputItem from "./InputItem";
import { SourceContext } from "../Context/SourceContext";
import { DestinationContext } from "../Context/DestinationContext";
import driver_gif from "../Images/waiting_time.gif";
// import { useStateContext } from '../Context/ContextProvider';

import driver_profile from "../Images/driver_profile.png";
import taxi from "../Images/taxi.png";
// import LATLNG_State from "../Context/LATLNG_State";

function CarListOption({ option1, option2, option3, option4, carFetchFunc , distance }) {
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);
  // const { fetchedUserData2 , setFetchedUserData2 } = useStateContext();


  let url = "https://www.mobrilz.digital/admin/public/";

  let token = localStorage.token;

  const [data, setData] = useState([]);

  const [activeIndex, setActiveIndex] = useState();
  const [selectedCar, setSelectedCar] = useState();

  // car Fetch starts here
  const context = useContext(LATLNG);
  const [demo, setDemo] = useState(false);
  const [aryann, setAryann] = useState([]);
  const [cars, setCars] = useState(true);
  const [nodriverFound, setNoDriverFound] = useState(null);


  // console.log("carFetchFunc" ,carFetchFunc)
  // useEffect(()=>{

  //

  // } ,[carFetchFunc])

  useEffect(() => {
    carFetch();

  // userData()


    // userData();
  }, []);

  const carFetch = async (e) => {
    try {
      let response = await fetch(` ${url}api/v1/request/eta`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          pick_lat: source.lat,
          pick_lng: source.lng,
          drop_lat: destination.lat,
          drop_lng: destination.lng,
          ride_type: "1",
          transport_type: "taxi",
          // smoking: option1,
          // drinking: option2,
          // pets: option3,
          // handicaped: option4,
        }),
      });

      let parsedResponse = await response.json();

      setAryann(parsedResponse.data);

      if (response.status === 200) {
        setDemo(true);
        // setCars(true);
        // setFinalData(aryann);
        // setFullData(aryann)
        // console.log("ye abh chla hai");
      }
    } catch (err) {
      console.error(err);
    }
  };
  //   carFetch ends here

  const navigate = useNavigate();
  const handleOnClick = () => {
    // navigate("/payment?amount" + selectedCar.ride_fare);
    setProceed(true);
  };

  // user data

  const [fetchedUserData, setFetchedUserData] = useState([]);
  const [fetchedUserData2, setFetchedUserData2] = useState([]);
  // let fetchedUserData = [];

  // useEffect(()=>{

 
  const userData = async () => {
    try {
      let response = await fetch(` ${url}api/v1/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const DATA = await response.json();
        const convertedData =  [DATA.data];
        
          setFetchedUserData(convertedData);
          setFetchedUserData2(convertedData[0]);
     
    
       
        setId(true);
      } else {
        console.error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error creating request:", error);
    }
  };

  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setKey(prevKey => prevKey + 1); // Update the key to trigger re-render
      userData()

    }, 5000); // 5000 milliseconds = 5 seconds

    return () => clearInterval(interval); // Cleanup function to clear the interval
  }, []); // Empty dependency array to run the effect only once
// },[])
  // create driver request
  useEffect(()=>{

    if(fetchedUserData2.onTripRequest !== undefined && fetchedUserData2.onTripRequest !== null){
      setNoDriverFound(false)
      // console.log("the key is " , fetchedUserData2.onTripRequest)
    }
  },[fetchedUserData])
// console.log("driver ki ontrip request" , fetchedUserData)
  const [driver, setDriver] = useState([]);
  const [id, setId] = useState(false);
  const [click, setClick] = useState(false);
  const [create, setCreate] = useState([]);
  const [cancelId, setCancelId] = useState("");
  const [isHidden, setIsHidden] = useState(false);



  // useEffect(() => {
  const abortController = new AbortController();
  const { signal } = abortController;
  const createRequest = async () => {
    try {
      let URL = ` ${url}api/v1/request/create`;
      let response = await fetch(
        URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            pick_lat: source.lat,
            pick_lng: source.lng,
            drop_lat: destination.lat,
            drop_lng: destination.lng,
            vehicle_type: selectedCar.zone_type_id,
            ride_type: "1",
            payment_opt: "1",
            pick_address: source.name,
            drop_address: destination.name,
            request_eta_amount: data.total,
          }),
        },
        { signal }
      );
      // userData();
      // if (!signal.aborted) {
      if (response.ok) {
        const DATA = await response.json();
        const convertedData = [DATA.data];
        localStorage.setItem("id", convertedData[0].id);
        cancelRqstBtn(convertedData);
        setCancelId(convertedData.id);
        setDriver(convertedData);
        // setCreate(convertedData)
       
       

        // console.log("sbse naya create rqst api data", convertedData);
        // setId(true);
        // console.log("Request creation successful");
      } else {
        console.error(`HTTP error! Status: ${response.message}`);
        alert(`Error : ${response.message} , please hit on Cancel to make a new request`);
      }
      // }
    } catch (error) {
      // if (!signal.aborted) {
      console.error("Error creating request:", error);

      // }
    }
  };

  const cancelRqstBtn = (id) => {
    return id;
  };
  // }, );
  //

  // cancel request
  const [userCancelled, setUserCancelled] = useState(false);
  const [userRequestData, setUserRequestData] = useState([]);
  const [internet, setInternet] = useState([]);
  const [result, setResult] = useState("");
  const [driverWait, setDriverWait] = useState(null);
  const [display, setDisplay] = useState(null);
  const [driverFound, setDriverFound] = useState(null);
  const [searchingDriver, setSearchingDriver] = useState(null);
  const [proceed, setProceed] = useState(null);
  const cancelRequest = async () => {
    let rqstId = localStorage.id;
    try {
      var response = await fetch(`${url}api/v1/request/cancel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          request_id: rqstId,
          custom_reason: "cancel",
          // fetchedUserData[0].metaRequest.data[0].vehicle_type_id
        }),
      });
      if (response.status === 200) {
        setUserCancelled(true); // Consider using React state or context for managing state
        //  console.log("chal ke id hai " , fetchedUserData[0].metaRequest.data[0].vehicle_type_id)
        // setDriver([]); // Clearing the variable directly might not be ideal in React

        setResult("success");
      } else {
        console.error(await response.text());
        //  console.log("Bina chal ke id hai " , fetchedUserData[0].metaRequest.data[0].vehicle_type_id)

        setResult("failed");
      }
    } catch (error) {
      console.error(error);
    }
    return result;
  };
  const handleReloadClick = () => {
    window.location.reload();
  };
  const handleOnCancel = (e) => {
    e.preventDefault();
    cancelRequest();
    setClick(false);
    setSearchingDriver(false);
    setDriverFound(false);
    // handleReloadClick()
  };

  function handleOnChange(e) {
    e.preventDefault();
    createRequest();
    setClick(true);
    setNoDriverFound(true);
    // setDriverWait(true);
    setSearchingDriver(true);
    // setDisplay(true);
    // userData();
 
    userData();
    

    
    setTimeout(() => {
      setSearchingDriver(false);
    }, 300000);


    //
    
    
    //   // …
    
    
    };

    // useEffect(()=>{

    //   if(fetchedUserData[0].onTripRequest !== undefined){
    //     // setNoDriverFound(false);
    //     console.log("fetchedUserData[0].onTripRequest" , fetchedUserData.onTripRequest)
    //     setNoDriverFound(false)
    //   }
    // },[userData])
    
   
  

  const handleOnCancel2 = () => {
    cancelRequest()
    setDisplay(false);
    setSearchingDriver(false);
  
    // console.log("display")
  };

  // timer
  const time = new Date();
  time.setSeconds(time.getSeconds() + 300); // 5 minutes timer

  const [finalData, setFinalData] = useState(aryann);
  const [fullData, setFullData] = useState([]);
  // const[completeData , setCompleteData] = useState( );
  let completeData;
  // console.log("carFetchFunc", carFetchFunc);
  useEffect(() => {
    const dataKoSet = () => {
      setFinalData(
        aryann.map((item) => {
          if (
            (!option1 || item.smoking === 1) &&
            (!option2 || item.drinking === 1) &&
            (!option3 || item.pets === 1) &&
            (!option4 || item.handicaped === 1)
          ) {
            return item;
          }
        })
      );
    };

    dataKoSet();

    // setFullData(completeData)
}, [option1, option2, option3, option4 , 
  []
 ]);

  const abcd = finalData.filter((element) => element !== undefined);

  useEffect(() => {

    
      if (abcd.length > 0) {
        
        setCars(true);
     
    
      } else{
       
        setCars(false);
        console.log("bhai me zero hu");
    
  
      }
   
  }, [option1, option2, option3, option4 , abcd]);

  // console.log("fetcheduser", fetchedUserData);
  // console.log("driver ka data", driver);
  // console.log("cars", abcd);

  return (
    <>
      <div className="mt-5 pt-7 ">
        <h2 className="text-[22px] font-bold">Recommended</h2>
        {/* panga starts */}
       { (cars == true) ? (
        <div>
        {abcd.map((item, index, arr) =>
          (
            <div>
              <div
                className={`cursor-pointer p-2 px-4 rounded-md border-black ${
                  activeIndex === index ? "border-[3px]" : null
                }`}
                onClick={() => {
                  setActiveIndex(index);
                  setSelectedCar(item);
                }}
              >
                <div className="flex items-center justify-between mt-5">
                  <div className="flex items-center gap-5">
                    <img src={item.icon} width={100} height={100} />
                    <div>
                      <h2 className="text-[18px] font-semibold">{item.name}</h2>
                      <p>{item.description}</p>
                    </div>
                  </div>
                  <h2 className="font-semibold text-[18px]">
                    ₹{item.ride_fare.toFixed(2)}
                  </h2>
                </div>
              </div>
            </div> ) )}
            </div>
          ) : (
            <div className="text-[18px] font-semibold">No Car Found</div>
          )}
       


        {/* panga ends */}

        {/* select section starts */}
        {selectedCar?.name ? (
          <div>
            <div className="flex justify-center  mt-4 bottom-5 bg-[#faf6ae] p-3 shadow-xl rounded w-full  border-[1px] items-center">
              <h2 className="text-[20px] w-[400px]  mb-2 font-bold text-md">
                Make Request For
              </h2>

              <button
                className="p-3 bg-black text-white rounded-lg text-[18px] font-bold px-3"
                // handleOnClick={(()=>setCreate(true)) }
                onClick={handleOnChange}
              >
                {selectedCar.name}
              </button>
            </div>
            {(searchingDriver == true)? 
              <div>
                {/* request box starts */}

                {nodriverFound === true ? (
                  <div>
                    {/* {driverWait === true && click === true ? ( */}
                    <div id="driver-searching">
                      <h2 className="text-[28px] font-bold">
                        Available Drivers
                      </h2>
                      <div id="search-box" className=" flex flex-col">
                        <p className="text-[22px] ">Searching for driver...</p>
                        <img width={150} height={150} src={driver_gif} />
                        <MyTimer expiryTimestamp={time} />
                        <button
                          className="w-[10vw] font-bold"
                          onClick={handleOnCancel}
                        >
                          Cancel Request
                        </button>
                      </div>
                    </div>
                    {/* ) : null} */}
                  </div>
                ) : 
                 (
                      <ul>
                        {fetchedUserData.map((driver1) => (
                          <div id="driver-details" className="mt-5">
                            <div
                            //  key={driver.metaRequest.data.id}
                            >
                              <div>
                                <h2 className="text-[28px] font-bold">
                                  Driver Details
                                </h2>
                                <div className="flex justify-around  mt-3">
                                  <div className="">
                                    <img
                                      height={100}
                                      width={100}
                                      src={
                                        driver1.onTripRequest.data.driverDetail
                                          .data.profile_picture
                                      }
                                    />
                                  </div>
                                  <div className="mt-2 text-left ">
                                    <p className="mr-14  text-[18px] font-bold">
                                      <strong>Name: </strong>
                                      {
                                        driver1.onTripRequest.data.driverDetail
                                          .data.name
                                      }

                                      <br></br>
                                      <strong>Mobile:</strong>
                                      {
                                        driver1.onTripRequest.data.driverDetail
                                          .data.mobile
                                      }
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h2 className="text-[28px] font-bold">
                                  Car Detials
                                </h2>
                                <div className="flex justify-around mt-3">
                                  <div>
                                    <img
                                      className=""
                                      width={100}
                                      height={100}
                                      src={
                                        driver1.onTripRequest.data.driverDetail
                                          .data.vehicle_type_icon
                                      }
                                    />
                                  </div>
                                  <div className="text-left mr-14">
                                    <p className="  text-[18px] font-bold">
                                      <strong>Car Name:</strong>
                                      {
                                        driver1.onTripRequest.data.driverDetail
                                          .data.vehicle_type_name
                                      }
                                    </p>
                                    <p className="  text-[18px] font-bold">
                                      <strong>Car model:</strong>

                                      {driver1.onTripRequest.data.driverDetail
                                        .data.car_make_name +
                                        "-" +
                                        driver1.onTripRequest.data.driverDetail
                                          .data.car_model_name}
                                    </p>
                                  </div>
                                </div>
                                <br></br>
                              </div>
                            </div>
                            <br></br>
                            <h2 className="text-[24px] font-bold">
                              Ride OTP : {driver1.onTripRequest.data.ride_otp}
                            </h2>
                            <br></br>
                            <button
                              className="w-[10vw] h-[3vw] rounded-lg font-bold"
                              onClick={handleOnCancel2}
                            >
                              Cancel Request
                            </button>{" "}
                            <button
                              className="p-3 mx-3 bg-black text-white rounded-lg text-[18px] font-bold px-3 w-[12vw]"
                              onClick={handleOnClick}
                            >
                              Request {selectedCar.name}
                            </button>
                            <br></br>
                          </div>
                        ))}
                        {proceed == true ? (
                          <div>
                            <Payment />
                          </div>
                        ) : null}
                      </ul>
                    ) }
                
              </div>
         :null}
            {/* driver details section ends */}
            {/* request box ends */}
          </div>
        ) : null}
      </div>
      {/* select section ends */}
    </>
  );
}

export default CarListOption;
