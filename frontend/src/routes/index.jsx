import { lazy } from 'react';

// User
const HomePage = lazy(() => import('~/pages/Customers/HomePage'));
const LoginPage = lazy(() => import('~/pages/Customers/LoginPage'));
const RegisterPage = lazy(() => import('~/pages/Customers/RegisterPage'));
const ShopPage = lazy(() => import('~/pages/Customers/ShopPage'));
const BlogPage = lazy(() => import('~/pages/Customers/BlogPage'));
const AboutPage = lazy(() => import('~/pages/Customers/AboutPage'));
const ContactPage = lazy(() => import('~/pages/Customers/ContactPage'));
const ProfilePage = lazy(() => import('~/pages/Customers/ProfilePage'));
const OTPVerificationPage = lazy(() => import('~/pages/Customers/OTPVerificationPage'));
const ForgotPasswordPage = lazy(() => import('~/components/Layouts/customers/Auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('~/pages/Customers/ResetPasswordPage'));
const NotFoundPage = lazy(() => import('~/pages/NotFoundPage'));

// Admin
const Index = lazy(() => import('~/pages/Admin/Index'));
const Product = lazy(() => import('~/pages/Admin/Product'));
const Category = lazy(() => import('~/pages/Admin/Category'));
const Order = lazy(() => import('~/pages/Admin/Order'));
const User = lazy(() => import('~/pages/Admin/User'));
const Store = lazy(() => import('~/pages/Admin/Store'));
const CartPage = lazy(() => import('~/pages/Customers/CartPage'));
const OrderHistoryPage = lazy(() => import('~/pages/Customers/OrderHistoryPage'));
const Blog = lazy(() => import('~/pages/Admin/Blog'));
const BlogDetail = lazy(() => import('~/components/Layouts/customers/Blog/BlogDetail'));
const PaySuccessful = lazy(() => import('~/pages/PaySuccessful'));
const OAuthCallbackHandler = lazy(() => import('~/components/Layouts/customers/Auth/OAuthCallbackHandler'));


const routes = [
    // customers
    { path: '/', component: HomePage, content: 'Home', showBanner: true, bannerHeight: 'h-[1000px]' },
    { path: '/user/home', component: HomePage, content: 'Home', showBanner: true, bannerHeight: 'h-[1000px]' },
    { path: '/user/shop', component: ShopPage, content: 'Shop', showBanner: false },
    { path: '/user/blog', component: BlogPage, content: 'Blog', showBanner: true, bannerHeight: 'h-[240px]' },
    { path: '/user/blog/:id', component: BlogDetail, content: 'BlogDetail', showBanner: true, bannerHeight: 'h-[240px]' },
    { path: '/user/about', component: AboutPage, content: 'About', showBanner: true, bannerHeight: 'h-[240px]' },
    { path: '/user/contact', component: ContactPage, content: 'Contact', showBanner: true, bannerHeight: 'h-[240px]' },
    { path: '/user/profile', component: ProfilePage, content: 'Profile', showBanner: false, access: 'user' },
    { path: '/user/cart', component: CartPage, content: 'Cart', access: 'user' },
    { path: '/user/order', component: OrderHistoryPage, content: 'Order History', access: 'user' },

    // auth
    { path: '/auth/login', component: LoginPage },
    { path: '/auth/register', component: RegisterPage },
    { path: '/auth/verify-otp', component: OTPVerificationPage },
    { path: '/auth/forgot-password', component: ForgotPasswordPage },
    { path: '/auth/reset-password', component: ResetPasswordPage },
    { path: '/auth/oauth-callback', component: OAuthCallbackHandler },

    //admin
    { path: '/admin', component: Index, content: 'Admin', access: 'admin' },
    { path: '/admin/product', component: Product, content: 'Products Management', access: 'admin' },
    { path: '/admin/category', component: Category, content: 'Categories Management', access: 'admin' },
    { path: '/admin/order', component: Order, content: 'Orders Management', access: 'admin' },
    { path: '/admin/user', component: User, content: 'Users Management', access: 'admin' },
    { path: '/admin/store', component: Store, content: 'Stores Management', access: 'admin' },
    { path: '/admin/blog', component: Blog, content: 'Blogs Management', access: 'admin' },
    

    // successful payment
    { path: '/successful', component: PaySuccessful },
    // Not found
    { path: '*', component: NotFoundPage }
]

export default routes;
