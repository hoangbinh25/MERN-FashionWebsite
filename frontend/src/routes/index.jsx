import HomePage from '~/pages/Customers/HomePage';
import Shop from '~/pages/Customers/Shop';
import Blog from '~/pages/Customers/Blog';
import About from '~/pages/Customers/About';
import Contact from '~/pages/Customers/Contact';
import Login from '~/pages/Customers/Login';
import Register from '~/pages/Customers/Register';

const routes = [
    // customers
    { path: '/', component: HomePage, content: 'Home', showBanner: true, bannerHeight: 'h-[1000px]' },
    { path: '/shop', component: Shop, content: 'Shop', showBanner: false },
    { path: '/blog', component: Blog, content: 'Blog', showBanner: true, bannerHeight: 'h-[400px]' },
    { path: '/about', component: About, content: 'About', showBanner: true, bannerHeight: 'h-[400px]' },
    { path: '/contact', component: Contact, content: 'Contact', showBanner: true, bannerHeight: 'h-[400px]' },

    // auth
    { path: '/login', component: Login },
    { path: '/register', component: Register },


    // admin

]

export default routes;