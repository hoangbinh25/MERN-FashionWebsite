import HomePage from '~/pages/Customers/HomePage';
import Login from '~/pages/Customers/LoginPage';
import Register from '~/pages/Customers/RegisterPage';
import ShopPage from '~/pages/Customers/ShopPage';
import BlogPage from '~/pages/Customers/BlogPage';
import AboutPage from '~/pages/Customers/AboutPage';
import ContactPage from '~/pages/Customers/ContactPage';
import ProfilePage from '~/pages/Customers/ProfilePage';

import NotFoundPage from '~/pages/NotFoundPage';

import Index from '~/pages/Admin/Index';
import Product from '~/pages/Admin/Product';
import Category from '~/pages/Admin/Category';
import Order from '~/pages/Admin/Order';
import User from '~/pages/Admin/User';
import Store from '~/pages/Admin/Store';


const routes = [
    // customers
    { path: '/user/home', component: HomePage, content: 'Home', showBanner: true, bannerHeight: 'h-[1000px]' },
    { path: '/user/shop', component: ShopPage, content: 'Shop', showBanner: false },
    { path: '/user/blog', component: BlogPage, content: 'Blog', showBanner: true, bannerHeight: 'h-[400px]' },
    { path: '/user/about', component: AboutPage, content: 'About', showBanner: true, bannerHeight: 'h-[400px]' },
    { path: '/user/contact', component: ContactPage, content: 'Contact', showBanner: true, bannerHeight: 'h-[400px]' },
    { path: '/user/profile', component: ProfilePage, content: 'Profile', showBanner: false },

    // auth
    { path: '/login', component: Login },
    { path: '/register', component: Register },

    //admin
    { path: '/admin', component: Index, content: 'Admin' },
    { path: '/admin/product', component: Product, content: 'Products Management' },
    { path: '/admin/category', component: Category, content: 'Categories Management' },
    { path: '/admin/order', component: Order, content: 'Orders Management' },
    { path: '/admin/user', component: User, content: 'Users Management' },
    { path: '/admin/store', component: Store, content: 'Stores Management' },

    // Not found
    { path: '*', component: NotFoundPage }
]

export default routes;
