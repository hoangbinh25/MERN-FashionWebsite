import { Routes, Route } from 'react-router-dom';
import React from 'react';
import { DefaultLayout, AdminDefaultLayout } from './components/Layouts';
import routes from './routes';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const App = () => {


    // useEffect(() => {
    //     fetchApi()
    // }, [])

    const fetchApi = async () => {
        const res = await axios.get(`${import.meta.env.VITE_API_URL_BACKEND}/product/getProducts`)
        return res.data
    }
    const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })
    console.log('query: ', query)

    return (
        <div className="App">
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
