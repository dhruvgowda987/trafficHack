import React from "react";
import HomePage from "./HomePage";
import SimpleTable from "./SimpleTable";
import MapPage from "./Map"
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/table" element={<SimpleTable />} />
                <Route path="/map" element={<MapPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
