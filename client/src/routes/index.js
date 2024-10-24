import AboutPage from "../pages/About/About";
import ContactPage from "../pages/Contact/Contact";
import HomePage from "../pages/HomePage/Homepage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductDetailPage from "../pages/ProductPage/ProductDetailPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import SignInPage from "../pages/SignIn/SignInPage";
import SignUpPage from "../pages/SignIn/SignUpPage";
import UserDetailPage from "../pages/UserPage/UserDetailPage";
import AdminPage from "../pages/AdminPage/AdminPage";
import CheckoutPage from "../pages/CheckOutPage/CheckOutPage";



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
        page: OrderPage,
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
        path: '/product/detailProduct/:id',
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
    {
        path: '/admin',
        page: AdminPage,
        isShowHeader: false,
        isPrivate: true
    
    },
    {
        path: '/checkOut',
        page: CheckoutPage,
        isShowHeader: true,
    
    },
]