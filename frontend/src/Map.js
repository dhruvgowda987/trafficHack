import React, { useCallback, useState } from 'react';
import { APIProvider, Map, AdvancedMarker, useMap, InfoWindow } from '@vis.gl/react-google-maps';
import { Link, useNavigate } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";




const containerStyle = {
  width: '100vw', // Full viewport width
  height: '100vh', // Full viewport height
};



const text = {
  padding: '5px',
  fontSize: '20px',
  borderBottom: '1px gray solid'
};
const position = { lat: 33.7713056340146, lng: -84.39006321316229 };
const initialPositions = [
  {
    id: 'CAM123',
    position: { lat: 33.7713056340146, lng: -84.39006321316229 },
    info: "This is the first marker's info window."
  },
  {
    id: 'CAM124',
    position: { lat: 33.7723056340146, lng: -84.39106321316229 }, // Slightly different position
    info: "This is the second marker's info window."
  }
];

// Component that handles the map logic and marker with InfoWindow
const MapWithMarker = () => {
  const map = useMap(); // Access map object
  const [infoWindowOpenId, setInfoWindowOpenId] = useState(null); // State to handle InfoWindow visibility

  const handleMarkerClick = useCallback((id, position) => {
    if (!map) return;
    console.log('Marker clicked:');
    setInfoWindowOpenId(id); // Show InfoWindow
    map.panTo(position); // Pan to marker position
  }, [map]);

  return (
    <>
      {initialPositions.map(marker => (
        <React.Fragment key={marker.id}>
          <AdvancedMarker
            position={marker.position}
            clickable={true}
            onClick={() => handleMarkerClick(marker.id, marker.position)}
          />
          {infoWindowOpenId === marker.id && (
            <InfoWindow
              position={marker.position}
              onCloseClick={() => setInfoWindowOpenId(null)} // Close InfoWindow
            >
              <div>
                <h3>Camera Location {marker.id}</h3>
                {infoWindowOpenId === marker.id && <VideoPlayer />}
                <p style={text}>Traffic Congestion: None</p>
                <p style={text}>Traffic Meter: None</p>
                <p style={text}>Weather: None</p>
                <p style={text}>Average Speed: None</p>

                <Link to={`/table/${marker.id}`}>More details</Link>

              </div>
            </InfoWindow>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

const MapPage = () => {
  return (
      <div style={containerStyle}>
      <APIProvider
        apiKey='AIzaSyBWLEgti7qsaIbWi-0sHdb-nxkwgC-AgkU'
        onLoad={() => console.log('Maps API has loaded.')}
      >
        <Map
          defaultZoom={13}
          defaultCenter={position}
          mapContainerStyle={containerStyle}
          mapId='123123123'
        >
          <MapWithMarker />
        </Map>
      </APIProvider>

    </div>
  );
}

export default MapPage;
