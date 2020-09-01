import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './CartCheckoutCSS.css';
import { detailsOrder, payOrderAction } from '../../actions/orderActions';
import PaypalButton from './checkout/PaypalButton';

function OrderDetailsPage(props) {

    const orderPay = useSelector(state => state.orderPay);
    const {loading: loadingPay, error: errorPay, success: successPay } = orderPay;
    const dispatch = useDispatch();

    useEffect(() => {
        if(successPay) {
            props.history.push("/profile");
        } else {
            dispatch(detailsOrder(props.match.params.id));
        }
        return() => {
            //cleanup
        }
    }, [successPay]);

    const handleSuccessPayment = (paymentResult) => {
        dispatch(payOrderAction(order, paymentResult));
    }

    const orderDetails = useSelector(state => state.orderDetails);
    const {loading, error, order } = orderDetails;

    return <div className="container review">
        <section className="section review-order-details">
            {
                loading ? <div className="columns is-centered"><div className="loader" style={{height:'5em',width:'5em'}}></div></div> : 
                error ? <div>{"Error: " + error}</div> :
                (
                <div>
                    <h3 className="title">Order Details <span className="subtitle is-5 has-text-primary">(# {order._id})</span></h3>
                    <div className="columns is-multiline is-mobile order-details">
                        <div className="column is-three-quarter">
                            <div className="container">
                                <h3 className="title">Shipping</h3>
                                <div className="content">
                                    <p className="heading is-size-7 mb-3">Shipping Address</p>
                                    {order.shipping.address}, {order.shipping.city}<br />
                                    {order.shipping.zipCode}, {order.shipping.country}
                                </div>
                                <div>
                                    <p className="heading is-size-7 mb-3">Order Status:</p>
                                    {order.isDelivered ? "Delivered" : "Not delivered."}
                                    <br />
                                    {order.isDelivered ? "Delivery date: "+order.deliveredAt : "No Shipping info available."}
                                </div>
                            </div>
                            <div className="container">
                                <h3 className="title">Payment</h3>
                                <div className="content">
                                    <p className="heading is-size-7 mb-3">Shipping Method:</p>
                                    {order.payment.paymentMethod}
                                </div>
                                <div>
                                    <p className="heading is-size-7 mb-3">Payment Status:</p>
                                    {order.isPaid ? (<p className="notification is-success is-inline-block">Paid</p>) : (<p className="notification is-danger is-inline-block">Not Paid</p>)}
                                    &nbsp;
                                    {order.isPaid ? "Payment date: "+new Date(order.createdAt).toLocaleDateString("en-US") : "No payment date available."}
                                </div>
                            </div>
                            <div className="container">
                                <h3 className="title">Order Items</h3>
                                <div className="cart-list-container">
                                    {
                                        order.orderItems.length === 0 ?
                                        <div className="empty">
                                            Your order is not found.
                                        </div>
                                        :
                                        order.orderItems.map( item =>
                                            <div key={item.product}>
                                                <div className="columns">
                                                    <div className="column is-one-fifths">
                                                        <Link to={"/product/"+item.product}><img src={item.img} alt={item.name} /></Link>
                                                    </div>
                                                    <div className="column is-three-fifths">
                                                        <Link to={"/product/"+item.product}><b className="is-6">{item.name}</b></Link><br /><br />
                                                        <div className="field is-horizontal">
                                                            <div className="field-label is-normal has-text-left">
                                                                <label className="label">Qty: <span>{item.qty}</span></label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="column is-one-fifths">
                                                        <h4 className="title is-5">${(item.qty*item.price).toFixed(2)}</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="column is-one-quarter">
                            <div className="container color-background">
                                {!order.isPaid && 
                                <PaypalButton 
                                    amount={order.totalPrice} 
                                    onSuccess={handleSuccessPayment} />
                                }
                                <h3 className="title is-4 has-text-centered">
                                    Order Summary
                                </h3>
                                <table className="review-table">
                                    <tbody>
                                        <tr>
                                            <td>Subtotal</td>
                                            <td>${Number(order.subtotalPrice).toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td>Shipping:</td>
                                            <td>${Number(order.shippingPrice).toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td>Tax:</td>
                                            <td>${Number(order.taxPrice).toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2"><hr /></td>
                                        </tr>
                                        <tr>
                                            <td><h4 className="is-size-5 is-primary has-text-weight-bold">Order Total:</h4></td>
                                            <td><h4 className="is-size-5 is-primary has-text-weight-bold">${Number(order.totalPrice).toFixed(2)}</h4></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                )
            }
        </section>
    </div>
                
}

export default OrderDetailsPage;