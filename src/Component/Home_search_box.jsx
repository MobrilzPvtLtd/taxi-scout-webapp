import React, { useState } from 'react'
import InputItem from './InputItem'
import LocationButton from './LocationButton'
import {  useNavigate} from 'react-router-dom'



const Home_search_box = () => {
const history = useNavigate();
    const handleSubmit = () => {

        history ('/login')
    }
  return (
    <div><div id="main-box">
    <div class="css-hPnljU">
      <h2 class="css-jzIGNN">Request a ride now</h2>
    </div>
    <div class="search-input ">
      <InputItem type="source" />
      <InputItem type="destination" />
    </div>
    <button
      style={{
        backgroundColor: "black",
        borderRadius: "10px",
        height: "70px",
        width: "220px",
        fontSize: "28px",
        marginTop: "20px",
        marginRight: "25px",
      }}
      onClick={handleSubmit}
    >
      Search
    </button>
    </div>
    </div>


  )
}

export default Home_search_box