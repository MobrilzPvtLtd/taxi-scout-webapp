import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./TaxiScheduler.css";


const TaxiScheduler = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [scheduledTime, setScheduledTime] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission,
    // e.g., send the data to a server or API
    console.log({
      pickupLocation,
      dropoffLocation,
      scheduledTime,
    });
    alert("Taxi ride scheduled successfully!");
  };

  return (
    <div className="taxi-scheduler">
      <h2>Schedule a Taxi Ride</h2>
      <form className="schedule_form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="scheduledTime">Scheduled Time:</label>
          <DatePicker
            selected={scheduledTime}
            onChange={(date) => setScheduledTime(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            minDate={new Date()}
            required
          />
        </div>
        <button
          
          className="w-full my-2 py-3 font-semibold rounded-lg text-sm lg:px-10 md:py-2 schedule_main_btn"
          type="submit"
        >
          Schedule Ride
        </button>
      </form>
    </div>
  );
};

export default TaxiScheduler;
