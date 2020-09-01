import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAction, removeFromCartAction } from '../../actions/cartActions';
import { Link } from 'react-router-dom';
import './CartCheckoutCSS.css';

function CartPage(props) {

    const cartDetails = useSelector(state => state.cartDetails);
    const { cartItems } = cartDetails;

    const productId = props.match.params.id;
    const qty = props.location.search? Number(props.location.search.split("=")[1]) : 1;
    const dispatch = useDispatch();

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCartAction(productId));
    }

    useEffect(() => {
        if(productId) {
            dispatch(addToCartAction(productId, qty));
        }
        return () => {
            // cleanup
        };
    }, []);

    const handleCheckout = () => {
        props.history.push("/signin?redirect=shipping");
    }

    return <div className="container cart">
        <section className="section cart-details">
            <div className="columns is-multiline is-mobile">
                <div className="column is-three-quarter">
                    <h1 className="title">Shopping Cart</h1>
                    <div className="cart-list-container">
                        {
                            cartItems.length === 0 ?
                            <div className="empty">
                                Your cart is empty.
                            </div>
                            :
                            cartItems.map( item =>
                                <div key={item.product}>
                                    <div className="columns">
                                        <div className="column is-one-fifths">
                                            <Link to={"/product/"+item.product}><img src={item.img} alt={item.name} /></Link>
                                        </div>
                                        <div className="column is-three-fifths">
                                            <Link to={"/product/"+item.product}><b className="is-6">{item.name}</b></Link><br /><br />
                                            <div className="field is-horizontal">
                                                <div className="field-label is-normal has-text-left">
                                                    <label className="label">Qty:</label>
                                                </div>
                                                <div className="field-body">
                                                    <div className="control">
                                                        <div className="select is-primary">
                                                            <select value={item.qty} onChange={(e) => dispatch(addToCartAction(item.product,e.target.value))}>
                                                                {[...Array(item.quantityInStock).keys()].map(x => 
                                                                    <option value={x + 1} key={x + 1}>{x + 1}</option>
                                                                )}
                                                            </select>
                                                        </div>
                                                        
                                                    </div>
                                                    <button onClick={() => handleRemoveFromCart(item.product)} className="button is-primary is-inverted">Delete</button>
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
                <div className="column is-one-quarter">
                    <div className="container color-background">
                    <h3 className="title is-6">
                        Subtotal ({cartItems.reduce((a, c) => (Number(a) + Number(c.qty)), 0)} Items) 
                        :
                        ${cartItems.reduce((a, c) => (Number(a) + (Number(c.price) * Number(c.qty))).toFixed(2), 0)}
                    </h3>
                        <button onClick={handleCheckout} type="button" className="button is-primary has-text-white is-fullwidth" disabled={cartItems.length === 0}>Procced To Checkout</button>
                    </div>
                </div>
            </div>
        </section>
    </div>
                
}

export default CartPage;