import React, { useContext, useEffect, useState } from "react";
import {
  DirectionsRenderer,
  GoogleMap,
  MarkerF,
  OverlayViewF,
} from "@react-google-maps/api";
import { SourceContext } from "../Context/SourceContext";
import { DestinationContext } from "../Context/DestinationContext";
import userStanding from "../Images/standing-up-man-.png";
import locationIcon from "../Images/standing-up-man-.png"; // Replace with your location icon path

function GoogleMapSection() {
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);

  const containerStyle = {
    width: "100%",
    height: "40rem",
  };

  const [map, setMap] = useState(null);
  const [directionRoutePoints, setDirectionRoutePoints] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  const directionRoute = () => {
    const DirectionsService = new window.google.maps.DirectionsService();

    DirectionsService.route(
      {
        origin: { lat: source.lat, lng: source.lng },
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirectionRoutePoints(result);
        }
      }
    );
  };

  useEffect(() => {
    if (source.lat && source.lng && destination.lat && destination.lng) {
      directionRoute();
    }
  }, [source, destination]);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={currentLocation}
      zoom={14}
      onLoad={(map) => setMap(map)}
      onUnmount={() => setMap(null)}
    >
      {/* Current Location Marker */}
      {currentLocation && (
        <MarkerF
          position={currentLocation}
          icon={{
            url: userStanding,
            scaledSize: new window.google.maps.Size(40, 40),
          }}
        />
      )}

      {/* Source Marker with Overlay */}
      {source.lat && source.lng && (
        <>
          <MarkerF
            position={{ lat: source.lat, lng: source.lng }}
            icon={{
              url: userStanding,
              scaledSize: new window.google.maps.Size(40, 40),
            }}
          />
          <OverlayViewF
            position={{ lat: source.lat, lng: source.lng }}
            mapPaneName="overlayLayer"
          >
            <div className="p-2 bg-white font-bold inline-block">
              <p className="text-black text-[16px]">{source.label}</p>
            </div>
          </OverlayViewF>
        </>
      )}

      {/* Destination Marker with Overlay */}
      {destination.lat && destination.lng && (
        <>
          <MarkerF
            position={{ lat: destination.lat, lng: destination.lng }}
            icon={{
              url: locationIcon,
              scaledSize: new window.google.maps.Size(40, 40),
            }}
          />
          <OverlayViewF
            position={{ lat: destination.lat, lng: destination.lng }}
            mapPaneName="overlayLayer"
          >
            <div className="p-2 bg-white font-bold inline-block">
              <p className="text-black text-[16px]">{destination.label}</p>
            </div>
          </OverlayViewF>
        </>
      )}

      {/* Directions Renderer */}
      {directionRoutePoints && (
        <DirectionsRenderer
          directions={directionRoutePoints}
          options={{
            polylineOptions: {
              strokeColor: "#000",
              strokeWeight: 5,
            },
            suppressMarkers: true, // Prevents default "A" and "B" markers
          }}
        />
      )}
    </GoogleMap>
  );
}

export default GoogleMapSection;
