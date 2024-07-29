import React from 'react'
import img from "../Images/serve_globally2.jpg"


const About_us = () => {
  return (
    <div>
    <div className="title_box">
      <div className="title_main container">
        <div className='flex flex-col items-center'>
          <h1 className='font-bold'>About Us</h1>
        <div className="line001"></div>
        </div>
        <div>
          <p className="text001"> Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.

Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
        </div>
      </div>
      <div className="main2 container">
        <div><h2 className='text-[30px] pt-5 pb-5 font-bold' > Who We Are</h2></div>
        <div className='about_us_content flex gap-5 pb-5'>
        <div className='w-[50%]'><p className="text-[1.5rem] text-justify">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.

Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.

A small river named Duden flows by their place and supplies it with the necessary regelialia.

It is a paradisematic country, in which roasted parts of sentences fly into your mouth.

Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.


</p></div>
<div className='w-[50%] flex flex-col justify-center'><img className="" src={img} ></img></div></div>
      </div>
    </div>
  </div>
  )
}

export default About_us