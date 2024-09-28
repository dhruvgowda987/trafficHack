import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Circle, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

const radiusInMeters = 8046.72;

// Fixed fallback location
const fallbackPosition = {
  lat: 33.7713056340146,
  lng: -84.39006321316229,
};

const App = () => {
  const [position, setPosition] = useState(fallbackPosition);
  const [error, setError] = useState(null);
  console.log("Current position 1:", position);


  return (
    <div>
      <LoadScript googleMapsApiKey="AIzaSyABdQf3ttPoUcYqIFNhRzgL3V-zOBNbUx0">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={position}
          zoom={15}
        >
          <Marker position= {position} />
          <Circle
            center={position}
            radius={radiusInMeters}
          />
        </GoogleMap>
      </LoadScript>
      {error && <p>{error}</p>}
    </div>
  );
};

export default App;
