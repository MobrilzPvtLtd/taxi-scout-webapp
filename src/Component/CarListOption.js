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
import { format, set } from "date-fns";
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
import { useTranslation } from "react-i18next";


function CarListOption({ capacity, option3, option4, carFetchFunc, distance }) {
  const { t } = useTranslation();
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);
  let url = "https://admin.taxiscout24.com/";
  const navigate = useNavigate();
  const getTokenFromCookie = (cookieName) => {
    const cookies = document.cookie.split("; "); // Split cookies into an array
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === cookieName) {
        return value;
      }
    }
    return null;
  };
  const token = getTokenFromCookie("token");
  const [loading, setLoading] = useState(true);
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
    const carFetch = async () => {
      try {
        const response = await fetch(`${url}api/v1/request/eta`, {
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

        // Check if the response status is successful
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const parsedResponse = await response.json();

        setAryann(parsedResponse.data);
        console.log(parsedResponse.data)
        setDemo(true);
      } catch (err) {
        console.error("Error fetching car data:", err);
      }
    };

    carFetch();
  }, [capacity, option3, option4, distance]);
  const [driver, setDriver] = useState([]);
  const [id, setId] = useState("");
  const [fetchedUserData, setFetchedUserData] = useState([]);
  const [fetchedUserData2, setFetchedUserData2] = useState([]);

