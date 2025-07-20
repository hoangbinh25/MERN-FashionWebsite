// User
import HomePage from '~/pages/Customers/HomePage';
import LoginPage from '~/pages/Customers/LoginPage';
import RegisterPage from '~/pages/Customers/RegisterPage';
import ShopPage from '~/pages/Customers/ShopPage';
import BlogPage from '~/pages/Customers/BlogPage';
import AboutPage from '~/pages/Customers/AboutPage';
import ContactPage from '~/pages/Customers/ContactPage';
import ProfilePage from '~/pages/Customers/ProfilePage';
import OTPVerificationPage from '~/pages/Customers/OTPVerificationPage';
import ForgotPasswordPage from '~/components/Layouts/customers/Auth/ForgotPasswordPage';
import ResetPasswordPage from '~/pages/Customers/ResetPasswordPage';
import NotFoundPage from '~/pages/NotFoundPage';

// Admin
import Index from '~/pages/Admin/Index';
import Product from '~/pages/Admin/Product';
import Category from '~/pages/Admin/Category';
import Order from '~/pages/Admin/Order';
import User from '~/pages/Admin/User';
import Store from '~/pages/Admin/Store';
import CartPage from '~/pages/Customers/CartPage';
import OrderHistoryPage from '~/pages/Customers/OrderHistoryPage';
import Blog from '~/pages/Admin/Blog';
import BlogDetail from '~/components/Layouts/customers/Blog/BlogDetail';
import PaySuccessful from '~/pages/PaySuccessful';


const routes = [
    // customers
    { path: '/', component: HomePage, content: 'Home', showBanner: true, bannerHeight: 'h-[1000px]' },
    { path: '/user/home', component: HomePage, content: 'Home', showBanner: true, bannerHeight: 'h-[1000px]' },
    { path: '/user/shop', component: ShopPage, content: 'Shop', showBanner: false },
    { path: '/user/blog', component: BlogPage, content: 'Blog', showBanner: true, bannerHeight: 'h-[240px]' },
    { path: '/user/blog/:id', component: BlogDetail, content: 'BlogDetail', showBanner: true, bannerHeight: 'h-[240px]' },
    { path: '/user/about', component: AboutPage, content: 'About', showBanner: true, bannerHeight: 'h-[240px]' },
    { path: '/user/contact', component: ContactPage, content: 'Contact', showBanner: true, bannerHeight: 'h-[240px]' },
    { path: '/user/profile', component: ProfilePage, content: 'Profile', showBanner: false },
    { path: '/user/cart', component: CartPage, content: 'Cart' },
    { path: '/user/order', component: OrderHistoryPage, content: 'Order History' },

    // auth
    { path: '/auth/login', component: LoginPage },
    { path: '/auth/register', component: RegisterPage },
    { path: '/auth/verify-otp', component: OTPVerificationPage },
    { path: '/auth/forgot-password', component: ForgotPasswordPage },
    { path: '/auth/reset-password', component: ResetPasswordPage },

    //admin
    { path: '/admin', component: Index, content: 'Admin' },
    { path: '/admin/product', component: Product, content: 'Products Management' },
    { path: '/admin/category', component: Category, content: 'Categories Management' },
    { path: '/admin/order', component: Order, content: 'Orders Management' },
    { path: '/admin/user', component: User, content: 'Users Management' },
    { path: '/admin/store', component: Store, content: 'Stores Management' },
    { path: '/admin/blog', component: Blog, content: 'Blogs Management' },


    // successful payment
    { path: '/successful', component: PaySuccessful },
    // Not found
    { path: '*', component: NotFoundPage }
]

export default routes;
