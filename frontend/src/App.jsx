import { Routes, Route } from 'react-router-dom';

import React from 'react';

import HomePage from '~/pages/HomePage';
import Shop from '~/pages/Shop';
import Features from '~/pages/Features';
import Blog from '~/pages/Blog';
import About from '~/pages/About';
import Contact from '~/pages/Contact';

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/features" element={<Features />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

            </Routes>
        </div>
    );
};

export default App;
