import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer } from './reducer/ProductReducers';
import { userSigninReducer, userRegisterReducer, userUpdateReducer } from './reducer/UserReducers';
import { cartReducer } from './reducer/CartReducers';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie'
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, myOrdersReducer, allOrdersReducer, orderDeleteReducer } from './reducer/OrderReducer';

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = {cartDetails: { cartItems, shipping:{}, payment:{} }, userSignin: { userInfo }}; //default state

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cartDetails: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    userUpdate: userUpdateReducer,
    myOrderList: myOrdersReducer,
    allOrdersList: allOrdersReducer,
    deleteOrder: orderDeleteReducer
}) 
// it's set to a name-value paramert
// which is a function which gets a state and an action and return a new state based on the action

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;