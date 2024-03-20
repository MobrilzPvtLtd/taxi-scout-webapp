import React from 'react'
import teamimg from "../Images/taxi-app-concept-illustration_52683-36028.avif"
const Our_Team = () => {
  return (
    <div className='ourteam-main container'>
        <div className='ourteam001 pl-10'>
            <div className='ourcontent001'>
                <div className='ourheading font-bold'><h2>Our <br/>Team</h2></div>
                <div className='ourtext'><p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p></div>
                <button className='obtn001 bg-[#fffa9a]  '>Learn More</button>
            </div>
        </div>
        <div className='ourteam002'>
          <img className='h-[650px]' src={teamimg}></img>
        </div>
    </div>
  )
}

export default Our_Team