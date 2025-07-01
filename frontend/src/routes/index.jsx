import HomePage from '~/pages/customers/HomePage.jsx';
import Login from '~/pages/customers/LoginPage.jsx';
import Register from '~/pages/customers/RegisterPage.jsx';
import ShopPage from '~/pages/customers/ShopPage.jsx';
import BlogPage from '~/pages/customers/BlogPage.jsx';
import AboutPage from '~/pages/customers/AboutPage.jsx';
import ContactPage from '~/pages/customers/ContactPage.jsx';

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
