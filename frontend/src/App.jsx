import React from 'react';
import { Router } from 'react-router-dom';
import HomePage from '~/pages/HomePage';
import { Routes, Route } from 'react-router-dom';

const App = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/home" element={<HomePage />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
