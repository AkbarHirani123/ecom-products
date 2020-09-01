import Axios from "axios";
import Cookie from 'js-cookie';
import { 
    ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST,
    ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, 
    ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL,
    MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, MY_ORDERS_FAIL, 
    ALL_ORDERS_REQUEST, ALL_ORDERS_SUCCESS, ALL_ORDERS_FAIL, ORDER_DELETE_FAIL, ORDER_DELETE_SUCCESS, ORDER_DELETE_REQUEST
} from "../constants/orderConstants";

const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_CREATE_REQUEST, payload: order});

        const {userSignin:{userInfo}} = getState();

        const {data : {data: newOrder}} = await Axios.post("/api/orders", order, {
            headers: {
            "Authorization" : "Bearer" + userInfo.token 
            }
        });
        
        dispatch({type: ORDER_CREATE_SUCCESS, payload: newOrder});
        
    } catch (error) {
        
        dispatch({type: ORDER_CREATE_FAIL, payload: error.message});
    }
}

const detailsOrder = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_DETAILS_REQUEST, payload: orderId});
    
        const {userSignin:{userInfo}} = getState();
    
        const {data} = await Axios.get("/api/orders/" + orderId, {
            headers: {
                "Authorization" : "Bearer" + userInfo.token            
            }
        })
        dispatch({type: ORDER_DETAILS_SUCCESS, payload: data});
        
    } catch (error) {
        
        dispatch({type: ORDER_DETAILS_FAIL, payload: error.message});
    }
}

const myOrdersAction = () => async (dispatch, getState) => {
    try {
        dispatch({type: MY_ORDERS_REQUEST});
    
        const {userSignin:{userInfo}} = getState();
    
        const {data} = await Axios.get("/api/orders/myorders", {
            headers: {
                "Authorization" : "Bearer" + userInfo.token            
            }
        })
        dispatch({type: MY_ORDERS_SUCCESS, payload: data});
        
    } catch (error) {
        
        dispatch({type: MY_ORDERS_FAIL, payload: error.message});
    }
}

const allOrdersAction = () => async (dispatch, getState) => {
    try {
        dispatch({type: ALL_ORDERS_REQUEST});
    
        const {userSignin:{userInfo}} = getState();
    
        const {data} = await Axios.get("/api/orders", {
            headers: {
                "Authorization" : "Bearer" + userInfo.token            
            }
        })
        dispatch({type: ALL_ORDERS_SUCCESS, payload: data});
        
    } catch (error) {
        
        dispatch({type: ALL_ORDERS_FAIL, payload: error.message});
    }
}

const payOrderAction = (order, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_PAY_REQUEST, payload: paymentResult});
    
        const {userSignin:{userInfo}} = getState();
    
        const {data} = await Axios.put("/api/orders/" + order._id + "/pay", paymentResult, {
            headers: {
                "Authorization" : "Bearer" + userInfo.token            
            }
        });
        dispatch({type: ORDER_PAY_SUCCESS, payload: data});
        
    } catch (error) {
        
        dispatch({type: ORDER_PAY_FAIL, payload: error.message});
    }
}

const deleteOrderAction = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_DELETE_REQUEST});
    
        const {userSignin:{userInfo}} = getState();
    
        const {data} = await Axios.delete("/api/orders/" + orderId, {
            headers: {
                "Authorization" : "Bearer" + userInfo.token            
            }
        });
        dispatch({type: ORDER_DELETE_SUCCESS, payload: data});
        
    } catch (error) {
        
        dispatch({type: ORDER_DELETE_FAIL, payload: error.message});
    }
}

export {createOrder, detailsOrder, payOrderAction, myOrdersAction, allOrdersAction, deleteOrderAction};