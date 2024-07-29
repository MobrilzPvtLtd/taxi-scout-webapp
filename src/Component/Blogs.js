import React from 'react'
import img from "../Images/blogs.jpg"

const Blogs = () => {
  const dummyBlogs = [
    {title : "Webinar",
    desc : "Successfully Distributed:how to thrive as a remote agile team (Webinar Follow-Up)",
    btn : "Read more",
    icon : "/Images/driver_profile.png"
},{title : "Webinar",
desc : "Successfully Distributed:how to thrive as a remote agile team (Webinar Follow-Up)",
btn : "Read more",
icon : "/Images/driver_profile.png"},
{title : "Webinar",
desc : "Successfully Distributed:how to thrive as a remote agile team (Webinar Follow-Up)",
btn : "Read more",
icon : "/Images/driver_profile.png"}]
  return (
<div className='blog-container'>
  <div className='flex flex-col justify-center items-center py-4'>
  <h1 className="font-bold text-[40px]">Taxi Scout Blogs</h1>
  <div id='black_underline'></div>
  </div>
    <div className='blog-main'>
      {dummyBlogs.map((item , index)=>(



    <div key={index} className='blog-box'>
        <div className='blog-image'>
          <img  src= {img} />
        </div>
        <div className='blog-box001'>
          <div className='blog-title'>{item.title}</div>
          <div className='blog-heading'>{item.desc}</div>
          <div className='blog-text'>
              <div className='blog-text001'>Remote work</div>
              <div className='blog-text001'>Remote Work</div>
              <div className='blog-text001'>Remote Work</div>
          </div>
          <button id='blog-btn001' className='blog-btn001'> Read more</button>
      </div>
    </div>
      )
      )}
        
    {/* <div className='blog-box'>
        <div className='blog-image'>
          <img src='../../public/driver_profile.png'/>
        </div>
        <div className='blog-box001 container'>
          <div className='blog-title'>webinar</div>
          <div className='blog-heading'>Successfully Distributed:how to thrive as a remote agile team (Webinar Follow-Up)</div>
          <div className='blog-text'>
              <div className='blog-text001'>Remote work</div>
              <div className='blog-text001'>Remote Work</div>
              <div className='blog-text001'>Remote Work</div>
          </div>
          <button className='blog-btn001'> Read more</button>
      </div>
        
    </div>
    <div className='blog-box'>
        <div className='blog-image'></div>
        <div className='blog-box001 container'>
          <div className='blog-title'>webinar</div>
          <div className='blog-heading'>Successfully Distributed:how to thrive as a remote agile team (Webinar Follow-Up)</div>
          <div className='blog-text'>
              <div className='blog-text001'>Remote work</div>
              <div className='blog-text001'>Remote Work</div>
              <div className='blog-text001'>Remote Work</div>
          </div>
          <button className='blog-btn001'> Read more</button>
      </div>
        
    </div> */}
</div>
</div>
  )
}

export default Blogs