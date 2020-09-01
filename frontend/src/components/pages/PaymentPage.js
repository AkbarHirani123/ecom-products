import React, { useState } from 'react';
// import data from './data';
import './ProductDetailPage.css';
import { useSelector, useDispatch } from 'react-redux';
import { savePaymentAction } from '../../actions/cartActions';
import CheckoutSteps from './checkout/CheckoutSteps';

// function largeImage(img) {
//     return img.slice(0, -3)+"560";
// }

function PaymentPage(props) {

    const cartDetails = useSelector(state => state.cartDetails);
    const { shipping } = cartDetails;
    
    if(!shipping.address) {
        props.history.push("/shipping");
    }

    const [paymentMethod, setPaymentMethod] = useState('paypal');

    const dispatch = useDispatch();

    const handleSubmit = (e)  => {
        e.preventDefault();
        dispatch(savePaymentAction({paymentMethod}));
        props.history.push("review");
    }

    return (
        <div className="container Register">
            <div className="columns is-mobile is-centered">
                <div className="column is-four-fifths-mobile is-half-tablet is-half-desktop is-one-third-widescreen is-one-third-fullhd">
                    <section className="section">
                        <div className="container">
                            <CheckoutSteps step={3} />
                        </div>
                    </section>
                    <div className="card">
                        <div className="card-content">
                            <section className="section Register-form">
                                <h1 className="title">Payment</h1>
                                <form className="form-horizontal" onSubmit={handleSubmit}>
                                    <fieldset>
                                        <div className="field">
                                            <div className="control">
                                                <label className="radio">
                                                    <input type="radio" name="paymentMethod" id="paymentMethod" value="paypal" checked onChange={(e) => setPaymentMethod(e.target.value)} />
                                                    &nbsp;Paypal
                                                </label>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <p className="control">
                                                <button type="submit" className="button is-primary has-text-white is-fullwidth" >
                                                Continue
                                                {/* {loading && (<div className="loader" style={{marginLeft:10}}></div>)} */}
                                                </button>
                                            </p>
                                        </div>
                                    </fieldset>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    );
}

export default PaymentPage;