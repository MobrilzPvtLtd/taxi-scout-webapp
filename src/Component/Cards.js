import React from 'react'
import './HomePage.css';
import { Link } from 'react-router-dom';

const cardinfo = [
    {image : "https://images.newindianexpress.com/uploads/user/imagelibrary/2022/6/30/w900X450/GST_CouncilsMeet.jpg?w=400&dpr=2.6" , title : "GST" , tag : "Click Here"},
    {image : "https://images.newindianexpress.com/uploads/user/imagelibrary/2022/6/30/w900X450/GST_CouncilsMeet.jpg?w=400&dpr=2.6" , title : "Aryann" , tag : "Click Here"},
    {image : "https://images.newindianexpress.com/uploads/user/imagelibrary/2022/6/30/w900X450/GST_CouncilsMeet.jpg?w=400&dpr=2.6" , title : "BGST" , tag : "Click Here"},
    {image : "https://images.newindianexpress.com/uploads/user/imagelibrary/2022/6/30/w900X450/GST_CouncilsMeet.jpg?w=400&dpr=2.6" , title : "GST" , tag : "Click Here"},
    {image : "https://images.newindianexpress.com/uploads/user/imagelibrary/2022/6/30/w900X450/GST_CouncilsMeet.jpg?w=400&dpr=2.6" , title : "GST" , tag : "Click Here"},
    {image : "https://images.newindianexpress.com/uploads/user/imagelibrary/2022/6/30/w900X450/GST_CouncilsMeet.jpg?w=400&dpr=2.6" , title : "GST" , tag : "Click Here"}


] 
 const  cardRender =(card , index)=>{

return (
 
<div className="card ">
<Link to="#" >
  <img src="https://st.adda247.com/https://wpassets.adda247.com/wp-content/uploads/multisite/sites/5/2023/07/03103809/gst-percent.jpg" alt="Card 1" />
        <h2>{card.title}</h2>
         </Link>
      </div>
     

    
)

 }


const Cards = () => {
  return (
    <div className="container grid-container">

{cardinfo.map(cardRender)}


    </div>
  )
}

export default Cards
