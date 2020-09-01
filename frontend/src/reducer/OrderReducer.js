import { 
    ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST,
    ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, 
    ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL,
    MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, MY_ORDERS_FAIL, 
    ALL_ORDERS_REQUEST, ALL_ORDERS_SUCCESS, ALL_ORDERS_FAIL, ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL
} from "../constants/orderConstants";

function orderCreateReducer(state = {}, action) {
    switch(action.type) {
        case ORDER_CREATE_REQUEST:
            return {loading: true};
        case ORDER_CREATE_SUCCESS:
            return {loading: false, order: action.payload, success: true};
        case ORDER_CREATE_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state
    }
}

function orderDetailsReducer(state = {
    order: {
        orderItems: [],
        shipping: {},
        payment: {},
    }
}, action) {
    switch(action.type) {
        case ORDER_DETAILS_REQUEST:
            return {loading: true};
        case ORDER_DETAILS_SUCCESS:
            return {loading: false, order: action.payload};
        case ORDER_DETAILS_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state
    }
}

function myOrdersReducer(state = {
    orders: []
}, action) {
    switch(action.type) {
        case MY_ORDERS_REQUEST:
            return {loading: true};
        case MY_ORDERS_SUCCESS:
            return {loading: false, orders: action.payload};
        case MY_ORDERS_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state
    }
}

function allOrdersReducer(state = {
    orders: []
}, action) {
    switch(action.type) {
        case ALL_ORDERS_REQUEST:
            return {loading: true};
        case ALL_ORDERS_SUCCESS:
            return {loading: false, orders: action.payload};
        case ALL_ORDERS_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state
    }
}

function orderPayReducer(state = {
    order: {
        orderItems: [],
        shipping: {},
        payment: {},
    }
}, action) {
    switch(action.type) {
        case ORDER_PAY_REQUEST:
            return {loading: true};
        case ORDER_PAY_SUCCESS:
            return {loading: false, success: true };
        case ORDER_PAY_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state
    }
}
function orderDeleteReducer(state = {
    order: {
        orderItems: [],
        shipping: {},
        payment: {},
    }
}, action) {
    switch(action.type) {
        case ORDER_DELETE_REQUEST:
            return {loading: true};
        case ORDER_DELETE_SUCCESS:
            return {loading: false, success: true };
        case ORDER_DELETE_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state
    }
}

export {orderCreateReducer, orderDetailsReducer, orderPayReducer, myOrdersReducer, allOrdersReducer, orderDeleteReducer};