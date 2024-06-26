import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "./TaxiScheduler.css"

const TaxiScheduler = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
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
    alert('Taxi ride scheduled successfully!');
  };

  return (
    <div className="taxi-scheduler">
      <h2>Schedule a Taxi Ride</h2>
      <form onSubmit={handleSubmit}>
        {/* <div>
          <label htmlFor="pickupLocation">Pickup Location:</label>
          <input
            type="text"
            id="pickupLocation"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="dropoffLocation">Drop-off Location:</label>
          <input
            type="text"
            id="dropoffLocation"
            value={dropoffLocation}
            onChange={(e) => setDropoffLocation(e.target.value)}
            required
          />
        </div> */}
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
        <button className='schedule_main_btn' type="submit">Schedule Ride</button>
      </form>
    </div>
  );
};

export default TaxiScheduler;
