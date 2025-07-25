import { Routes, Route } from 'react-router-dom';
import React from 'react';
import { DefaultLayout, AdminDefaultLayout } from './components/Layouts';
import routes from './routes';
import { ToastContainer } from 'react-toastify';
import { CartProvider } from './context/CartContext';
import ScrollToTop from '~/components/Button/ScrollToTop';

const App = () => {
    return (
        <div className="App">
            <ScrollToTop />
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
                                <CartProvider>
                                    <DefaultLayout
                                        bannerHeight={route.bannerHeight}
                                        showBanner={route.showBanner}
                                    >
                                        <Page content={route.content} />
                                    </DefaultLayout>
                                </CartProvider>
                            }
                        />
                    );
                })}
            </Routes>
        </div>
    );
};

export default App;
