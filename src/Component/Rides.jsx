import React, { useEffect, useState } from 'react'; 

function Rides() {
  const [rides, setRides] = useState([]); 
  const [filter, setFilter] = useState('all');
  const [selectedRide, setSelectedRide] = useState(null);

  const getTokenFromCookie = (cookieName) => {
    const cookies = document.cookie.split("; "); 
    for (const cookie of cookies) {
      const [name, value] = cookie?.split("=");
      if (name === cookieName) {
        return value;
      }
    }
    return null;
  };
  const authToken = getTokenFromCookie("token");
  useEffect(() => {
    if(!authToken){
      window.location.href = "/";
    }
  }, [])
// api call
  useEffect(() => {
    fetch('https://admin.taxiscout24.com/api/v1/request/history', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then(response => response.json())
      .then(response => {
        setRides(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [authToken]);

  const filteredRides = rides?.filter(ride => {
    if (filter === 'all') return true;
    if (filter === 'completed') return ride.is_completed;
    if (filter === 'upcoming') return ride.is_later;
    if (filter === 'cancelled') return !ride.is_completed && !ride.is_later;
    return false;
  });

  const allCount = rides?.length || 0;
  const completedCount = rides?.filter(ride => ride.is_completed)?.length || 0;
  const upcomingCount = rides?.filter(ride => ride.is_later)?.length || 0;
  const cancelledCount = rides?.filter(ride => !ride.is_completed && !ride.is_later)?.length || 0;

  const handleRowClick = (ride) => {
    setSelectedRide(ride);
  };

  const closeModal = () => {
    setSelectedRide(null);
  };

  return (
    <div className="px-2 py-4  md:p-4  mt-20 bg-white h-screen font-sans text-gray-800">
      <div className="border-b md:mx-10 border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm md:text-base md:font-semibold text-center text-gray-700 dark:text-gray-300">
          <li className="md:mr-2">
            <button
              className={`inline-flex items-center justify-center p-1 md:p-4 border-b-2 ${filter === 'all' ? 'text-blue-600 border-blue-600' : 'border-transparent'} rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group`}
              onClick={() => setFilter('all')}
            >
              All Rides ({allCount})
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-flex items-center justify-center  p-1 md:p-4 border-b-2 ${filter === 'completed' ? 'text-blue-600 border-blue-600' : 'border-transparent'} rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group`}
              onClick={() => setFilter('completed')}
            >
              Completed ({completedCount})
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-flex items-center justify-center p-1 md:p-4 border-b-2 ${filter === 'upcoming' ? 'text-blue-600 border-blue-600' : 'border-transparent'} rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group`}
              onClick={() => setFilter('upcoming')}
            >
              Upcoming ({upcomingCount})
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-flex items-center justify-center p-1 md:p-4 border-b-2 ${filter === 'cancelled' ? 'text-blue-600 border-blue-600' : 'border-transparent'} rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group`}
              onClick={() => setFilter('cancelled')}
            >
              Cancelled ({cancelledCount})
            </button>
          </li>
        </ul>
      </div>
      <div className="overflow-y-auto md:mx-10 h-full">
        <table className="min-w-full bg-white text-sm">
          <thead>
            <tr>
              <th className="py-3 px-2 md:pr-4 border-b whitespace-nowrap">Trip time</th>
              <th className="py-3 px-2 md:px-4 border-b whitespace-nowrap">Transport Type</th>
              <th className="py-3 px-2 md:px-4 border-b">Status</th>
              <th className="py-3 px-2 md:px-4 border-b">Pickup Address</th>
              <th className="py-3 px-2 md:px-4 border-b">Drop Address</th>
            </tr>
          </thead>
          <tbody>
            {filteredRides?.map(ride => (
              <tr key={ride.id} onClick={() => handleRowClick(ride)} className="cursor-pointer">
                <td className="py-2 px-2 md:pr-4 border-b">{ride.trip_start_time ? ride.trip_start_time : "Un available"}</td>
                <td className="py-2 px-2 md:px-4 border-b">{ride.transport_type}</td>
                <td className="py-2 px-2 md:px-4 border-b">{ride.is_completed ? 'Completed' : ride.is_cancelled ? 'Cancelled' : 'Upcoming'}</td>
                <td className="py-2 px-2 md:px-4 border-b truncate max-w-xs">{ride.pick_address}</td>
                <td className="py-2 px-2 md:px-4 border-b truncate max-w-xs">{ride.drop_address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedRide && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={closeModal}
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
 
                <h3 className="mb-2 text-lg font-normal text-gray-500 dark:text-gray-400">Ride Details</h3>
                <div className="mb-4 text-sm text-left">
                  <p><strong>Trip time:</strong> {selectedRide.trip_start_time ? selectedRide.trip_start_time : "Un available"}</p>
                  <p><strong>Transport Type:</strong> {selectedRide.transport_type}</p>
                  <p><strong>Otp:</strong> {selectedRide.ride_otp}</p>
                  <p><strong>Status:</strong> {selectedRide.is_completed ? 'Completed' : selectedRide.is_cancelled ? 'Cancelled' : 'Upcoming'}</p>
                  <p><strong>Pickup Address:</strong> {selectedRide.pick_address}</p>
                  <p><strong>Drop Address:</strong> {selectedRide.drop_address}</p>
                  {/* Add more ride details here */}
                </div>
                <button
                  type="button"
                  className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={closeModal}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Rides;