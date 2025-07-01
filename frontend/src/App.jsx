import { Routes, Route } from 'react-router-dom';

import React from 'react';
import routes from './routes';
import { DefaultLayout } from './components/Layouts';

const App = () => {
    return (
        <div className="App">
            <Routes>
                {routes.map((route, index) => {
                    const Page = route.component;

                    return (
                        <Route key={index} path={route.path} element={
                            <DefaultLayout
                                bannerHeight={route.bannerHeight}
                                showBanner={route.showBanner}>
                                <Page content={route.content} />
                            </DefaultLayout>
                        } />
                    )
                })}
            </Routes>
        </div>
    );
};

export default App;
