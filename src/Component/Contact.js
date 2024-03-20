import React from 'react'
import driverimg from "../Images/driver_profile.png"

const Contact = () => {
  return (
    <div className='contactmain '>
        <div><h1 className='cheading001 text-[#000]'>Contact Us</h1></div>
        <div><p className='ctext001'>Get in touch and let us know how we can help</p></div>
        <div className='c-box-main'>
            <div className='c-box001'>
                <div className='cimage'>
                    <img className='h-[100px] ' src={driverimg}></img>
                </div>
                <div className='ctitle'>sales</div>
                <div className='ctext'>Get in touch and let us know how we can help</div>
                <button className='btn001'>contact us &rarr;</button>
            </div>
            <div className='c-box001'>
                <div className='cimage'>
                <img className='h-[100px]' src={driverimg}></img>
                </div>
                <div className='ctitle'>sales</div>
                <div className='ctext'>Get in touch and let us know how we can help</div>
                <button className='btn001'>contact us &rarr;</button>
            </div>
            <div className='c-box001'>
                <div className='cimage'>
                <img className='h-[100px] ' src={driverimg}></img>
                </div>
                <div className='ctitle'>sales</div>
                <div className='ctext'>Get in touch and let us know how we can help</div>
                <button className='btn001'>contact us &rarr;</button>
            </div>
        </div>
    </div>
  )
}

export default Contact