import AboutPage from "../pages/About/About";
import CartPage from "../pages/CartPage/Cart";
import ContactPage from "../pages/Contact/Contact";
import HomePage from "../pages/HomePage/Homepage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductDetailPage from "../pages/ProductPage/ProductDetailPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import SignInPage from "../pages/SignIn/SignInPage";
import SignUpPage from "../pages/SignIn/SignUpPage";
import UserDetailPage from "../pages/UserPage/UserDetailPage";



export const routes =[
    {
        path: '/',
        page: HomePage,
        isShowHeader: true,
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true,
    },
    {
        path: '/product',
        page: ProductPage,
        isShowHeader: true,
    },
    {
        path: '/about',
        page: AboutPage,
        isShowHeader: true,
    },
    {
        path: '/contact',
        page: ContactPage,
        isShowHeader: true,
    },
    {
        path: '/cart',
        page: CartPage,
        isShowHeader: true,
    },
    {
        path: '*',
        page: NotFoundPage,
        isShowHeader: true,
    
    },
    {
        path: '/sign-in',
        page: SignInPage,
    
    },
    {
        path: '/sign-up',
        page: SignUpPage
    },
    {
        path: '/product/detail',
        page: ProductDetailPage,
        isShowHeader: true,
    
    },
    {
        path: '/product/getAllProduct',
        page: ProductDetailPage,
        isShowHeader: true,
    
    },
    {
        path: '/userDetail',
        page: UserDetailPage,
        isShowHeader: true,
    
    },
]