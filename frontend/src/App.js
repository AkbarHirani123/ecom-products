import React from 'react';
import Header from './components/nav/Header';
import Footer from './components/nav/Footer';
import Home from './components/pages/Home';
import ProductDetailPage from './components/pages/ProductDetailPage';
import CartPage from './components/pages/CartPage';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import SigninPage from './components/pages/SigninPage';
import RegisterPage from './components/pages/RegisterPage';
import ProductsAdminPage from './components/pages/ProductsAdminPage';
import { useSelector } from 'react-redux';
import ShippingPage from './components/pages/ShippingPage';
import PaymentPage from './components/pages/PaymentPage';
import ReviewPage from './components/pages/ReviewPage';
import OrderDetailsPage from './components/pages/OrderDetailsPage';
import LogoutPage from './components/pages/LogoutPage';
import ProfilePage from './components/pages/ProfilePage';
import OrdersAdminPage from './components/pages/OrdersAdminPage';

function App() {

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;

    const cartDetails = useSelector(state => state.cartDetails);
    const {cartItems} = cartDetails;

    return (
    <BrowserRouter>
        <div className="App">
            <div className="grid-container">
                <Header cartItems={cartItems} userInfo={userInfo} />
                <main className="main">
                    <section className="section is-medium">
                        <Route path="/orders" component={OrdersAdminPage} />
                        <Route path="/logout" component={LogoutPage} />
                        <Route path="/profile" component={ProfilePage} />
                        <Route path="/order/:id" component={OrderDetailsPage} />
                        <Route path="/products" component={ProductsAdminPage} />
                        <Route path="/shipping" component={ShippingPage} />
                        <Route path="/payment" component={PaymentPage} />
                        <Route path="/review" component={ReviewPage} />
                        <Route path="/signin" component={SigninPage} />
                        <Route path="/register" component={RegisterPage} />
                        <Route path="/product/:id" component={ProductDetailPage} />
                        <Route path="/cart/:id?" component={CartPage} />
                        <Route path="/category/:id" component={Home} />
                        <Route path="/" exact={true} component={Home} />
                    </section>
                </main>
                <Footer />
            </div>
        </div>
    </BrowserRouter>
    );
}

export default App;
