import HomePage from '~/pages/HomePage';
import Shop from '~/pages/Shop';
import Features from '~/pages/Features';
import Blog from '~/pages/Blog';
import About from '~/pages/About';
import Contact from '~/pages/Contact';

const publicRoutes = [
    { path: '/', component: HomePage },
    { path: '/shop', component: Shop },
    { path: '/features', component: Features },
    { path: '/blog', component: Blog },
    { path: '/about', component: About },
    { path: '/contact', component: Contact },

]

export { publicRoutes };