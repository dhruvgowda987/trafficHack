import React from 'react';
import { Link } from 'react-router-dom';
import { createRoot } from "react-dom/client";
import { APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

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
};

const text = {
  padding: '5px',
  fontSize: '20px',
  borderBottom: '1px gray solid'
};

const radiusInMeters = 8046.72;

// Fixed fallback location
const fallbackPosition = {
  lat: 33.7713056340146,
  lng: -84.39006321316229,
};

const HomePage = () => {
  const position = fallbackPosition;
  const error = null;

  console.log("Current position 1:", position);

  return (
    <APIProvider
      apiKey={apiKey}
      onLoad={() => console.log('Maps API has loaded.')}
    >
      <div style={{ position: 'relative' }}>
        <Map
          defaultZoom={15}
          defaultCenter={position}

        >
        </Map>

        {null}

        <div style={detailBox}>
          <p style={text}>Traffic Congestion: None</p>
          <p style={text}>Traffic Meter: None</p>
          <p style={text}>Weather: None</p>
          <p style={text}>Average Speed: None</p>

          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '15px' }}>
            <Link to={'/table'}>More details</Link>
          </div>
        </div>
      </div>
    </APIProvider>
  );
};


export default HomePage;
