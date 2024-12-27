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

function CarListOption({
  option1,
  option2,
  option3,
  option4,
  carFetchFunc,
  distance,
}) {
  const { t } = useTranslation();
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);

  let url = "https://admin.taxiscout24.com/";
  const getTokenFromCookie = (cookieName) => {
    const cookies = document.cookie.split("; "); // Split cookies into an array
    for (const cookie of cookies) {
      const [name, value] = cookie.split("="); // Split each cookie into key and value
      if (name === cookieName) {
        return value; // Return the value if the name matches
      }
    }
    return null; // Return null if the cookie is not found
  };

  // Example usage
  const token = getTokenFromCookie("token");
  console.log(token);

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
        setDemo(true);
      } catch (err) {
        console.error("Error fetching car data:", err);
      }
    };

    carFetch();
  }, [option1, option2, option3, option4]);

  // alert(distance)
  // console.log("car fetch data" , aryann)
  //   carFetch ends here

  const [driver, setDriver] = useState([]);
  const [id, setId] = useState(false);
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
          setId(true);
        } else {
          console.error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData(); // Initial fetch

    const intervalId = setInterval(() => {
      fetchUserData(); // Fetch periodically after the initial request
    }, 5000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [token]);

  const [click, setClick] = useState(false);
  const [create, setCreate] = useState(false);
  const [cancelId, setCancelId] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  // const [checkDriver, setCheckDriver] = useState(0);

  // useEffect for Timer Logic
  useEffect(() => {
    if (checkDriver < 300) {
      const timerID = setInterval(() => {
        setCheckDriver((prevCheckDriver) => prevCheckDriver + 1);
      }, 1000);

      // Cleanup the interval when component unmounts or checkDriver changes
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
      let response = await fetch(URL, {
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
        signal, // Attach abort signal to fetch request
      });

      if (response.ok) {
        const DATA = await response.json();
        const convertedData = [DATA.data];

        sessionStorage.setItem("id", convertedData[0].id);
        cancelRqstBtn(convertedData); // Assuming this is another function you're using
        setCancelId(convertedData[0].id);
        setDriver(convertedData[0]);
        // console.log("Request creation successful:", convertedData);
      } else {
        console.error(`HTTP error! Status: ${response.message}`);
        alert(
          `Error: ${response.message}, please hit Cancel to make a new request`
        );
      }
    } catch (error) {
      console.error("Error creating request:", error);
    }

    // Cleanup fetch abort on unmount
    return () => abortController.abort();
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
  const rqstId = sessionStorage.id;
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
    } else {
      const errorText = await response.text();
      console.error(errorText);
      setResult("failed");
    }
  } catch (error) {
    console.error("Error cancelling request:", error);
  }
};

const handleReloadClick = () => window.location.reload();

const handleOnCancel = () => {
  cancelRequest();
  setClick(false);
  setSearchingDriver(false);
  setDriverFound(false);
  setDriver(null);
  handleReloadClick();
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
        return (
          (!option1 || item.smoking === 1) &&
          (!option2 || item.drinking === 1) &&
          (!option3 || item.pets === 1) &&
          (!option4 || item.handicaped === 1)
        );
      })
    );
  };

  filterData();
}, [aryann, option1, option2, option3, option4]);

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
          vehicle_type: selectedCar.zone_type_id,
          ride_type: "1",
          payment_opt: "1",
          pick_address: source.name,
          drop_address: destination.name,
          request_eta_amount: data.total,
          is_later: "1",
          trip_start_time: formatDate(scheduledTime),
        }),
        signal, // Attach abort signal to the fetch
      });
  
      if (!response.ok) {
        const errorMessage = `Error: ${response.statusText || response.message}`;
        console.error(errorMessage);
        alert(`${errorMessage}, please hit on Cancel to make a new request`);
        return; // Exit early if response is not OK
      }
  
      const DATA = await response.json();
      const convertedData = [DATA.data];
  
      sessionStorage.setItem("id", convertedData[0].id);
      cancelRqstBtn(convertedData); // Assuming this is a function you're using
      setCancelId(convertedData[0].id);
      setDriver(convertedData[0]);
      setSchedule(false);
  
      alert("Your Ride Has Been Successfully Scheduled");
  
    } catch (error) {
      console.error("Error creating request:", error);
      alert("There was an error scheduling your ride. Please try again.");
    } finally {
      // Cleanup abortController when done or if there's an error
      return () => abortController.abort();
    }
  };
  

  // firebase real time data fetching starts here

  const [isActive, setIsActive] = useState(null);
  const [displayComp, setDisplayComp] = useState(null);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    if (fetchedUserData2) {
      if (fetchedUserData2?.onTripRequest) {
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
                            timeInterval4es={15}
                            dateFormat="yyyy-MM-dd HH:mm:ss"
                            minDate={new Date()}
                            closeOnScroll={(e) => e.target === document}
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
            {fetchedUserData2?.onTripRequest?.data == null ? (
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
                {displayComp == 4 ? (
                  <div className="relative top-5 overflow-scroll">
                    <BookingCompleted
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
                      bill={fetchedUserData2?.onTripRequest?.data?.requestBill}
                      driverProfile={
                        fetchedUserData2?.onTripRequest?.data.driverDetail.data
                          .profile_picture
                      }
                      car_number={
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
