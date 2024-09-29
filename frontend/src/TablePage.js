import React, {useEffect, useState} from 'react';
import SimpleTable from './SimpleTable'; // Adjust the path as needed
import {useSearchParams} from "react-router-dom";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TablePage = () => {
    const { markerId } = useParams();
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [avgcarH, setavgcarH] = useState({})
    const [carsY, setcarsY] = useState({})
    const [carsM, setcarsM] = useState({})

    useEffect(() => {
        const fetchavgcarH = async () => {
            try {
                setLoading(true); // Set loading state
                const response = await axios.get(`http://127.0.0.1:5000/average-cars-hourly?camera_id=${markerId}`);
                console.log(response.data);
                setavgcarH(response.data);
            } catch (err) {
                setError(err); // Set error if the API call fails
            } finally {
                setLoading(false); // Set loading to false
            }
        };

        const fetchcarsY = async () => {
            try {
                setLoading(true); // Set loading state
                const response = await axios.get(`http://127.0.0.1:5000/cars-yearly?camera_id=${markerId}`);
                console.log(response.data);
                setcarsY(response.data);
            } catch (err) {
                setError(err); // Set error if the API call fails
            } finally {
                setLoading(false); // Set loading to false
            }
        };

        const fetchcarsM = async () => {
            try {
                setLoading(true); // Set loading state
                const response = await axios.get(`http://127.0.0.1:5000/cars-monthly?camera_id=${markerId}`);
                console.log(response.data);
                setcarsM(response.data);
            } catch (err) {
                setError(err); // Set error if the API call fails
            } finally {
                setLoading(false); // Set loading to false
            }
        };

        fetchavgcarH();
        fetchcarsY();
        fetchcarsM();
    }, [markerId]); // Dependency array

    if (loading) {
        return <p>Loading...</p>; // Show loading indicator
    }

    if (error) {
        return <p>Error fetching marker data: {error.message}</p>; // Show error message
    }


  return (
    <div>
      <h1>Marker Details</h1>
      <p>Selected Marker ID: {markerId}</p>
      <SimpleTable />
    </div>
  );
};

export default TablePage;
