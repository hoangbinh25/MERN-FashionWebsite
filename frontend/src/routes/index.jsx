import HomePage from '~/pages/Customers/HomePage';
import Login from '~/pages/Customers/LoginPage';
import Register from '~/pages/Customers/RegisterPage';
import ShopPage from '~/pages/Customers/ShopPage';
import BlogPage from '~/pages/Customers/BlogPage';
import AboutPage from '~/pages/Customers/AboutPage';
import ContactPage from '~/pages/Customers/ContactPage';
import NotFoundPage from '~/pages/NotFoundPage';
import ProfilePage from '~/pages/Customers/ProfilePage';

const routes = [
    // customers
    { path: '/home', component: HomePage, content: 'Home', showBanner: true, bannerHeight: 'h-[1000px]' },
    { path: '/shop', component: ShopPage, content: 'Shop', showBanner: false },
    { path: '/blog', component: BlogPage, content: 'Blog', showBanner: true, bannerHeight: 'h-[400px]' },
    { path: '/about', component: AboutPage, content: 'About', showBanner: true, bannerHeight: 'h-[400px]' },
    { path: '/contact', component: ContactPage, content: 'Contact', showBanner: true, bannerHeight: 'h-[400px]' },
    { path: '/profile', component: ProfilePage, content: 'Profile', showBanner: false },

    // auth
    { path: '/login', component: Login },
    { path: '/register', component: Register },

    // Not fount 
    { path: '*', component: NotFoundPage }
]

export default routes;
