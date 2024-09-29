import React from "react";
import HomePage from "./HomePage";
import AvgCarsChart from "./AvgCarsChart";
import MapPage from "./Map"
import TablePage from "./TablePage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/table/:markerId" element={<TablePage />} />
                <Route path="/map" element={<MapPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
