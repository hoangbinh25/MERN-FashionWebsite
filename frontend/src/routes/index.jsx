import HomePage from '~/pages/Customers/HomePage';
import Shop from '~/pages/Customers/Shop';
import Blog from '~/pages/Customers/Blog';
import About from '~/pages/Customers/About';
import Contact from '~/pages/Customers/Contact';

const routes = [
    // customers
    { path: '/', element: <HomePage />, label: 'Home' },
    { path: '/shop', element: <Shop />, label: 'Shop' },
    { path: '/blog', element: <Blog />, label: 'Blog' },
    { path: '/about', element: <About />, label: 'About' },
    { path: '/contact', element: <Contact />, label: 'Contact' },

    // auth


    // admin

]

export default routes;