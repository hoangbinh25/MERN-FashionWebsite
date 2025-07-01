import HomePage from '~/pages/HomePage';
import Shop from '~/pages/Shop';
import Features from '~/pages/Features';
import Blog from '~/pages/Blog';
import About from '~/pages/About';
import Contact from '~/pages/Contact';

const routes = [
    { path: '/', element: <HomePage />, label: 'Home' },
    { path: '/shop', element: <Shop />, label: 'Shop' },
    { path: '/features', element: <Features />, label: 'Features' },
    { path: '/blog', element: <Blog />, label: 'Blog' },
    { path: '/about', element: <About />, label: 'About' },
    { path: '/contact', element: <Contact />, label: 'Contact' },
]

export default routes;