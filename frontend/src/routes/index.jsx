import HomePage from '~/pages/Customers/HomePage.jsx';
import Login from '~/pages/Customers/LoginPage.jsx';
import Register from '~/pages/Customers/RegisterPage.jsx';
import ShopPage from '~/pages/Customers/ShopPage.jsx';
import BlogPage from '~/pages/Customers/BlogPage.jsx';
import AboutPage from '~/pages/Customers/AboutPage.jsx';
import ContactPage from '~/pages/Customers/ContactPage.jsx';
import NotFoundPage from '~/pages/NotFoundPage';

const routes = [
    // customers
    { path: '/', component: HomePage, content: 'Home', showBanner: true, bannerHeight: 'h-[1000px]' },
    { path: '/shop', component: ShopPage, content: 'Shop', showBanner: false },
    { path: '/blog', component: BlogPage, content: 'Blog', showBanner: true, bannerHeight: 'h-[400px]' },
    { path: '/about', component: AboutPage, content: 'About', showBanner: true, bannerHeight: 'h-[400px]' },
    { path: '/contact', component: ContactPage, content: 'Contact', showBanner: true, bannerHeight: 'h-[400px]' },

    // auth
    { path: '/login', component: Login },
    { path: '/register', component: Register },

    // Not fount 
    { path: '*', component: NotFoundPage }
]

export default routes;
