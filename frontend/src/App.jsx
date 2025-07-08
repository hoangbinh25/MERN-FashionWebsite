import { Routes, Route } from 'react-router-dom';
import routes from './routes';
import { DefaultLayout } from './components/Layouts';
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
