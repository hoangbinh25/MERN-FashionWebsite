import HomePage from '~/pages/customers/HomePage';
import Login from '~/pages/customers/LoginPage';
import Register from '~/pages/customers/RegisterPage';
import ShopPage from '~/pages/customers/ShopPage';
import BlogPage from '~/pages/customers/BlogPage';
import AboutPage from '~/pages/customers/AboutPage';
import ContactPage from '~/pages/customers/ContactPage';

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

]

export default routes;
