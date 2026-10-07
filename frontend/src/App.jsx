import { Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import { DefaultLayout, AdminDefaultLayout } from './components/Layouts';
import routes from './routes';
import { ToastContainer } from 'react-toastify';
import { CartProvider } from './context/CartContext';
import ScrollToTop from '~/components/Button/ScrollToTop';
import { RequireAdmin, RequireAuth } from '~/components/Auth/RouteGuards';

const App = () => {
    return (
        <div className="App">
            <ScrollToTop />
            <ToastContainer position="top-right" autoClose={3000} />
            <CartProvider>
            <Suspense fallback={<div className="grid min-h-screen place-items-center text-gray-600">Đang tải trang...</div>}>
            <Routes>
                {routes.map((route, index) => {
                    const Page = route.component;
                    const page = <Page content={route.content} />;
                    const protectedPage = route.access === 'admin'
                        ? <RequireAdmin>{page}</RequireAdmin>
                        : route.access === 'user'
                            ? <RequireAuth>{page}</RequireAuth>
                            : page;
                    // Nếu là route admin thì dùng AdminDefaultLayout
                    if (route.path.startsWith('/admin')) {
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <AdminDefaultLayout>
                                        {protectedPage}
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
                                    {protectedPage}
                                </DefaultLayout>
                            }
                        />
                    );
                })}
            </Routes>
            </Suspense>
            </CartProvider>
        </div>
    );
};

export default App;
