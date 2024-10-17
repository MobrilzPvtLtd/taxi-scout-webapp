import { Skeleton } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';


const SubscriptionPage = () => {
  const [loading , setLoading] = useState(true); 
  let url = "https://admin.taxiscout24.com";
  const [price , setPrice] = useState();
useEffect(()=>{

  const handlePrice= async()=>{
    setLoading(true)
    const response = await axios.get(`${url}/api/v1/admin/packages`)
    if(response){
      setPrice(response.data)
      setLoading(false)
    }
  }
  handlePrice();
},[])
  return (
  <>
  {loading ?  <div className="container  mx-auto px-0 sm:px-2"><Skeleton active /></div> : 
    <section class="bg-gradient-to-r from-yellow-500 to-orange-500 py-12 mt-16  ">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <div class="text-4xl font-extrabold text-black sm:text-5xl">
       <h1>  Choose Your Plan </h1>
      </div>
      <p class="mt-4 text-xl text-gray-700">
        Unlock the power of decentralized finance with our cutting-edge solutions.
      </p>
    </div>

    <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {price?.map((item , index)=>(

      
      <div class="bg-white bg-opacity-10 rounded-lg shadow-lg p-6 relative overflow-hidden" key={index}>
        <div class="absolute top-0 right-0 m-4">
          <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
           {item.package_name}
          </span>
        </div>
        <div class="mb-8">
          <h3 class="text-2xl font-semibold text-black">{item.package_name}</h3>
          {/* <p class="mt-4 text-purple-200">Perfect for individuals and small teams.</p> */}
        </div>
        <div class="mb-8">
          <span class="text-5xl font-extrabold text-black">${item.amount}</span>
          <span class="text-xl font-medium text-black-300">/mo</span>
        </div>
        <ul class="mb-8 space-y-4 text-gray-700">
          <li class="flex items-center">
            <svg class="h-6 w-6 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>{item.number_of_drivers} Drivers</span>
          </li>
          <li class="flex items-center">
            <svg class="h-6 w-6 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Basic reporting</span>
          </li>
        </ul>
        <a href="#" class="block w-full py-3 px-6 text-center rounded-md text-black font-semibold bg-gradient-to-r from-yellow-600 to-[#ffd91c] hover:from-yellow-700 hover:to-orange-400">
          Get Started
        </a>
      </div>))}
      {/* <div class="bg-white bg-opacity-10 rounded-lg shadow-lg p-6 relative overflow-hidden">
        <div class="absolute top-0 right-0 m-4">
          <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            Pro
          </span>
        </div>
        <div class="mb-8">
          <h3 class="text-2xl font-semibold text-white">Growth Pack</h3>
          <p class="mt-4 text-purple-200">Ideal for growing businesses and enterprises.</p>
        </div>
        <div class="mb-8">
          <span class="text-5xl font-extrabold text-white">$199</span>
          <span class="text-xl font-medium text-purple-200">/mo</span>
        </div>
        <ul class="mb-8 space-y-4 text-purple-200">
          <li class="flex items-center">
            <svg class="h-6 w-6 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Unlimited user accounts</span>
          </li>
          <li class="flex items-center">
            <svg class="h-6 w-6 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Unlimited transactions</span>
          </li>
          <li class="flex items-center">
            <svg class="h-6 w-6 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Advanced analytics</span>
          </li>
          <li class="flex items-center">
            <svg class="h-6 w-6 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Priority support</span>
          </li>
        </ul>
        <a href="#" class="block w-full py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700">
          Get Started
        </a>
      </div> */}
      {/* <div class="bg-white bg-opacity-10 rounded-lg shadow-lg p-6 relative overflow-hidden">
        <div class="absolute top-0 right-0 m-4">
          <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
            Enterprise
          </span>
        </div>
        <div class="mb-8">
          <h3 class="text-2xl font-semibold text-white">Scale Pack</h3>
          <p class="mt-4 text-purple-200">Tailored for large-scale deployments and custom needs.</p>
        </div>
        <div class="mb-8">
          <span class="text-5xl font-extrabold text-white">Custom</span>
        </div>
        <ul class="mb-8 space-y-4 text-purple-200">
          <li class="flex items-center">
            <svg class="h-6 w-6 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Dedicated infrastructure</span>
          </li>
          <li class="flex items-center">
            <svg class="h-6 w-6 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Custom integrations</span>
          </li>
          <li class="flex items-center">
            <svg class="h-6 w-6 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Dedicated support team</span>
          </li>
          <li class="flex items-center">
            <svg class="h-6 w-6 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Premium SLAs</span>
          </li>
        </ul>
        <a href="#" class="block w-full py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700">
          Contact Sales
        </a>
      </div> */}
    </div>
  </div>
</section>}
</>
  );
};

export default SubscriptionPage;
