import React, { useEffect, useState } from 'react';
// import data from './data';
import './ProductAdminPage.css';
import { useSelector, useDispatch } from 'react-redux';
import { allOrdersAction, deleteOrderAction } from '../../actions/orderActions';
import { Link } from 'react-router-dom';

// function largeImage(img) {
//     return img.slice(0, -3)+"560";
// }

function OrdersAdminPage(props) {
    
    const [complete, setComplete] = useState(false);

    const allOrdersList = useSelector(state => state.allOrdersList);
    const { loading, orders, error } = allOrdersList;

    const deleteOrder = useSelector(state => state.deleteOrder);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = deleteOrder;

    const dispatch = useDispatch();

    useEffect(() => {
        if(successDelete) {
            showSuccessAnimation();
        }
        dispatch(allOrdersAction());
        return () => {
            // cleanup
        };
    }, [successDelete]);
    
    const handleDelete = (order)  => {
        dispatch(deleteOrderAction(order._id));
    }

    const showSuccessAnimation = () => {
        setComplete(true);
        setTimeout(() => setComplete(false), 1300);
    }

    return (
        <div className="container order-admin">
            <div className="is-mobile is-centered">
                <div className="">
                    <h1 className="title is-2 is-pulled-left">Orders Admin Home</h1>
                    <section className="section">
                    {
                        loading ? <div className="columns is-centered"><div className="loader" style={{height:'5em',width:'5em'}}></div></div> : 
                        error ? <div>{"Error: " + error}</div> :
                        (
                        <table className="table is-fullwidth is-striped ">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Date</th>
                                    <th>Total Price</th>
                                    <th>User</th>
                                    <th>Paid</th>
                                    <th>Paid On</th>
                                    <th>Delivered</th>
                                    <th>Delivered On</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{new Date(order.createdAt).toLocaleDateString("en-US")}</td>
                                        <td>${order.totalPrice}</td>
                                        <td>{order.user.name}</td>
                                        <td>{order.isPaid? "Yes" : "Not paid"}</td>
                                        <td>{order.paidAt && new Date(order.paidAt).toLocaleDateString("en-US")}</td>
                                        <td>{order.isDelivered? "Yes" : "No"}</td>
                                        <td>{order.deliveredAt && new Date(order.deliveredAt).toLocaleDateString("en-US")}</td>
                                        <td>
                                        {/* Action */}
                                            <div className="buttons">
                                                <Link className="button is-primary" to={"/order/"+order._id}>Details</Link>
                                                <button className="button is-primary is-outlined" onClick={() => handleDelete(order)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr> 
                                ))}
                            </tbody>
                        </table>
                        )
                    }
                    </section>
                </div>
            </div>
            <div id="successAnimation" className={complete ? "modal is-active" : "modal"}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="box">
                        <section className="content">
                            <span className="icon is-large has-text-success">
                                <i className="fas fa-3x fa-check-circle"></i>
                            </span>
                            <p className="title is-4 mt-3">Complete!</p>
                        </section>
                    </div>
                </div>
            </div>
        </div>  
    );
}

export default OrdersAdminPage;