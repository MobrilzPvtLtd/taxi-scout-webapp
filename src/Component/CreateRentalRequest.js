import React, { useState } from 'react'
// Assuming 'fetch' is used for making HTTP requests in React


 function CreateRentalRequest() {
    let result;
  let url = "https://www.mobrilz.digital/admin/public/"
 let token = sessionStorage.token ;
 const [noDriverFound , setNoDriverFound] = useState(false);
    const [tripReqError , setTripReqError] = useState(false)
    const [internet, setInternet] = useState(true); // Assuming internet is initially true
    const [data , setData] =useState([])


    const CreateRentalRequest2=async()=>{
    try {
      const response = await fetch(`${url}api/v1/request/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'pick_lat':"28.6218872",
          'pick_lng': "77.3868142",
          'vehicle_type': "363c765b-0b85-4a79-bcea-0a5fb016e6a0",
          'ride_type': 1,
          'payment_opt': 1,
          'pick_address': "E185, Sector 63 Rd, E Block, Sector 63, Noida, Hazratpur Wajidpur, Uttar Pradesh 201301, India",
          'request_eta_amount': "273.6",
        //   'rental_pack_id': etaDetails[rentalChoosenOption]['id']
        }),
      });
  
      if (response.ok) {
        const  data2 = await response.json();
        console.log(data2.data)
       setData(data2.data);
        result = 'success';
        // Perform actions or state updates as needed
      } else {
        console.error('Request failed:', response.statusText);
        const responseData = await response.json();
        if (responseData.message === 'no drivers available') {
          setNoDriverFound(true);
        } else {
          setTripReqError(true);
        }
        result = 'failure';
        // Perform actions or state updates as needed
      }
    } catch (error) {
      console.error('Error:', error.message);
      if (error instanceof TypeError && error.message.includes('NetworkError')) {
        internet = false;
        result = 'no internet';
        // Perform actions or state updates as needed
      }
    }

}
CreateRentalRequest2()

    return (
        <div>
          {data.map((item)=>{
            <div>{item.vehicle_type_image}</div>
          })}
        {/* Your React components and UI elements */}
        <button onClick={CreateRentalRequest2}>Make Request</button>
      </div>
      )
    
    }
    
    export default CreateRentalRequest

  