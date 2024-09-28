import React from 'react';
import { Link } from 'react-router-dom';
import { GoogleMap, LoadScript, Circle, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

const detailBox = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  width: '20vw',
  height: '20vw',
  backgroundColor: 'white',
  padding: "15px",
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '5px',
}

const text = {
  padding: '5px',
  fontSize: '20px',
  borderBottom: '1px gray solid'
}

const radiusInMeters = 8046.72;

// Fixed fallback location
const fallbackPosition = {
  lat: 33.7713056340146,
  lng: -84.39006321316229,
};

const HomePage = () => {
  const position= fallbackPosition;
  const error = null;
  console.log("Current position 1:", position);


  return (
    <div style={{position: 'relative'}}>
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
      {null}

      <div style={detailBox}>
        <p style={text}>Traffic Congestion: None</p>
        <p style={text}>Traffic Meter: None</p>
        <p style={text}>Weather: None</p>
        <p style={text}>Average Speed: None</p>

        <div style={{display: 'flex', justifyContent: 'center', paddingTop: '15px'}}>
          <Link to={'/table'}> More details </Link>
        </div>

      </div>
    </div>


  );
};

export default HomePage;
