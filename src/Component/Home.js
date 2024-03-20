import React from 'react'
import Cards from './Cards'
import NavbarHome from './NavbarHome'
import SIgnup from './SIgnup'
import Navbar from './Navbar'
import Search_box from './Search_box'
import GoogleMapSection from './GoogleMapSection'
import './Home.css'

const Home = ( createRequest , parsedResponse) => {
  const SignupButton = () => {
    <SIgnup style={{ display: "none" }} />
  }

  const headerMenu = [
    {
      id: 1,
      name: 'Make A Booking',
      icon: '/taxi.png'

    },
    {
      id: 2,
      name: 'My Trips',
      icon: '/taxi.png'
    }
    ,
    {
      id: 2,
      name: 'Change Language',
      icon: '/taxi.png'
    }
    ,
    {
      id: 2,
      name: 'Make Complaints',
      icon: '/taxi.png'
    }
    ,
    {
      id: 2,
      name: 'About',
      icon: '/taxi.png'
    }
  
  
  
  
  ]

    
  SignupButton()
  return (

    <main>
      <div className='d-flex' >
      
      
        
         <Search_box createRequest = {createRequest} parsedResponse = {parsedResponse} />
       
      <div id='googlemap'>
         <GoogleMapSection />
         </div>
      </div>
    </main>
  )
}

export default Home

