import React, { useContext, useEffect, useState } from "react";
import CarListItem from "./CarListItem";
import { CarListData } from "../CarListData";
import Payment from "./Payment";
import { useTimer } from "react-timer-hook";
import LATLNG from "../Context/LATLNG";
import LATLNG_State from "../Context/LATLNG_State";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./TaxiScheduler.css";
import { format } from "date-fns";
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

import driver_profile from "../Images/driver_profile.png";
import taxi from "../Images/taxi.png";
import { collection, onSnapshot } from "firebase/firestore";
import { ref, query, orderByChild, equalTo, onValue } from "firebase/database";
import { database } from "./Firebase"; // Import the initialized
import BookingRequested from "./BookingRequested";
import DriverArrived from "./DriverArrived";
import TripStarted from "./TripStarted";
import BookingCompleted from "./BookingCompleted";

function CarListOption({
  option1,
  option2,
  option3,
  option4,
  carFetchFunc,
  distance,
}) {
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);

  let url = "https://admin.taxiscout24.com/";

  let token = sessionStorage.token;
  const [driverData, setDriverData] = useState(null);
  const [userData1, setUserData1] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rideStarted, setRideStarted] = useState(false);

  const [data, setData] = useState([]);
  const [checkDriver, setCheckDriver] = useState(0);

  const [activeIndex, setActiveIndex] = useState();
  const [selectedCar, setSelectedCar] = useState();
  const [schedule, setSchedule] = useState(false);

  // car Fetch starts here
  const context = useContext(LATLNG);
  const [demo, setDemo] = useState(false);
  const [aryann, setAryann] = useState([]);
  const [cars, setCars] = useState(true);
  const [nodriverFound, setNoDriverFound] = useState(null);

  useEffect(() => {
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
          }),
        });

        let parsedResponse = await response.json();

        if (response.status === 200) {
          setAryann(parsedResponse.data);
          setDemo(true);
        }
      } catch (err) {
        console.error(err);
      }
    };

    carFetch();
  }, [option1, option2, option3, option4]);
  // alert(distance)
  // console.log("car fetch data" , aryann)
  //   carFetch ends here

  const navigate = useNavigate();
  const handleOnClick = () => {
    // navigate("/payment?amount" + selectedCar.ride_fare);
    setProceed(true);
  };

  // user data
  const [driver, setDriver] = useState([]);

  const [id, setId] = useState(false);
  const [fetchedUserData, setFetchedUserData] = useState([]);
  const [fetchedUserData2, setFetchedUserData2] = useState([]);
  // let fetchedUserData = [];
  useEffect(() => {
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
          const convertedData = [DATA.data];

          setFetchedUserData(convertedData);
          // if((convertedData[0].onTripRequest != null || convertedData[0].onTripRequest != undefined ) && convertedData[0].onTripRequest.data.is_completed == 0){
          setFetchedUserData2(convertedData[0]);

          // }

          setId(true);
        } else {
          console.error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error creating request:", error);
      }
    };

    userData();
  }, [fetchedUserData]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setKey((prevKey) => prevKey + 1); // Update the key to trigger re-render
  //     userData();
  //   }, 5000); // 5000 milliseconds = 5 seconds

  //   return () => clearInterval(interval); // Cleanup function to clear the interval
  // }, []); // Empty dependency array to run the effect only once
  // },[])
  // create driver request

  // console.log("driver ki ontrip request" , fetchedUserData)
  const [click, setClick] = useState(false);
  const [create, setCreate] = useState(false);
  const [cancelId, setCancelId] = useState("");
  const [isHidden, setIsHidden] = useState(false);

  // useEffect(() => {
  const abortController = new AbortController();
  const { signal } = abortController;
  useEffect(() => {
    if (checkDriver < 300) {
      const timerID = setInterval(() => {
        setCheckDriver((checkDriver) => checkDriver + 1);
        // console.log("timer ki value " , timer)
      }, 1000);

      return () => clearInterval(timerID);
    }
  }, [checkDriver]);
  const createRequest = async () => {
    setCheckDriver(1);
    setCreate(true)

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
        sessionStorage.setItem("id", convertedData[0].id);
        cancelRqstBtn(convertedData);
        setCancelId(convertedData.id);
        setDriver(convertedData);
        // setCreate(convertedData)

        // console.log("sbse naya create rqst api data", convertedData);
        // setId(true);
        // console.log("Request creation successful");
      } else {
        console.error(`HTTP error! Status: ${response.message}`);
        alert(
          `Error : ${response.message} , please hit on Cancel to make a new request`
        );
      }
      // }
    } catch (error) {
      // if (!signal.aborted) {
      console.error("Error creating request:", error);

      // }
    }
  };
  useEffect(() => {
    if (
      fetchedUserData2?.onTripRequest !== undefined &&
      fetchedUserData2?.onTripRequest !== null
    ) {
      setNoDriverFound(false);
      // setSearchingDriver(false);
      // console.log("the key is " , fetchedUserData.map((item)=>{return item.onTripRequest}))
    }
  }, [checkDriver, fetchedUserData]);

  // console.log("create rqst data" , driver)
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
    let rqstId = sessionStorage.id;
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
        setUserCancelled(true);
        window.location.reload();

        setResult("success");
      } else {
        console.error(await response.text());

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
  const handleOnCancel = () => {
    // e.preventDefault();
    cancelRequest();
    setClick(false);
    setSearchingDriver(false);
    setDriverFound(false);
    // handleReloadClick()
    setDriver(null);
    window.location.reload()
    // setFetchedUserData2(null);
    // setFetchedUserData(null);
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

    // setTimeout(() => {
    //   setSearchingDriver(false);
    // }, 300000);
  }

  const handleOnCancel2 = () => {
    cancelRequest();

    setBooking(false);
    // setSearchingDriver(false);
    // setDriver(null);
    window.location.reload()
    // setFetchedUserData2(null);
    // setFetchedUserData(null);
  };

  // timer
  const time = new Date();
  time.setSeconds(time.getSeconds() + 300); // 5 minutes timer

  const [finalData, setFinalData] = useState(aryann);
  const [fullData, setFullData] = useState([]);
  let completeData;
  useEffect(() => {
    const dataKoSet = () => {
      setFinalData(
        aryann?.map((item) => {
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
  }, [checkDriver]);

  const abcd = finalData?.filter((element) => element !== undefined);

  useEffect(() => {
    if (abcd?.length > 0) {
      setCars(true);
    } else if (fetchedUserData2?.onTripRequest?.data?.is_driver_started == 1) {
      setRideStarted(true);
    } else {
      setCars(false);
    }
  }, [option1, option2, option3, option4, abcd, checkDriver]);

  const [scheduledTime, setScheduledTime] = useState(new Date());

  const handle_taxi_schedule_cancel = () => {
    setSchedule(false);
  };
  const handleDateChange = (date) => {
    setScheduledTime(date);
  };

  const formatDate = (date) => {
    if (!date) return "";
    return format(date, "yyyy-MM-dd HH:mm:ss");
  };

  const handle_schedule_taxi = (e) => {
    e.preventDefault();

    console.log(formatDate(scheduledTime));
  };
  const createRequest_schedule = async (e) => {
    e.preventDefault();
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
            is_later: "1",
            trip_start_time:  formatDate(scheduledTime)
          }),
        },
        { signal }
      );
      if (response.ok) {
        setSchedule(false)
        alert("Your Ride Has Been successfully Scheduled")
        const DATA = await response.json();
        const convertedData = [DATA.data];
        cancelRqstBtn(convertedData);
        setCancelId(convertedData.id);
        setDriver(convertedData);
      } else {
        console.error(`HTTP error! Status: ${response.message}`);
        alert(
          `Error : ${response.message} , please hit on Cancel to make a new request`
        );
      }
    } catch (error) {
      console.error("Error creating request:", error);
    }
  };

  // firebase real time data fetching starts here

  const [isActive, setIsActive] = useState(null);
  const [displayComp, setDisplayComp] = useState(null);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    if (fetchedUserData2) {
      if (fetchedUserData2?.onTripRequest ) {
        setBooking(true);
        setDisplayComp(1);
        if (fetchedUserData2?.onTripRequest?.data.is_driver_arrived) {
          setDisplayComp(2);
          if (fetchedUserData2?.onTripRequest?.data.is_trip_start) {
            setDisplayComp(3);
            if (fetchedUserData2?.onTripRequest?.data.is_completed) {
              setDisplayComp(4);
            }
          }
        } else {
          // setUserData(null);
          // setIsActive(false);
        }
      }
    }
  }, [fetchedUserData2]);
  console.log("firebase data", driver);
  const resetValue = (val) => {
    setDisplayComp(null);
    setFetchedUserData(null);
    console.log("props data", fetchedUserData2);
    window.location.reload();
  };

  // if (error) {
  //   return <p>{error}</p>;
  // }

  return (
    <>
      {create == false ? (
        <div className="mt-5 pt-7 ">
          <h2 className="text-[22px] font-bold">Recommended</h2>
          {/* panga starts */}
          {cars == true ? (
            <div>
              {abcd?.map((item, index, arr) => (
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
                          <h2 className="text-[18px] font-semibold">
                            {item.name}
                          </h2>
                          <p>{item.description}</p>
                        </div>
                      </div>
                      <h2 className="font-semibold text-[18px]">
                        ₹{item.ride_fare.toFixed(2)}
                      </h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-[18px] font-semibold">No Car Found</div>
          )}

          {/* panga ends */}

          {/* select section starts */}
          <div className="flex justify-center  mt-4 bottom-5 bg-[#faf6ae]  items-center">
            <span className="text-[18px] w-[400px] mb-2 font-bold text-md underline">
              Schedule Your Request For
            </span>

            <span
              className="mb-2 w-1/2 text-[16px] font-bold underline cursor-pointer transition-all hover:scale-110"
              // handleOnClick={(()=>setCreate(true)) }
              onClick={() => {
                setSchedule(true);
              }}
            >
              Select Date
            </span>
          </div>
          {selectedCar?.name ? (
            <div>
              <div className="flex justify-center  mt-4 bottom-5 bg-[#faf6ae] p-3 shadow-xl rounded w-full items-center">
                <h2 className="text-[20px] w-[400px]  mb-2 font-bold text-md">
                  Make Request For
                </h2>

                <button
                  className="p-3 bg-black text-white rounded-lg text-[18px] font-bold px-3"
                  onClick={handleOnChange}
                >
                  {selectedCar.name}
                </button>
              </div>

              {schedule == true ? (
                <div id="taxi_scheduler">
                  <div id="taxi_scheduler_overley"></div>
                  <div id="taxi_scheduler_overley_lifter">
                    <button
                      id="taxi_schedule_cancel"
                      onClick={handle_taxi_schedule_cancel}
                    >
                      X
                    </button>
                    <div className="taxi-scheduler">
                      <h2>Schedule a Taxi Ride</h2>
                      <form onSubmit={createRequest_schedule}>
                        <div className="flex flex-col justify-center items-center w-100">
                          <label htmlFor="scheduledTime">Scheduled Time:</label>
                          <DatePicker
                            selected={scheduledTime}
                            onChange={handleDateChange}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeInterval4es={15}
                            dateFormat="yyyy-MM-dd HH:mm:ss"
                            minDate={new Date()}
                            closeOnScroll={(e) => e.target === document}
                            required
                          />
                        </div>
                        <button className="schedule_main_btn" type="submit">
                          Schedule Ride
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : (
        <div>
          <div>
            {fetchedUserData2?.onTripRequest?.data == null ? (
            <div>
              <div id="driver-searching">
                <h2 className="text-[28px] font-bold">Available Drivers</h2>
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
            </div>
          ) : ( 
            <div>
              {displayComp == 1 ? (
                <div className="relative top-5 overflow-scroll">
                  <BookingRequested
                    pickup={fetchedUserData2?.onTripRequest?.data.pick_address}
                    drop_address={
                      fetchedUserData2?.onTripRequest?.data.drop_address
                    }
                    driver_name={
                      fetchedUserData2?.onTripRequest?.data.driverDetail.data.name
                    }
                    car_name={
                      fetchedUserData2?.onTripRequest?.data.driverDetail.data
                        .vehicle_type_name
                    }
                    car_pic={
                      fetchedUserData2?.onTripRequest?.data.driverDetail.data
                        .vehicle_type_icon
                    }
                    otp={fetchedUserData2?.onTripRequest?.data.ride_otp}
                    handleOnCancel={cancelRequest}

                    mobile = {
                      fetchedUserData2?.onTripRequest?.data.driverDetail.data
                        .mobile
                    }

                  />
                </div>
              ) : null}
              {displayComp == 2 ? (
                <div className="relative top-5 overflow-scroll">
                  <DriverArrived
                    pickup={fetchedUserData2?.onTripRequest?.data.pick_address}
                    drop_address={
                      fetchedUserData2?.onTripRequest?.data.drop_address
                    }
                    driver_name={
                      fetchedUserData2?.onTripRequest?.data.driverDetail.data.name
                    }
                    car_name={
                      fetchedUserData2?.onTripRequest?.data.driverDetail.data
                        .vehicle_type_name
                    }
                    car_pic={
                      fetchedUserData2?.onTripRequest?.data.driverDetail.data
                        .vehicle_type_icon
                    }
                    otp={fetchedUserData2?.onTripRequest?.data.ride_otp}
                    handleOnCancel={cancelRequest}

                    mobile = {
                      fetchedUserData2?.onTripRequest?.data.driverDetail.data
                        .mobile
                    }

                  />
                </div>
              ) : null}
              {displayComp == 3 ? (
                <div className="relative top-5 overflow-scroll">
                  <TripStarted
                    pickup={fetchedUserData2?.onTripRequest?.data.pick_address}
                    drop_address={
                      fetchedUserData2?.onTripRequest?.data.drop_address
                    }
                    driver_name={
                      fetchedUserData2?.onTripRequest?.data.driverDetail.data.name
                    }
                    car_name={
                      fetchedUserData2?.onTripRequest?.data.driverDetail.data
                        .vehicle_type_name
                    }
                    car_pic={
                      fetchedUserData2?.onTripRequest?.data.driverDetail.data
                        .vehicle_type_icon
                    }
                    otp={fetchedUserData2?.onTripRequest?.data.ride_otp}
                    handleOnCancel={cancelRequest}

                  />
                </div>
              ) : null}
              {displayComp == 4 ? (
                <div className="relative top-5 overflow-scroll">
                  <BookingCompleted
                    pickup={fetchedUserData2?.onTripRequest?.data.pick_address}
                    drop_address={
                      fetchedUserData2?.onTripRequest?.data.drop_address
                    }
                    driver_name={
                      fetchedUserData2?.onTripRequest?.data.driverDetail.data.name
                    }
                    car_name={
                      fetchedUserData2?.onTripRequest?.data.driverDetail.data
                        .vehicle_type_name
                    }
                    car_pic={
                      fetchedUserData2?.onTripRequest?.data.driverDetail.data
                        .vehicle_type_icon
                    }
                    otp={fetchedUserData2?.onTripRequest?.data.ride_otp}
                    handleOnCancel={cancelRequest}

                    bill = {fetchedUserData2?.onTripRequest?.data?.requestBill}

                    driverProfile = {
                      fetchedUserData2?.onTripRequest?.data.driverDetail.data
                        .profile_picture
                    }

                    car_number = {
                      fetchedUserData2?.onTripRequest?.data.driverDetail.data
                        .car_number
                    }
                  />
                </div>
              ) : null}
            </div>
            )} 
          </div>
        </div>
      )}
      {/* } */}
    </>
  );
}

export default CarListOption;
