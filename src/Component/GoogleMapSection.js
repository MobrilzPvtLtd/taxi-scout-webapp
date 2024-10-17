import React, { useContext , useEffect, useState } from 'react'
import { DirectionsRenderer, GoogleMap, Marker, MarkerF, OverlayView, OverlayViewF, useJsApiLoader } from '@react-google-maps/api';
import { SourceContext } from '../Context/SourceContext';
import { DestinationContext } from '../Context/DestinationContext';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// import GoogleMapSection from './GoogleMapSection';
import InputItem from './InputItem';
import locator from '../Images/taxi.png'


function GoogleMapSection() {
  const {source, setSource} = useContext(SourceContext);
  const {destination ,setDestination} = useContext(DestinationContext)

  const containerStyle = {
      width: '',
      height: '40rem'
    };
    
    
     
       

    // const { isLoaded } = useJsApiLoader({
    //     id: 'google-map-script',
    //     googleMapsApiKey: "AIzaSyAhZQSz7cUgNdkv1V05EjT26V_UtKSH5y4"
    //   })
    
      const [map, setMap] = React.useState(/** @type google.maps.map */ (null))
      const [directionRoutePoints, setDirectionRoutePoints] = useState([]);
      const [LAT , setLAT] = useState("");
    const [LNG , setLNG] = useState("")
   
    const [currentLocation, setCurrentLocation] = useState({
      lat: 0,
      lng: 0
    });
    // const google = window.google
    // useEffect(() => {
    //   navigator.geolocation.getCurrentPosition((position)=>{
        
    //     setLAT(position.coords.latitude);
    //     setLNG(position.coords.longitude);
      
    //   })
    // }, [])
    useEffect(() => {
      navigator.geolocation.getCurrentPosition((position)=>{
        setCurrentLocation({
        lat : position.coords.latitude,
       lng : position.coords.longitude
      });
      })
    }, [])
      
    
  const [center, setCenter] = useState({lat : 28.5199 , lng: 77.4587239});
  

      useEffect(() => {
         if(source.length!=[]&&map)
         {
         
          map.panTo({
            lat: source.lat,
            lng: source.lng
         })
         setCenter({
          lat: source.lat,
          lng: source.lng
        })
         
        // map.setCenter(new window.google.maps.LatLng(LAT, LNG))
      }
      
      if(source.length!=[]&&destination.length!=[]){
        directionRoute();
      }
      
      
    }, [source])
    // const [center2, setCenter2] = useState({lat : source.lat , lng: source.lng});
    // console.log("LAT",center , "LNG" , LNG)

      useEffect(() => {
         if(destination.length!=[]&&map){
          setCenter({
            lat: destination.lat,
            lng: destination.lng
          })
         }
      
        if(source.length!=[]&&destination.length!=[]){
          directionRoute();
         
        }
      }, [destination])
    
      const directionRoute=()=>{
          const DirectionsService = new window.google.maps.DirectionsService(); 

          DirectionsService.route({
            origin:{lat:source.lat , lng: source.lng},
            destination: {lat:destination.lat , lng:destination.lng},
            travelMode: window.google.maps.TravelMode.DRIVING
          },(result, status)=>{ 
            if(status=== window.google.maps.DirectionsStatus.OK){
              setDirectionRoutePoints(result)
            }
            else{
            }
          })      
      }

      const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
    
        setMap(map)
      }, [])
    
      const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
      }, [])
    
      return  (
      
          <GoogleMap
         
            mapContainerStyle={containerStyle}
            center={currentLocation}
            zoom={18}
            onLoad={map=>setMap(map)}
            onUnmount={onUnmount}
            
            // options={{mapId:'8b2bbfe9091cd883'}}
          >
            {(currentLocation)?
            <MarkerF
            lat={currentLocation.lat}
            lng={currentLocation.lng}
            icon={locator}
          />:"my marker"}
            {source.length!=[] ? 
             <MarkerF position={{lat:source.lat, lng:source.lng}}
           icon={{url:"/taxi.png",
           scaledSize:{width:40,
           height:40}}}>

            <OverlayViewF
            position={{lat:source.lat, lng:source.lng}}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
              <div className='p-2 bg-white font-bold inline-block' >
              <p  className='text-black text-[22px]' >{source.label}</p>
                {/* <img  src= {locator}/> */}
              </div>
            </OverlayViewF>
            <OverlayViewF
            position={{lat:destination.lat, lng:destination.lng}}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
              <div className='p-2 bg-white font-bold inline-block'>
              <p className='text-black text-[22px]' >{destination.label}</p>
              </div>
            </OverlayViewF>
           </MarkerF>
           :null} 

            {destination.length!=[]? <MarkerF position={{lat:destination.lat, lng:destination.lng}}
           icon={{url:"/logo192.png",
           scaledSize:{width:40,
           height:40}}} />:null}

           <MarkerF/>
           <MarkerF
           position={{lat:source.lat, lng:source.lng}}
           icon={{url:"/city-car.png",
           scaledSize:{width:40,
           height:40}}}
           ></MarkerF>

           <DirectionsRenderer
           directions={directionRoutePoints}
           
           options={{
            polylineOptions:{
             strokeColor:'#000',
              strokeWeight:5
            },
            suppressMakers:true
           }}
           />
          </GoogleMap>
      ) 
    }

export default GoogleMapSection