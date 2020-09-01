import React, { useState } from 'react';
// import data from './data';
import './ProductDetailPage.css';
import { useDispatch } from 'react-redux';
import { saveShippingAction } from '../../actions/cartActions'
import CheckoutSteps from './checkout/CheckoutSteps';

// function largeImage(img) {
//     return img.slice(0, -3)+"560";
// }

function ShippingPage(props) {

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [country, setCountry] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = (e)  => {
        e.preventDefault();
        dispatch(saveShippingAction({address, city, zipCode, country}));
        props.history.push("payment");
    }

    return (
        <div className="container Register">
            <div className="columns is-mobile is-centered">
                <div className="column is-four-fifths-mobile is-half-tablet is-half-desktop is-one-third-widescreen is-one-third-fullhd">
                    <section className="section">
                        <div className="container">
                            <CheckoutSteps step={2} />
                        </div>
                    </section>
                    <div className="card">
                        <div className="card-content">
                            <section className="section Register-form">
                                <h1 className="title">Shipping</h1>
                                <form className="form-horizontal" onSubmit={handleSubmit}>
                                    <fieldset>
                                        <div className="field">
                                            <p className="control has-icons-left has-icons-right">
                                                <input className="input" type="address" id="address" name="address" placeholder="Shipping Address" required onChange={(e) => setAddress(e.target.value)}   />
                                                <span className="icon is-small is-left">
                                                    <i className="fas fa-shipping-fast"></i>
                                                </span>
                                            </p>
                                        </div>
                                        <div className="field">
                                            <p className="control has-icons-left has-icons-right">
                                                <input className="input" type="city" id="city" name="city" placeholder="City" required onChange={(e) => setCity(e.target.value)}   />
                                                <span className="icon is-small is-left">
                                                    <i className="fas fa-city"></i>
                                                </span>
                                            </p>
                                        </div>
                                        <div className="field">
                                            <p className="control has-icons-left has-icons-right">
                                                <input className="input" type="zipCode" id="zipCode" name="zipCode" placeholder="Zip Code" required onChange={(e) => setZipCode(e.target.value)}   />
                                                <span className="icon is-small is-left">
                                                    <i className="fas fa-university"></i>
                                                </span>
                                            </p>
                                        </div>
                                        <div className="field">
                                            <p className="control has-icons-left has-icons-right">
                                                <input className="input" type="country" id="country" name="country" placeholder="Country" required onChange={(e) => setCountry(e.target.value)}   />
                                                <span className="icon is-small is-left">
                                                    <i className="fas fa-flag"></i>
                                                </span>
                                            </p>
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

export default ShippingPage;