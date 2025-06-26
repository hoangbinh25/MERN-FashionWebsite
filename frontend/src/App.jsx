import React from 'react';
import HomePage from './pages/home';
import { Header, Content, Footer } from './components/Layouts';

const App = () => {
    return (
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-9[vw]">
            <HomePage />
            <Header />
            <Content />
            <Footer />
        </div>
    );
};

export default App;