useEffect(() => {
  if (!token) return;

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${url}api/v1/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const convertedData = [data.data];

        setFetchedUserData(convertedData);
        setFetchedUserData2(data.data);
        setId(data.data.id);
      } else if (response.status === 401) {
        console.warn("Unauthorized! Redirecting to login...");
        navigate("/login");
      } else {
        console.error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchUserData(); // Run once when the component mounts

  const intervalId = setInterval(() => {
    fetchUserData(); // Fetch data every 5 seconds
  }, 2000);

  return () => clearInterval(intervalId); // Cleanup interval on component unmount
}, [token]); // Run effect whenever token changes


  const [click, setClick] = useState(false);
  const [create, setCreate] = useState(false);
  const [cancelId, setCancelId] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  useEffect(() => {
    if (checkDriver < 300) {
      const timerID = setInterval(() => {
        setCheckDriver((prevCheckDriver) => prevCheckDriver + 1);
      }, 1000);
      return () => clearInterval(timerID);
    }
  }, [checkDriver]);

  // Create request function
 const createRequest = async () => {
  setCheckDriver(1);
  setCreate(true);

  const abortController = new AbortController();
  const { signal } = abortController;

  try {
    let URL = `${url}api/v1/request/create`;

    const requestBody = {
      pick_lat: source.lat,
      pick_lng: source.lng,
      drop_lat: destination.lat,
      drop_lng: destination.lng,
      vehicle_type: selectedCar?.zone_type_id,
      ride_type: "1",
      payment_opt: "1",
      pick_address: source?.label,
      drop_address: destination?.label,
      request_eta_amount:selectedCar?.total,
    };

    console.log("Request Body:", JSON.stringify(requestBody, null, 2));

    let response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
      signal,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("API Error:", errorData || response.statusText);
      alert(`Error: ${errorData?.message || response.statusText}`);
      return;
    }

    const DATA = await response.json();
    const convertedData = [DATA.data];

    // Store request ID in a cookie
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);
    document.cookie = `id=${
      convertedData[0].id
    }; path=/; secure; samesite=strict; expires=${expirationDate.toUTCString()}`;

    // Update UI state with response data
    cancelRqstBtn(convertedData);
    setCancelId(convertedData[0].id);
    setDriver(convertedData[0]);

   
  } catch (error) {
    console.error("Error creating request:", error);
    alert("There was an error creating your ride request. Please try again.");
  }

  return () => abortController.abort();
};


  useEffect(() => {
    if (
      fetchedUserData2?.onTripRequest !== undefined &&
      fetchedUserData2?.onTripRequest !== null
    ) {
      setNoDriverFound(false);
    }
  }, [checkDriver, fetchedUserData]);

  const cancelRqstBtn = (id) => {
    return id;
  };
 


  const [userCancelled, setUserCancelled] = useState(false);
  const [userRequestData, setUserRequestData] = useState([]);
  const [internet, setInternet] = useState([]);
  const [result, setResult] = useState("");
  const [driverWait, setDriverWait] = useState(null);
  const [display, setDisplay] = useState(null);
  const [driverFound, setDriverFound] = useState(null);
  const [searchingDriver, setSearchingDriver] = useState(null);
  const [proceed, setProceed] = useState(null);
  const getCookie = (name) => {
    const cookieArr = document.cookie.split("; ");
    for (let cookie of cookieArr) {
      const [key, value] = cookie.split("=");
      if (key === name) return value;
    }
    return null;
  };
  const handleReloadClick = () => window.location.reload();
  const rqstId = getCookie("id");

  const cancelRequest = async () => {
    try {
      const response = await fetch(`${url}api/v1/request/cancel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          request_id: rqstId,
          custom_reason: "cancel",
        }),
      });

      if (response.ok) {
        setUserCancelled(true);
        setResult("success");
        handleReloadClick();
      } else {
        const errorText = await response.text();
        console.error(errorText);
        setResult("failed");
      }
    } catch (error) {
      console.error("Error cancelling request:", error);
    }
  };
 
  const cancelRequests = () => {
    navigate(0); // Completely reloads the page
};
const handleOnCancels = () => {
  setClick(false);
  setSearchingDriver(false);
  setDriverFound(false);
  setDriver(null);
};

  const handleOnCancel = () => {
    cancelRequest();
    setClick(false);
    setSearchingDriver(false);
    setDriverFound(false);
    setDriver(null);
  };

  const handleOnCancel2 = () => {
    cancelRequest();
    setBooking(false);
    handleReloadClick();
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    createRequest();
    setClick(true);
    setNoDriverFound(true);
    setSearchingDriver(true);
  };

  const time = new Date();
  time.setSeconds(time.getSeconds() + 300); // 5 minutes timer

  const [finalData, setFinalData] = useState(aryann);

  useEffect(() => {
    const filterData = () => {
      setFinalData(
        aryann?.filter((item) => {
          if (capacity <= 4) {
            return (
              (!capacity || item.capacity <= 4) &&
              (!option3 || item.pets === 1) &&
              (!option4 || item.handicaped === 1)
            );
          }
          else if (capacity >= 5) {
            return (
              (!capacity || item.capacity >= 5) &&
              (!option3 || item.pets === 1) &&
              (!option4 || item.handicaped === 1)
            );
          }
        })
      );
    };

    filterData();
  }, [aryann, capacity, option3, option4]);

  useEffect(() => {
    if (finalData?.length > 0) {
      setCars(true);
    } else if (fetchedUserData2?.onTripRequest?.data?.is_driver_started === 1) {
      setRideStarted(true);
    } else {
      setCars(false);
    }
  }, [finalData, fetchedUserData2, checkDriver]);

  const [scheduledTime, setScheduledTime] = useState(new Date());

  const handle_taxi_schedule_cancel = () => {
    setSchedule(false);
  };
 
  const handleDateChange = (date) => {
    setScheduledTime(date);
  };
  console.log("final data", finalData, "capacity", capacity);
  const formatDate = (date) => {
    if (!date) return "";
    return format(date, "yyyy-MM-dd HH:mm:ss");
  };

  const handle_schedule_taxi = (e) => {
    e.preventDefault();
  };
  const formatDateTime = (date) => {
    const pad = (num) => (num < 10 ? `0${num}` : num); // Ensures double-digit formatting
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  };
  
  const createRequest_schedule = async (e) => {
    e.preventDefault();
  
    if (!scheduledTime) {
      alert("Please select a valid scheduled time.");
      return;
    }
  
    const formattedDateTime = formatDateTime(scheduledTime); // ✅ Format date
  
    const abortController = new AbortController();
    const { signal } = abortController;
  
    try {
      let URL = `${url}api/v1/request/create`;
  
      const response = await fetch(URL, {
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
          vehicle_type: selectedCar?.zone_type_id,
          ride_type: "1",
          payment_opt: "1",
          pick_address: source?.label,
          drop_address: destination?.label,
          is_later: true,
          trip_start_time: formattedDateTime, // ✅ Send formatted date
        }),
        signal,
      });
  
      if (!response.ok) {
        const errorMessage = `Error: ${response.statusText || response.message}`;
        console.error(errorMessage);
        alert(`${errorMessage}, please hit on Cancel to make a new request`);
        return;
      }
  
      const DATA = await response.json();
      const convertedData = [DATA.data];
  
      sessionStorage.setItem("id", convertedData[0].id);
      cancelRqstBtn(convertedData);
      setCancelId(convertedData[0].id);
      setDriver(convertedData[0]);
      setSchedule(false);
  
      alert("Your Ride Has Been Successfully Scheduled");
    } catch (error) {
      console.error("Error creating request:", error);
      alert("There was an error scheduling your ride. Please try again.");
    } finally {
      return () => abortController.abort();
    }
  };
  

  const [isActive, setIsActive] = useState(null);
  const [displayComp, setDisplayComp] = useState(null);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    console.log("Fetched Data:", fetchedUserData2?.onTripRequest?.data); // Log data for debugging
    if (fetchedUserData2) {
      if (fetchedUserData2?.onTripRequest) {
        setBooking(true);
        setDisplayComp(1);
        if (fetchedUserData2?.onTripRequest?.data.is_driver_arrived===1) {
          setDisplayComp(2);
          if (fetchedUserData2?.onTripRequest?.data.is_trip_start===1) {
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
  const resetValue = (val) => {
    setDisplayComp(null);
    setFetchedUserData(null);
    window.location.reload();
  };

 
  return (
    <>
      {create == false ? (
        <div className="mt-5 pt-7 ">
          <h2 className="text-2xl font-bold">{t("recommended")}</h2>
          {/* panga starts */}
          {cars == true ? (
            <div>
              {finalData?.map((item, index, arr) => (
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
                <div className="flex flex-col items-center md:flex-row md:items-center gap-3 w-full">
  {/* Image */}
  <img src={item.icon} className="w-[100px] h-[100px] object-cover" />

  {/* Name and Fare - Moves below image on smaller screens */}
  <div className="flex flex-col items-center md:items-start text-center md:text-left w-full">
    <h2 className="text-[18px] font-semibold">{item.name}</h2>
    <p className="text-gray-700 font-medium">₹{item.ride_fare.toFixed(2)}</p>
  </div>
</div>

                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-[18px] font-semibold">{t("no_car_found")}</div>
          )}

          {/* panga ends */}

          {/* select section starts */}
          <div className="flex justify-center  mt-4 bottom-5 shadow-black shadow rounded-xl items-center">
            <span className="text-md w-full mb-2 font-bold text-md underline">
              {t("schedule_your_request_for")}
            </span>

            <span
              className="mb-2 w-1/2 text-md font-bold underline cursor-pointer transition-all hover:scale-110"
              // handleOnClick={(()=>setCreate(true)) }
              onClick={() => {
                setSchedule(true);
              }}
            >
              {t("select_date")}
            </span>
          </div>
          {selectedCar?.name ? (
            <div>
              <div className="flex justify-center  mt-4 bottom-5 p-3 shadow-xl rounded w-full items-center">
                <h2 className="text-md w-48  mb-2 font-bold text-md">
                  {t("make_request_for")}
                </h2>

                <button
                  className="text-xs px-3 sm:p-3 bg-black text-white rounded-lg sm:text-lg sm:font-bold w-fit sm:px-5"
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
                      <h2>{t("schedule_a_taxi_ride")}</h2>
                      <form onSubmit={createRequest_schedule}>
                        <div className="flex flex-col justify-center items-center w-100">
                          <label htmlFor="scheduledTime">
                            {t("scheduled_time")}
                          </label>
                          <DatePicker
  selected={scheduledTime}
  onChange={handleDateChange}
  showTimeSelect
  timeFormat="HH:mm"
  timeIntervals={15}
  dateFormat="yyyy-MM-dd HH:mm:ss"
  minDate={new Date()} // Prevent past dates
  closeOnScroll={true}
  required
/>

                        </div>
                        <button className="schedule_main_btn" type="submit">
                          {t("schedule_ride")}
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
            {fetchedUserData2?.metaRequest?.data != null ? (
              <div className="w-full border-2 mt-3">
                <h2 className="mt-2 text-2xl sm:text-4xl font-bold">
                  {t("available_drivers")}
                </h2>
                <div className=" flex flex-col items-center justify-center">
                  <p className="text-[22px] ">{t("searching_for_driver")}</p>
                  <img width={150} height={150} src={driver_gif} />
                  <MyTimer expiryTimestamp={time} />
                  <button
                    id="btn_hover_main"
                    className="w-full my-2 py-3 font-semibold rounded-lg text-sm lg:px-10 md:py-2"
                    onClick={handleOnCancel}
                  >
                    {t("cancel_request")}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {displayComp == 1 ? (
                  <div className="relative top-5 overflow-scroll">
                    <BookingRequested
                      pickup={
                        fetchedUserData2?.onTripRequest?.data.pick_address
                      }
                      drop_address={
                        fetchedUserData2?.onTripRequest?.data.drop_address
                      }
                      driver_name={
                        fetchedUserData2?.onTripRequest?.data.driverDetail.data
                          .name
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
                      mobile={
                        fetchedUserData2?.onTripRequest?.data.driverDetail.data
                          .mobile
                      }
                    />
                  </div>
                ) : null}
                {displayComp == 2 ? (
                  <div className="relative top-0 overflow-scroll">
                    <DriverArrived
                      pickup={
                        fetchedUserData2?.onTripRequest?.data.pick_address
                      }
                      drop_address={
                        fetchedUserData2?.onTripRequest?.data.drop_address
                      }
                      driver_name={
                        fetchedUserData2?.onTripRequest?.data.driverDetail.data
                          .name
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
                      mobile={
                        fetchedUserData2?.onTripRequest?.data.driverDetail.data
                          .mobile
                      }
                    />
                  </div>
                ) : null}
                {displayComp == 3 ? (
                  <div className="relative top-5 overflow-scroll">
                    <TripStarted
                      pickup={
                        fetchedUserData2?.onTripRequest?.data.pick_address
                      }
                      drop_address={
                        fetchedUserData2?.onTripRequest?.data.drop_address
                      }
                      driver_name={
                        fetchedUserData2?.onTripRequest?.data.driverDetail.data
                          .name
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
                {displayComp === 4 ? (
                  
  <div className="relative top-5 overflow-scroll">
  console.log("Bill Data:", bill);
    <BookingCompleted
      pickup={fetchedUserData2?.onTripRequest?.data?.pick_address ?? "N/A"}
      drop_address={fetchedUserData2?.onTripRequest?.data?.drop_address ?? "N/A"}
      driver_name={fetchedUserData2?.onTripRequest?.data?.driverDetail?.data?.name ?? "Unknown"}
      car_name={fetchedUserData2?.onTripRequest?.data?.driverDetail?.data?.vehicle_type_name ?? "Unknown"}
      car_pic={fetchedUserData2?.onTripRequest?.data?.driverDetail?.data?.vehicle_type_icon ?? ""}
      otp={fetchedUserData2?.onTripRequest?.data?.ride_otp ?? "0000"}
      handleOnCancels={cancelRequests}
      bill={fetchedUserData2?.onTripRequest?.data?.requestBill}
      driverProfile={fetchedUserData2?.onTripRequest?.data?.driverDetail?.data?.profile_picture ?? ""}
      car_number={fetchedUserData2?.onTripRequest?.data?.driverDetail?.data?.car_number ?? "N/A"}
      request_id={fetchedUserData2?.onTripRequest?.data?.id ?? "N/A"}
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
