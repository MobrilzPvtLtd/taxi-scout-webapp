import React from 'react'

function RentalRequest() {
    const [token, setToken] = useState("eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiN2E0OTQzYmY2OGNjZDliZDIyYTk4Mzc5ZmVkNDdmZWM1MGM4YTcxN2M5YTE3YWRjMTQ5ZWVlYjlhNDIzZjA2ZDc4NDUwNjhkMDhhNmZiMTIiLCJpYXQiOjE3MDI2MTU3MjcuNzg0MzM0LCJuYmYiOjE3MDI2MTU3MjcuNzg0MzM1LCJleHAiOjE3MzQyMzgxMjcuNzc0NzUxLCJzdWIiOiIzMCIsInNjb3BlcyI6W119.Fpw2Q92R4bVDOPx3iwlXeVl17h68LQLPHIyIkndL_GCVJIKQc-WoIsrT6wlxnHql_DGO8mqbg9F95Bma9I9-55X8qFStUPvEDyauR37sF2-yl5H2OQ3cW-wpJBnwTtnS24Tc87-VAspaZgefzYBadeWkD07Mc5NcdJAnmhSBFicsSp8Ukl6l4rCXzMcI4p9oeAHOmzp3bSKueztEAkJbhLElK9DsjDH-jxXxR0A9MmKo6DD29S0O9tgo-1AmKA0wyfntWt0UDe6zpL16B9bJgNv6gOuZYfXQFSCb0MWRxNWA3W1LFdobv3VYcZyaJVmb7raUU8-KHMuM4E1F1_VXUpoMvZ-3etAlziBnWzWzgn4GJF5QvnmhQC7DFmnzoAQyg1ijOxhj0NLmjnb-MSSzF1AddfqvC34nAM17lrErVDlSSGshNa9tr5t7dWYzNtscVf6vmbhIcVtmQB7GwtYthObMP0jBgCUC7UTbBCMkvQWqlp0O66BV3zMtvtJKv9PNLyc50kUsPbiYMUrRJedNnHYclxwAsl-hAHFElCwq-6bGP8j0cVWNu-wDJbJ_hyYFlnVryGkWFlb49yGhLXARMwfMQkxXyr3F5qJ2DH92xVoYDFwxwbmZUIZGO-WEHACXs9piLYROb7BnnejeBu5H0MIaPMqgFuAQrmVbhRSNk8U")

const createRentalRequest = async()=>{
    let url = "https://admin.taxiscout24.com/"
 
let response = await fetch(`${url}api/v1/request/create`,{
    method : 'POST',
headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({"pick_lat":"28.6218877",
  "pick_lng":"77.3868144",
  "drop_lat":"28.6068833",
  "drop_lng":"77.3728872",
  "ride_type":"1",
    "transport_type": "taxi"
  }) })

}

  return (
    <div>RentalRequest</div>
  )
}

export default RentalRequest