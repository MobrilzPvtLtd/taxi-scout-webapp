import React from 'react'
import './MainPage.css'
import { Link } from 'react-router-dom'

function MainPage() {
  return (
    <div>
        
{/* main page starts */}

{/* <header class="bg-dark">
      <div class="container">
        <nav>
          <div>
            <a href="#" class="logo">
                <img src='./logo.png' width={100} height={100} alt='logo' />
            </a>
            <ul class="nav-links">
              <li><a href="#">Company</a></li>
              <li><a href="#">Safety</a></li>
              <li><a href="#">Help</a></li>
            </ul>
          </div>
          <div>
            <ul id="nav-links" class="nav-links">
              
              <li className='ml-8'><Link to="/">Log in</Link></li>
              <li className='ml-8'><Link to="/signup" class="nav__cta">Sign up</Link></li>
            </ul>
          </div>
          <div class="hamburger">
            <span class="hamburger-bar"></span
            ><span class="hamburger-bar"></span>
            <span class="hamburger-bar"></span>
          </div>
        </nav>
      </div>
    </header> */}

    <section id="main__cta">
      <div class="container">
        <div class="split">
          <div class="main__cta__rectangle bg-light">
            <div class="split main__cta__options">
              
              <div class="main__cta__card">
                <img
                  src="./car-front-outlined.svg" width={50} height={50}
                  alt=""
                />
            <div className='text-[22px] font-bold'>
            GET A RIDE NOW 
            </div>
              </div>
            </div>
            <div class="main__cta__text">
              <h1>Ride With Us and Reach Safely </h1>
              <p class="sous-titre">
              Join the platform that gives you access to the largest network of active Taxies.
              </p>
              <Link to="/signup" className="btn ml-[120px]" >Sign up to get a ride</Link>
              
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </section>

   
    <section id="applications__section">
      <div class="container p-20 ms-20">
        <h3>Find even more features in our applications</h3>
        <div class="split">
         
          <a data-aos="fade-left" href="#" class="app__card">
            <span>Taxi Scout</span>
          
            <p class="app__titre">  Download the Taxi Scout App</p>
          </a>
        </div>
      </div>
    </section>

    <footer class="bg-dark">
      <div class="container">
        <nav>
          {/* <div><a href="#" class="logo">Taxi Scout</a></div>
          <div>
            <a href="#">Fonctionnement des applications et du site web Uber</a>
          </div> */}
        </nav>
      </div>
    </footer>
    <script>
      AOS.init();
    </script>
{/* main page ends */}

    </div>
  )
}

export default MainPage