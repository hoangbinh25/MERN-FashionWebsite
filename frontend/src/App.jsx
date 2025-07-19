import { Routes, Route } from 'react-router-dom';
import React from 'react';
import { DefaultLayout, AdminDefaultLayout } from './components/Layouts';
import routes from './routes';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';

const App = () => {
    return (
        <div className="App">
            <ToastContainer position="top-right" autoClose={3000} />
            <Routes>
                {routes.map((route, index) => {
                    const Page = route.component;
                    // Nếu là route admin thì dùng AdminDefaultLayout
                    if (route.path.startsWith('/admin')) {
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <AdminDefaultLayout>
                                        <Page content={route.content} />
                                    </AdminDefaultLayout>
                                }
                            />
                        );
                    }

                    // Các route còn lại dùng DefaultLayout như cũ
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <DefaultLayout
                                    bannerHeight={route.bannerHeight}
                                    showBanner={route.showBanner}
                                >
                                    <Page content={route.content} />
                                </DefaultLayout>
                            }
                        />
                    );
                })}
            </Routes>
        </div>
    );
};

export default App;
