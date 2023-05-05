import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Pizza from './components/Pizza';
import OrderList from './components/OrderList';
import Navbar from './components/Navbar';

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Pizza />} />
                <Route path="/orders" element={<OrderList />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
