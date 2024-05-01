import React from 'react'

const Pricing = () => {
  return (
    <div className='container'>
      <div className='price-txt'>Choose your plan</div>
      <div className='pricr-txt02'>Publish your ways.whether you'd like to share your knowledge, experiences or the latest news.</div>
      <div className='price-box-main'>
        <div className='price-box'>
          <div className='p-box-txt'>Free</div>
          <div className='p-box-price'>$0</div>
          <div className='p-box-points'>
            <div className='p-point1'><li>500 request</li></div>
            <div className='p-point2'><li>unlimited projects</li></div>
            <div className='p-point3'>
              <div className='p-point03'><li>extended free trial</li></div>
              {/* <div className='p-point003'>FOR EARLY USERS</div> */}
            </div>
          </div>
          <button className='price-btn007'> Get Started</button>
        </div>
        <div className='price-box'>
          <div className='p-box-txt'>Standard</div>
          <div className='p-box-price'>$49</div>
          <div className='p-box-points'>
            <div className='p-point1'><li>2500 request</li></div>
            <div className='p-point2'><li>unlimited projects</li></div>
            <div className='p-point3'>
              <div className='p-point03'><li>extended free trial</li></div>
              {/* <div className='p-point003'>FOR EARLY USERS</div> */}
            </div>
          </div>
          <button className='price-btn007'> Get Started</button>
        </div>
        <div className='price-box'>
          <div className='p-box-txt'>Bussiness</div>
          <div className='p-box-price'>$99</div>
          <div className='p-box-points'>
            <div className='p-point1'><li>5000 request</li></div>
            <div className='p-point2'><li>unlimited projects</li></div>
            <div className='p-point3'>
              <div className='p-point03'><li>extended free trial</li></div>
              {/* <div className='p-point003'>FOR EARLY USERS</div> */}
            </div>
          </div>
          <button className='price-btn007'> Get Started</button>
        </div>
      </div>
    </div>
  )
}

export default Pricing